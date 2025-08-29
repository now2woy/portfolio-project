package kr.co.jineddy.system.api.menu.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

/**
 * 메뉴 응답 DTO
 */
@Data
@Builder
public class MenuResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 200386956802794831L;
	/**
	 * 메뉴 ID
	 */
	private Integer menuId; 
	/**
	 * 메뉴 명
	 */
	private String menuNm;
	/**
	 * 상위 메뉴 ID
	 */
	private Integer upMenuId;
	/**
	 * 링크 URL
	 */
	private String linkUrl;
	/**
	 * 아이콘 코드
	 */
	private String iconCd;
	/**
	 * 정렬 순서
	 */
	private Integer sortOrd;
	/**
	 * 하위 메뉴
	 */
	private final List<MenuResponseDto> children = new ArrayList<>();
}
