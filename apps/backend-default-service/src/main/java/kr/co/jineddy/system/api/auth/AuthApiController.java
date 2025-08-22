package kr.co.jineddy.system.api.auth;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.jineddy.system.api.auth.dto.AuthRequestDto;
import kr.co.jineddy.system.api.auth.dto.AuthResponseDto;
import kr.co.jineddy.system.api.auth.dto.TokenResponseDto;
import kr.co.jineddy.system.service.auth.AuthService;
import lombok.RequiredArgsConstructor;

/**
 * 인증 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/auths")
public class AuthApiController {
	/**
	 * 인증 Service
	 */
	private final AuthService authService;
	/**
	 * 액세스토큰 구분값
	 */
	private static final String ACCESS_TOKEN = "accessToken";
	/**
	 * 리프레시토큰 구분값
	 */
	private static final String REFRESH_TOKEN = "refreshToken";
	
	@Value("${spring.profiles.active}")
	private String activeProfile;
	
	/**
	 * 회원 가입
	 * @param authRequestDto
	 * @return
	 */
	@PostMapping("/signup")
	public ResponseEntity<AuthResponseDto> signup(@RequestBody AuthRequestDto authRequestDto) {
		return ResponseEntity.ok(authService.signup(authRequestDto));
	}
	
	/**
	 * 로그인
	 * @param authRequestDto
	 * @return
	 */
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDto> login(HttpServletResponse response, @RequestBody AuthRequestDto authRequestDto) {
		// 로그인 처리 후 토큰 정보(tokenInfo)를 얻는 로직
		TokenResponseDto tokenResponseDto = authService.login(authRequestDto);
		
		// 발행된 토큰정보를 쿠키에 담는다.
		// 쿠키의 유효기간은 리프레시토큰의 유효기간과 동일하게 설정(액세스 토큰이 만료 되도 사용자ID를 뽑아내기 위해서)
		setAuthCookie(response, tokenResponseDto.getAccessToken(), Duration.ofHours(12), tokenResponseDto.getRefreshToken(), Duration.ofHours(12));
		
		return ResponseEntity.ok(authService.getUserInfo(authRequestDto.getUserId()));
	}
	
	/**
	 * 액세스 토큰 유효성 검증
	 * @param tokenRequestDto
	 * @return
	 */
	@GetMapping("/verify")
	public ResponseEntity<?> verify(HttpServletRequest request, HttpServletResponse response) {
		boolean result = authService.verify(request);
		
		if(result) {
			return ResponseEntity.ok().build();
			
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
	/**
	 * 토큰 갱신
	 * @param tokenRequestDto
	 * @return
	 */
	@PostMapping("/re-issue")
	public ResponseEntity<TokenResponseDto> reissue(HttpServletRequest request, HttpServletResponse response) {
		// 토큰을 재발행한다.
		TokenResponseDto tokenResponseDto = authService.reIssue(request);
		
		// 재발행된 토큰정보를 쿠키에 담는다.
		// 쿠키의 유효기간은 리프레시토큰의 유효기간과 동일하게 설정(액세스 토큰이 만료 되도 사용자ID를 뽑아내기 위해서)
		setAuthCookie(response, tokenResponseDto.getAccessToken(), Duration.ofHours(12), tokenResponseDto.getRefreshToken(), Duration.ofHours(12));
		
		return ResponseEntity.ok(tokenResponseDto);
	}
	
	/**
	 * 로그 아웃
	 * @param response
	 * @return
	 */
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		// DB에 저장된 리프레시토큰 정보를 만료 시킨다.
		authService.logout(request);
		
		// 정보 초기화
		setAuthCookie(response, null, Duration.ZERO, null, Duration.ZERO);
		
		return ResponseEntity.ok().build();
	}
	
	/**
	 * 인증정보를 쿠키에 담는다.
	 * @param response
	 * @param accessToken
	 * @param accessCookieMaxAge
	 * @param refrashToken
	 * @param refrashCookieMaxAge
	 */
	private void setAuthCookie(HttpServletResponse response, String accessToken, Duration accessCookieMaxAge, String refrashToken, Duration refrashCookieMaxAge) {
		// 운영에서는 true
		boolean isSecure = false;
		// Cross-Origin에서 쿠키 허용
		String sameSite = "Lax";
		
		// 프로파일에 따라 다르게 처리
		if("prod".equals(activeProfile)) {
			isSecure = true;
			sameSite = "None";
		}
		
		String accessTokenCookie = ResponseCookie.from(ACCESS_TOKEN, accessToken)
				.httpOnly(true)
				.secure(isSecure)
				.path("/")
				.sameSite(sameSite)
				.maxAge(accessCookieMaxAge)
				.build()
				.toString();
		
		String refreshTokenCookie = ResponseCookie.from(REFRESH_TOKEN, refrashToken)
				.httpOnly(true)
				.secure(isSecure)
				.path("/")
				.sameSite(sameSite)
				.maxAge(refrashCookieMaxAge)
				.build()
				.toString();
		
		response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie);
		response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie);
	}
}
