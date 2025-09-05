package kr.co.jineddy.board.api.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

/**
 * 게시판 Response DTO
 */
@Data
@Builder
public class BrdCfgResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -8857436705752394765L;
	/**
	 * 게시판 ID
	 */
	private int brdId;
	/**
	 * 게시판 명
	 */
	private String brdNm;
	/**
	 * 게시판 유형 코드
	 */
	private String brdTyCd;
	/**
	 * 답글 허용 여부
	 */
	private String allowReplyYn;
	/**
	 * 첨부 파일 여부
	 */
	private String atchFileYn;
	/**
	 * 삭제 여부
	 */
	private String delYn;
	/**
	 * 입력 일시
	 */
	private LocalDateTime insDt;
	/**
	 * 입력 ID
	 */
	private String insId;
	/**
	 * 수정 일시
	 */
	private LocalDateTime updDt;
	/**
	 * 수정 ID
	 */
	private String updId;
}
