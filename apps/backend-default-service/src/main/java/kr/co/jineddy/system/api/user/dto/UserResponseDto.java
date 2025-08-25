package kr.co.jineddy.system.api.user.dto;

import lombok.Builder;
import lombok.Data;

/**
 * 사용자 응답 DTO
 */
@Data
@Builder
public class UserResponseDto {
	/**
	 * 발행일자
	 */
	private String issuedDe;
	/**
	 * 일자별 건수
	 */
	private Integer dailyCount;
}
