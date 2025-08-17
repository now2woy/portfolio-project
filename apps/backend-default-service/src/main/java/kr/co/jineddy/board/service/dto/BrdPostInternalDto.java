package kr.co.jineddy.board.service.dto;

import lombok.Data;

/**
 * 게시글 내부 Dto
 */
@Data
public class BrdPostInternalDto {
	/**
	 * 게시판 ID
	 */
	private int brdId;
	/**
	 * 게시글 제목
	 */
	private String postTtl;
	/**
	 * 게시글 내용
	 */
	private String postCtt;
	/**
	 * 작성자
	 */
	private String writerId;
	/**
	 * 현재 페이지
	 */
	private long offset;
	/**
	 * 페이지 크기
	 */
	private int pageSize;
}
