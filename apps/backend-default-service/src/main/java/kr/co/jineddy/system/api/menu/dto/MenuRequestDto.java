package kr.co.jineddy.system.api.menu.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**
 * 인증 요청 DTO
 */
@Data
public class MenuRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 5017456446351094668L;
	/**
	 * 메뉴 ID
	 */
	private String menuId;
	/**
	 * 메뉴 명
	 */
	private String menuNm;
	/**
	 * 상위 메뉴 ID
	 */
	private String upMenuId;
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
	 * 사용 여부
	 */
	private String useYn;
	/**
	 * 하위 메뉴
	 */
	private List<MenuResponseDto> children = new ArrayList<>();
}
