package kr.co.jineddy.system.service.auth.dto;

import lombok.Builder;
import lombok.Data;

/**
 * 토큰 내부 DTO
 */
@Data
@Builder
public class TokenInternalDto {
	/**
	 * 
	 */
	private String grantType;
	/**
	 * 액세스 토큰
	 */
	private String accessToken;
	/**
	 * 액세스토큰 발급 일시
	 */
	private	long accessTokenIssueIn;
	/**
	 * 액세스 토큰 만료일시
	 */
	private	long accessTokenExpiresIn;
	/**
	 * 리프레시 토큰
	 */
	private String refreshToken;
	/**
	 * 리프레시 토큰 만료일시
	 */
	private	long refreshTokenExpiresIn;
}
