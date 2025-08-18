package kr.co.jineddy.system.service.cd.dto;

import lombok.Builder;
import lombok.Data;

/**
 * 시스템 코드 내부 Dto
 */
@Data
@Builder
public class SysCdGroupInternalDto {
	/**
	 * 코드 그룹 ID
	 */
	private String groupId;
	/**
	 * 코드 그룹 명
	 */
	private String groupNm;
	/**
	 * 사용 여부
	 */
	private String useYn;
	/**
	 * 현재 페이지
	 */
	private long offset;
	/**
	 * 페이지 크기
	 */
	private int pageSize;
}
