package kr.co.jineddy.board.api.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;

/**
 * 게시글 Request DTO
 */
@Data
public class BrdPostRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 9148182206810316308L;
	/**
	 * 게시글 ID
	 */
	private Integer postId;
	/**
	 * 게시판 ID
	 */
	private Integer brdId;
	/**
	 * 게시글 제목
	 */
	private String postTtl;
	/**
	 * 게시글 내용
	 */
	private String postCtt;
	/**
	 * 작성자 ID
	 */
	private String writerId;
	/**
	 * 조회 건수
	 */
	private Integer viewCnt;
	/**
	 * 첨부 파일 ID
	 */
	private Integer atchFileId;
	/**
	 * 삭제 여부
	 */
	private String delYn;
	/**
	 * 삭제 일시
	 */
	private LocalDateTime delDt;
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
