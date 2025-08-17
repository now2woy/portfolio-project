package kr.co.jineddy.board.service.dto;

import lombok.Data;

/**
 * 게시판 설정 내부 Dto
 */
@Data
public class BrdCfgInternalDto {
	/**
	 * 게시판 명
	 */
	private String brdNm;
	/**
	 * 삭제 여부
	 */
	private String delYn;
	/**
	 * 현재 페이지
	 */
	private long offset;
	/**
	 * 페이지 크기
	 */
	private int pageSize;
}
