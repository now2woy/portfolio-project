package kr.co.jineddy.system.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import kr.co.jineddy.system.service.auth.dto.TokenInternalDto;
import lombok.extern.slf4j.Slf4j;

/**
 * 토큰 Provider
 */
@Slf4j
@Component("jwtTokenProvider")
public class JwtTokenProvider {
	/**
	 * 
	 */
	private static final String AUTHORITIES_KEY = "auth";
	/**
	 * 
	 */
	private static final String BEARER_TYPE = "Bearer";
	/**
	 * 액세스 토큰 유효 시간 : 1분
	 */
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
	/**
	 * 리프레시 토큰 유효 시간 : 12시간
	 */
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 12;
	/**
	 * 
	 */
	@Value("${jwt.secret}")
	private String secretKey;
	/**
	 * JWT 발급 및 검증에 사용하는 키
	 */
	private Key key;
	
	/**
	 * JWT 발급 및 검증에 사용하는 키를 생성한다.
	 * TODO 특정 주기마다 리프레쉬 되는 기능을 추가 하면 좋겠다.
	 */
	@PostConstruct
	public void init() {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		
		// TODO 기동 시 확인을 위해 임시로 출력
		log.info("secretKey : {}", secretKey);
	}
	
	/**
	 * 토큰을 생성한다.
	 * @param authentication
	 * @return
	 */
	public TokenInternalDto generateTokenDto(Authentication authentication) {
		// 권한들 가져오기
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
		
		long now = (new Date()).getTime();
		
		// Access Token 만료 시간
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
		Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
		
		// Access Token 생성
		String accessToken = Jwts.builder()
				// payload "sub": "name"
				.subject(authentication.getName())
				// payload "auth": "ROLE_USER"
				.claim(AUTHORITIES_KEY, authorities)
				// payload "exp": 151621022 (ex)
				.expiration(accessTokenExpiresIn)
				// 기존엔 알고리즘을 선택했는데 디플리케이트 되고 비선택으로 추천됨
				.signWith(key)
				.compact();
		
		// Refresh Token 생성
		String refreshToken = Jwts.builder()
				.expiration(refreshTokenExpiresIn)
				.signWith(key)
				.compact();
		
		return TokenInternalDto.builder()
				.grantType(BEARER_TYPE)
				.accessToken(accessToken)
				.accessTokenIssueIn(now)
				.accessTokenExpiresIn(accessTokenExpiresIn.getTime())
				.refreshToken(refreshToken)
				.refreshTokenExpiresIn(refreshTokenExpiresIn.getTime())
				.build();
	}
	
	/**
	 * 토큰에서 권한 정보를 추출한다.
	 * @param accessToken
	 * @return
	 */
	public Authentication getAuthentication(String accessToken) {
		// 토큰 복호화
		Claims claims = parseClaims(accessToken);
		
		if (claims.get(AUTHORITIES_KEY) == null) {
			throw new RuntimeException("권한 정보가 없는 토큰입니다.");
		}
		
		// 클레임에서 권한 정보 가져오기
		Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
		
		// UserDetails 객체를 만들어서 Authentication 리턴
		UserDetails principal = new User(claims.getSubject(), "", authorities);

		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}
	
	/**
	 * 토큰을 검증한다.
	 * @param token
	 * @return
	 */
	public boolean validateToken(String token) {
		try {
			// TODO 예제로 가져온 소스의 방식은 디플리케이트 되어 변경, 오류 시 수정이 필요하고 검증 종료 후 삭제 필요
			// Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			Jwts.parser().verifyWith((SecretKey)key).build().parseSignedClaims(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("잘못된 JWT 서명입니다. token : {}", token);
		} catch (ExpiredJwtException e) {
			log.info("만료된 JWT 토큰입니다. token : {}", token);
		} catch (UnsupportedJwtException e) {
			log.info("지원되지 않는 JWT 토큰입니다. token : {}", token);
		} catch (IllegalArgumentException e) {
			log.info("JWT 토큰이 잘못되었습니다. token : {}", token);
		}
		return false;
	}
	
	/**
	 * 액세스 토큰의 클레임 정보를 읽어온다.
	 * @param accessToken
	 * @return
	 */
	private Claims parseClaims(String accessToken) {
		try {
			// TODO 예제로 가져온 소스의 방식은 디플리케이트 되어 변경, 오류 시 수정이 필요하고 검증 종료 후 삭제 필요
			// return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
			return Jwts.parser().verifyWith((SecretKey)key).build().parseSignedClaims(accessToken).getPayload();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}
