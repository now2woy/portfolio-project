package kr.co.jineddy.system.service.menu;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.system.api.menu.dto.MenuResponseDto;
import kr.co.jineddy.system.mapper.menu.MenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 Service
 */
@Slf4j
@Transactional
@Service("menuService")
@RequiredArgsConstructor
public class MenuService {
	/**
	 * 사용자 Mapper
	 */
	private final MenuMapper menuMapper;
	
	/**
	 * 사용자가 가지고 있는 메뉴 목록
	 * @return
	 */
	public List<MenuResponseDto> userMenus() {
		String userId = CommonUtils.getUserId();
		
		// 사용자 메뉴 조회 후 트리형태로 구조 변환
		return CommonUtils.buildTree(menuMapper.selectListByUserId(userId));
	}
}
