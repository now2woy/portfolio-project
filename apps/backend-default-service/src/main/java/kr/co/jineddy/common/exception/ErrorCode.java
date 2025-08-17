package kr.co.jineddy.common.exception;

import org.springframework.http.HttpStatus;

/**
 * 오류 코드 interface
 */
public interface ErrorCode {
	/**
	 * 오류 코드 GET
	 * @return
	 */
	String getCode();
	/**
	 * 오류 메시지 GET
	 * @return
	 */
	String getMessage();
	/**
	 * HTTP STATUS GET
	 * @return
	 */
	HttpStatus getHttpStatus();
}