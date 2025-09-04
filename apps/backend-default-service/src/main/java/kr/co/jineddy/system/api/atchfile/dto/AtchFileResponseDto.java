package kr.co.jineddy.system.api.atchfile.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

/**
 * 첨부파일 응답 DTO
 */
@Data
@Builder
public class AtchFileResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -2212814532128652838L;
	/**
	 * 첨부 파일 ID
	 */
	private Long atchFileId;
	/**
	 * 첨부 파일 순번
	 */
	private Long atchFileSeq;
	/**
	 * 첨부 파일 명
	 */
	private String atchFileNm;
	/**
	 * 파일 용량
	 */
	private Long fileSize;
}
