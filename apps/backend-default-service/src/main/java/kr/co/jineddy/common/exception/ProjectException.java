package kr.co.jineddy.common.exception;

/**
 * 프로젝트에서 사용하는 익셉션
 */
public class ProjectException extends RuntimeException {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -1302561033581749585L;
	/**
	 * 에러 코드
	 */
	private final ErrorCode errorCode;
	
	/**
	 * 생성자
	 * @param errorCode
	 */
	public ProjectException(ErrorCode errorCode) {
		// RuntimeException의 메시지로 설정
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	/**
	 * 에러 코드 GET
	 * @return
	 */
	public ErrorCode getErrorCode() {
		return this.errorCode;
	}
}
