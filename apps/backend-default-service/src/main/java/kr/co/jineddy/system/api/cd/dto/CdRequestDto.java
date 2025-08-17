package kr.co.jineddy.system.api.cd.dto;

import java.io.Serializable;

import lombok.Data;

/**
 * 시스템 코드 요청 DTO
 */
@Data
public class CdRequestDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5752836175710881658L;
	/**
	 * 코드 그룹 ID
	 */
	private String groupId;
	/**
	 * 코드 ID
	 */
	private String cdId;
	/**
	 * 코드 명
	 */
	private String cdNm;
	/**
	 * 정렬 순서
	 */
	private int sortOrdr;
	/**
	 * 사용여부
	 */
	private String useYn;
	/**
	 * 비고
	 */
	private String rm;
	/**
	 * 입력 ID
	 */
	private String insId;
	/**
	 * 수정 ID
	 */
	private String updId;
}
