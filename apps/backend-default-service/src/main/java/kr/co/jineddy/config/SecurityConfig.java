package kr.co.jineddy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import kr.co.jineddy.system.jwt.JwtAccessDeniedHandler;
import kr.co.jineddy.system.jwt.JwtAuthenticationEntryPoint;
import kr.co.jineddy.system.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;

/**
 * Spring Security 설정
 */
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	/**
	 * 
	 */
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	/**
	 * 
	 */
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	/**
	 * 토큰 Provider
	 */
	private final JwtTokenProvider jwtTokenProvider;
	
	private final CorsFilter corsFilter;
	
	
	/**
	 * 비밀번호 암호화 Bean 생성
	 * @return
	 */
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/**
	 * Spring Security 설정
	 * @param http
	 * @return
	 * @throws Exception
	 */
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			// CSRF 제외
			.csrf(AbstractHttpConfigurer::disable)
			
			.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
			
			// 오류 제어(401, 403 오류 처리)
			.exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler))
			
			// 보안 헤더 설정
			.headers(httpSecurityHeadersConfigurer -> httpSecurityHeadersConfigurer
				.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
			
			// JWT 사용 시 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
			.sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션 사용 X
			
			// 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
			// 접근 권한 설정
			.authorizeHttpRequests(authorize -> authorize
				// 권한 없이 접속 가능 URL
				.requestMatchers("/", "/api/system/v1/auths/**").permitAll()
				// 나머지 전체는 인증된 사용자만 접속 가능 URL
				.anyRequest().authenticated())
			
			.apply(new JwtSecurityConfig(jwtTokenProvider)); 
			
		return http.build();
	}
}
