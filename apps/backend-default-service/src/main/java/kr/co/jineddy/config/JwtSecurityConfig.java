package kr.co.jineddy.config;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import kr.co.jineddy.system.jwt.JwtFilter;
import kr.co.jineddy.system.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

/**
 * 직접 만든 TokenProviderService와 JwtFilter를 SecurityConfig에 적용하는 설정
 */
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
	/**
	 * 토큰 Provider
	 */
	private final JwtTokenProvider jwtTokenProvider;
	
	/**
	 * TokenProvider 를 주입받아서 JwtFilter 를 통해 Security 로직에 필터를 등록
	 */
	@Override
	public void configure(HttpSecurity http) {
		JwtFilter customFilter = new JwtFilter(jwtTokenProvider);
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
