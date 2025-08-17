package kr.co.jineddy.common.api.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * 오류 Response Dto
 */
@Getter
@Builder
public class ErrorResponseDto {
	/**
	 * 비즈니스 에러 코드 (ex: "BOARD_001")
	 */
	private String code;
	/**
	 * 사용자에게 보여줄 메시지
	 */
	private String message;
	/**
	 * 개발자용 상세 설명 (로그에서 확인)
	 */
	private String detail;
	/**
	 * 요청 URL
	 */
	private String path;
	/**
	 * 발생 시각 (ISO 8601)
	 */
	private String timestamp;
}
