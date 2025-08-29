package kr.co.jineddy.common.util;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import kr.co.jineddy.system.api.menu.dto.MenuResponseDto;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonUtils {
	/**
	 * 로그인한 사용자ID 추출
	 * @return
	 */
	public static String getUserId() {
		// SecurityContextHolder에서 Authentication 객체 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// 사용자 ID 추출
		return authentication.getName();
	}

	/**
	 * flat 메뉴 리스트를 계층형 트리 구조로 변환
	 * @param flatMenus DB에서 가져온 flat 메뉴 리스트
	 * @return 트리 구조 메뉴 리스트
	 */
	public static List<MenuResponseDto> buildTree( List<MenuResponseDto> flatMenus ) {
		Map<Integer, MenuResponseDto> menuMap = new HashMap<>();
		List<MenuResponseDto> roots = new ArrayList<>();
		
		// 1차 맵핑
		for ( MenuResponseDto menu : flatMenus ) {
			log.info("menu : {}", menu.toString());
			menuMap.put( menu.getMenuId(), menu );
		}
		
		// 트리 구조화
		for ( MenuResponseDto menu : flatMenus ) {
			if ( menu.getUpMenuId() == null ) {
				// 최상위 메뉴
				roots.add( menu );
			} else {
				MenuResponseDto parent = menuMap.get( menu.getUpMenuId() );
				
				if ( parent != null ) {
					parent.getChildren().add( menu );
				} else {
					// 부모가 없는 경우(데이터 불일치 방지용)
					roots.add( menu );
				}
			}
		}
		
		sortChildrenRecursively( roots );
		
		return roots;
	}
	
	/**
	 * 각 하위 메뉴 sortOrd 기준 정렬
	 * @param menus
	 */
	private static void sortChildrenRecursively( List<MenuResponseDto> menus ) {
		menus.sort( Comparator.comparing( MenuResponseDto::getSortOrd, Comparator.nullsLast( Integer::compareTo ) ) );
		
		for ( MenuResponseDto menu : menus ) {
			if ( !menu.getChildren().isEmpty() ) {
				sortChildrenRecursively( menu.getChildren() );
			}
		}
	}
}
