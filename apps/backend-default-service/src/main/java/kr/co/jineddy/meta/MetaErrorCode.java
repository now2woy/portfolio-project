package kr.co.jineddy.meta;

import org.springframework.http.HttpStatus;

import kr.co.jineddy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 게시판 관련 오류 코드 정의
 */
@Getter
@RequiredArgsConstructor
public enum MetaErrorCode implements ErrorCode {
	/**
	 * DOMAIN_001 : 도메인 정보 없음
	 * HTTP Status : 500
	 * 
	 * 내용
	 *   - DomainService.findEntity() orElseThrow에 해당할 경우
	 */
	DIMAIN_NOT_FOUND("DOMAIN_001", "도메인ID에 해당하는 도메인 정보를 찾을 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
	/**
	 * TERM_001 : 용어 정보 없음
	 * HTTP Status : 500
	 * 
	 * 내용
	 *   - TermService.findEntity() orElseThrow에 해당할 경우
	 */
	TERM_NOT_FOUND("TERM_001", "용어ID에 해당하는 용어 정보를 찾을 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
	/**
	 * WORD_001 : 단어 정보 없음
	 * HTTP Status : 500
	 * 
	 * 내용
	 *   - WordService.findEntity() orElseThrow에 해당할 경우
	 */
	WORD_NOT_FOUND("WORD_001", "단어ID에 해당하는 단어 정보를 찾을 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR)

	;
	
	/**
	 * 오류 코드
	 */
	private final String code;
	/**
	 * 오류 메시지
	 */
	private final String message;
	/**
	 * HTTP STATUS
	 */
	private final HttpStatus httpStatus;
	
	/**
	 * HTTP STATUS GET
	 */
	@Override
	public HttpStatus getHttpStatus() {
		return this.httpStatus;
	}
}
