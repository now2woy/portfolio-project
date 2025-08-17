package kr.co.jineddy.system.service.auth;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import kr.co.jineddy.system.api.auth.dto.AuthRequestDto;
import kr.co.jineddy.system.api.auth.dto.AuthResponseDto;
import kr.co.jineddy.system.api.auth.dto.TokenResponseDto;
import kr.co.jineddy.system.entity.user.SysUserMst;
import kr.co.jineddy.system.entity.user.SysUserTkn;
import kr.co.jineddy.system.jwt.JwtTokenProvider;
import kr.co.jineddy.system.repository.user.SysUserMstRepository;
import kr.co.jineddy.system.repository.user.SysUserTknRepository;
import kr.co.jineddy.system.service.auth.dto.TokenInternalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 인증 Service
 */
@Slf4j
@Transactional
@Service("authService")
@RequiredArgsConstructor
public class AuthService {
	/**
	 * 
	 */
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	/**
	 * 비밀번호 암호화 Bean
	 */
	private final PasswordEncoder passwordEncoder;
	/**
	 * 시스템 사용자 마스터 Repository
	 */
	private final SysUserMstRepository sysUserMstRepository;
	/**
	 * 시스템 사용자 토큰 Repository
	 */
	private final SysUserTknRepository sysUserTknRepository;
	/**
	 * 토큰 Provider
	 */
	private final JwtTokenProvider jwtTokenProvider;
	/**
	 * 헤더의 토큰보관 변수명
	 */
	public static final String AUTHORIZATION_HEADER = "Authorization";
	/**
	 * 베어러 토큰의 접두어
	 */
	public static final String BEARER_PREFIX = "Bearer ";
	/**
	 * 리프레시토큰 구분값
	 */
	private static final String REFRESH_TOKEN = "refreshToken";
	
	/**
	 * 회원 가입
	 * @param authRequestDto
	 * @return
	 */
	public AuthResponseDto signup(AuthRequestDto authRequestDto) {
		// 사용자 ID가 이미 사용중인지 확인
		if(sysUserMstRepository.findById(authRequestDto.getUserId()).isPresent()) {
			throw new RuntimeException("이미 사용중인 ID 입니다.");
		}
		
		LocalDateTime now = LocalDateTime.now();
		
		SysUserMst sysUserMst = authRequestDtoToSysUserMst(authRequestDto, passwordEncoder);
		sysUserMst.setInsId(sysUserMst.getUserId());
		sysUserMst.setInsDt(now);
		sysUserMst.setUpdId(sysUserMst.getUserId());
		sysUserMst.setUpdDt(now);
		
		AuthResponseDto authResponseDto = sysUserMstToAuthResponseDto(sysUserMstRepository.save(sysUserMst));
		
		return authResponseDto;
	}
	
	/**
	 * 로그인
	 * @param authRequestDto
	 * @return
	 */
	public TokenResponseDto login(AuthRequestDto authRequestDto) {
		// Login ID/PW 를 기반으로 AuthenticationToken 생성
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(authRequestDto.getUserId(), authRequestDto.getPwd());
		
		// 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
		// authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		
		// 인증 정보를 기반으로 JWT 토큰 생성
		TokenInternalDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		
		LocalDateTime now = LocalDateTime.now();
		
		// RefreshToken 저장
		SysUserTkn sysUserTkn = SysUserTkn.builder()
				.userId(authentication.getName())
				.refreshTkn(tokenDto.getRefreshToken())
				.expDt(LocalDateTime.ofInstant(Instant.ofEpochMilli(tokenDto.getRefreshTokenExpiresIn()), ZoneId.systemDefault()))
				.issuedDt(LocalDateTime.ofInstant(Instant.ofEpochMilli(tokenDto.getAccessTokenIssueIn()), ZoneId.systemDefault()))
				.validYn("Y")
				.insDt(now)
				.insId(authentication.getName())
				.updDt(now)
				.updId(authentication.getName())
				.build();
		
		sysUserTknRepository.save(sysUserTkn);
		
		// 토큰 발급
		return TokenDtoToTokenResponseDto(tokenDto);
	}
	
	/**
	 * 로그아웃
	 * @param request
	 */
	public void logout(HttpServletRequest request) {
		try {
			// 액세스 토큰 GET
			String accessToken = resolveAccessToken(request);
			// 리프레시 토큰 GET
			String refreshToken = resolveRefreshToken(request);
			
			// Access Token 에서 Member ID 가져오기
			Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
			
			// 토큰 발행일시가 데이터 입력, 수정 일시
			LocalDateTime now = LocalDateTime.now();
			
			// 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
			SysUserTkn sysUserTkn = sysUserTknRepository.findByRefreshTknAndValidYnAndExpDtAfter(refreshToken, "Y", now).orElseThrow(() -> new RuntimeException("Refresh Token이 올바르지 않거나 만료되었습니다."));
			
			// 기존 토큰의 정보 변경
			sysUserTkn.setValidYn("N");
			sysUserTkn.setExpDt(now);
			sysUserTkn.setUpdDt(now);
			sysUserTkn.setUpdId(authentication.getName());
			
			// 기존 리프레시 토큰을 만료 시킨다.
			sysUserTknRepository.save(sysUserTkn);
		} catch (Exception e) {
			log.error("로그 아웃 중 오류 발생", e);
		}
	}
	
