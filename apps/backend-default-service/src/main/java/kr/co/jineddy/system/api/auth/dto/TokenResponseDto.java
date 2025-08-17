package kr.co.jineddy.system.api.auth.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

/**
 * 토큰 응답 DTO
 */
@Data
@Builder
public class TokenResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -3991322008374586240L;
	/**
	 * 
	 */
	private String grantType;
	/**
	 * 액세스 토큰
	 */
	private String accessToken;
	/**
	 * 
	 */
	private	long accessTokenExpiresIn;
	/**
	 * 리프레시 토큰
	 */
	private String refreshToken;
}
