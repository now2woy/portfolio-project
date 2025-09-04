package kr.co.jineddy.system;

import org.springframework.http.HttpStatus;

import kr.co.jineddy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 게시판 관련 오류 코드 정의
 */
@Getter
@RequiredArgsConstructor
public enum SystemErrorCode implements ErrorCode {
	/**
	 * USER_001 : 사용자 ID 없음
	 * 
	 * 내용
	 *   - CommonUtils.getUserId() 리턴값이 StringUtils.isEmpty true인 경우
	 */
	USER_ID_NOT_FOUND("USER_001", "로그인 한 사용자 정보를 찾을 수 없습니다.", HttpStatus.UNAUTHORIZED)
	
	/**
	 * FILE_001 : 업로드할 첨부파일이 없습니다.
	 * 
	 * 내용
	 *   - 첨부파일 업로드 체크에서 첨부파일이 없을 경우 발생
	 */
	, UPLOAD_FILE_NOT_FOUND("FILE_001", "업로드할 첨부파일이 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR)
	
	/**
	 * FILE_002 : 처리할 첨부파일이 없습니다.
	 * 
	 * 내용
	 *   - 첨부파일 수정 체크에서 첨부파일이 없고 삭제 첨부파일 일련번호가 없을 경우
	 */
	, UPLOAD_FILE_AND_DELETE_FILE_NOT_FOUND("FILE_002", "업로드하거나 삭제할 첨부파일이 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR)
	
	/**
	 * FILE_998 : 첨부파일을 처리하던 중 IO 오류가 발생하였습니다.
	 * 
	 * 내용
	 *   - 첨부파일을 처리하던 중 IO 오류가 발생
	 */
	, FILE_IOEXCEPTION_ERROR("FILE_998", "첨부파일을 처리하던 중 IO 오류가 발생하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR)
	
	/**
	 * SYS_999 : 알려지지 않은 오류 발생
	 * 
	 * 내용
	 *   - Exception catch 된 경우 로그 출력 후 이 오류 발생
	 */
	, SYS_UNKNOWN_ERROR("SYS_999", "알려지지 않은 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR)
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