	/**
	 * 토큰 갱신
	 * @param tokenRequestDto
	 * @return
	 */
	public TokenResponseDto reIssue(HttpServletRequest request) {
		// 액세스 토큰 GET
		String accessToken = resolveAccessToken(request);
		// 리프레시 토큰 GET
		String refreshToken = resolveRefreshToken(request);
		
		// Refresh Token 검증
		if (!jwtTokenProvider.validateToken(refreshToken)) {
			throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
		}
		
		// Access Token 에서 Member ID 가져오기
		Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
		
		// 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
		SysUserTkn sysUserTkn = sysUserTknRepository.findByRefreshTknAndValidYnAndExpDtAfter(refreshToken, "Y", LocalDateTime.now()).orElseThrow(() -> new RuntimeException("Refresh Token이 올바르지 않거나 만료되었습니다."));
		
		// Refresh Token의 사용자와 조회된 사용자가 동일한지 확인
		if(!authentication.getName().equals(sysUserTkn.getUserId())) {
			throw new RuntimeException("Refresh Token의 사용자 정보가 일치하지 않습니다.");
		}
		
		// 새로운 토큰 생성
		TokenInternalDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		
		// 토큰 발행일시가 데이터 입력, 수정 일시
		LocalDateTime now = LocalDateTime.ofInstant(Instant.ofEpochMilli(tokenDto.getAccessTokenIssueIn()), ZoneId.systemDefault());
		
		// 기존 토큰의 정보 변경
		sysUserTkn.setValidYn("N");
		sysUserTkn.setExpDt(now);
		sysUserTkn.setUpdDt(now);
		sysUserTkn.setUpdId(authentication.getName());
		
		// 기존 리프레시 토큰을 만료 시킨다.
		sysUserTknRepository.save(sysUserTkn);
		
		// 신규 리프레시 토큰 값을 Entity로 만든다.
		SysUserTkn newSysUserTkn = SysUserTkn.builder()
				.userId(authentication.getName())
				.refreshTkn(tokenDto.getRefreshToken())
				.expDt(LocalDateTime.ofInstant(Instant.ofEpochMilli(tokenDto.getRefreshTokenExpiresIn()), ZoneId.systemDefault()))
				.issuedDt(now)
				.validYn("Y")
				.insDt(now)
				.insId(authentication.getName())
				.updDt(now)
				.updId(authentication.getName())
				.build();
		
		// 신규 리프레시 토큰 정보 저장
		sysUserTknRepository.save(newSysUserTkn);
		
		// 토큰 발급
		return TokenDtoToTokenResponseDto(tokenDto);
	}
	
	
	/**
	 * 요청정보에서 Access Token 정보를 꺼낸다.
	 * @param request
	 * @return
	 */
	private String resolveAccessToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.split(" ")[1].trim();
		}
		
		return null;
	}
	
	/**
	 * 요청정보에서 Refresh Token 정보를 꺼낸다.
	 * @param request
	 * @return
	 */
	private String resolveRefreshToken(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		String refreshToken = null;
		
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (REFRESH_TOKEN.equals(cookie.getName())) {
					refreshToken = cookie.getValue();
					break;
				}
			}
		}
		
		return refreshToken;
	}
	
	/**
	 * 토큰 응답 DTO로 변환
	 * @param tokenDto
	 * @return
	 */
	private TokenResponseDto TokenDtoToTokenResponseDto(TokenInternalDto tokenDto) {
		return TokenResponseDto.builder()
				.grantType(tokenDto.getGrantType())
				.accessToken(tokenDto.getAccessToken())
				.accessTokenExpiresIn(tokenDto.getAccessTokenExpiresIn())
				.refreshToken(tokenDto.getRefreshToken())
				.build();
	}
	
	/**
	 * 인증 요청 DTO를 사용자 Entity로 변환
	 * @param passwordEncoder
	 * @return
	 */
	private SysUserMst authRequestDtoToSysUserMst(AuthRequestDto authRequestDto, PasswordEncoder passwordEncoder) {
		return SysUserMst.builder().userId(authRequestDto.getUserId()).userNm(authRequestDto.getUserNm()).pwd(passwordEncoder.encode(authRequestDto.getPwd())).build();
	}
	
	/**
	 * 사용자 Entity를 인증 응답 DTO로 변환
	 * @param sysUserMst
	 * @return
	 */
	private AuthResponseDto sysUserMstToAuthResponseDto(SysUserMst sysUserMst) {
		return AuthResponseDto.builder().userId(sysUserMst.getUserId()).useNm(sysUserMst.getUserNm()).build();
	}
}