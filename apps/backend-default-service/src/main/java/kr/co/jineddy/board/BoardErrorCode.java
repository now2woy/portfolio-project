package kr.co.jineddy.board;

import org.springframework.http.HttpStatus;

import kr.co.jineddy.common.exception.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 게시판 관련 오류 코드 정의
 */
@Getter
@RequiredArgsConstructor
public enum BoardErrorCode implements ErrorCode {
	/**
	 * 게시글을 찾을 수 없습니다.
	 */
	POST_NOT_FOUND("POST_001", "게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND)
	/**
	 * 게시글에 대한 접근 권한이 없습니다.
	 */
	, POST_ACCESS_DENIED("POST_002", "게시글에 대한 접근 권한이 없습니다.", HttpStatus.FORBIDDEN)
	/**
	 * 게시글에 대한 수정 권한이 없습니다.
	 */
	, POST_UPDATE_NOT_ALLOW("POST_003", "게시글에 대한 수정 권한이 없습니다.", HttpStatus.FORBIDDEN)
	/**
	 * 게시글에 대한 삭제 권한이 없습니다.
	 */
	, POST_DELETE_NOT_ALLOW("POST_004", "게시글에 대한 삭제 권한이 없습니다.", HttpStatus.FORBIDDEN);
	
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
