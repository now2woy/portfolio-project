package kr.co.jineddy.common.exception;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import kr.co.jineddy.common.api.dto.ErrorResponseDto;

/**
 * 전역 Exception 헨들러
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
	/**
	 * 프로젝트 Exception 발생 시 헨들
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler(ProjectException.class)
	protected ResponseEntity<ErrorResponseDto> handleCustomException(ProjectException ex, WebRequest request) {
		ErrorCode errorCode = ex.getErrorCode();
		
		ErrorResponseDto errorResponse = ErrorResponseDto.builder()
				.code(errorCode.getCode())
				.message(errorCode.getMessage())
				.path(request.getDescription(false).substring(4)) // "uri=" 부분을 제거
				.timestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
				.build();
		
		return new ResponseEntity<>(errorResponse, errorCode.getHttpStatus());
	}
}
