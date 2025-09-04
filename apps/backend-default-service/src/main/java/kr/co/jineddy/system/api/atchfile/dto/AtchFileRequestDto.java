package kr.co.jineddy.system.api.atchfile.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 첨부파일 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AtchFileRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 5840160016404417855L;
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
