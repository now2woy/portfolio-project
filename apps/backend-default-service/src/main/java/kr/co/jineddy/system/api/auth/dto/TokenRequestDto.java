package kr.co.jineddy.system.api.auth.dto;

import java.io.Serializable;

import lombok.Data;

/**
 * 토큰 요청 DTO
 */
@Data
public class TokenRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -1098656876017350598L;
	/**
	 * 액세스 토큰
	 */
	private String accessToken;
	/**
	 * 리프레시 토큰
	 */
	private String refreshToken;
}
