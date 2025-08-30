package kr.co.jineddy.system.api.menu.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 메뉴 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 200386956802794831L;
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
	/**
	 * 하위 메뉴
	 */
	private final List<MenuResponseDto> children = new ArrayList<>();
}
