package kr.co.jineddy.system.service.cd.dto;

import lombok.Data;

/**
 * 시스템 코드 내부 Dto
 */
@Data
public class SysCdInternalDto {
	/**
	 * 코드 그룹 ID
	 */
	private String groupId;
	/**
	 * 코드 ID
	 */
	private String cdId;
	/**
	 * 사용 여부
	 */
	private String useYn;
	/**
	 * 현재 페이지
	 */
	private int offset;
	/**
	 * 페이지 크기
	 */
	private int pageSize;
}
