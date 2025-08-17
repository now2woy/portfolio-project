package kr.co.jineddy.system.jwt;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 토큰을 검증하여 유효할 경우 SecurityContext에 인증정보를 담는 Filter
 */
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	/**
	 * 헤더의 토큰보관 변수명
	 */
	public static final String AUTHORIZATION_HEADER = "Authorization";
	/**
	 * 베어러 토큰의 접두어
	 */
	public static final String BEARER_PREFIX = "Bearer ";
	
	/**
	 * 토큰 제공 Service
	 */
	private final JwtTokenProvider jwtTokenProvider;
	
	/**
	 * JWT 토큰의 인증정보를 SecurityContext에 저장
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		// Request Header 에서 토큰을 꺼냄
		String accessToken = resolveToken(request);
		
		// validateToken 으로 토큰 유효성 검사
		// 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
		if (StringUtils.isNotEmpty(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
			Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response);
	}
	
	/**
	 * 쿠키에서 토큰 정보 꺼내기
	 * @param request
	 * @return
	 */
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.isNotEmpty(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.split(" ")[1].trim();
		}
		
		return null;
	}
}
