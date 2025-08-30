package kr.co.jineddy.system.service.menu;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.system.SystemErrorCode;
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
	 * 모든 메뉴 목록
	 * @return
	 */
	public List<MenuResponseDto> allMenus() throws ProjectException {
		try {
			// 모든 메뉴 조회 후 트리형태로 구조 변환
			return CommonUtils.buildTree(menuMapper.selectListByAll());
			
		} catch (ProjectException e) {
			throw e;
			
		} catch ( Exception e ) {
			log.error("모든 메뉴 목록 조회 중 오류", e);
			// 안알려진 시스템 업무 오류
			throw new ProjectException(SystemErrorCode.SYS_UNKNOWN_ERROR);
		}
	}
	
	/**
	 * 사용자가 가지고 있는 메뉴 목록
	 * @return
	 */
	public List<MenuResponseDto> userMenus() throws ProjectException {
		try {
			String userId = CommonUtils.getUserId();
			
			// 사용자정보가 없을 경우
			if(StringUtils.isEmpty(userId)) {
				// 사용자 ID 없음 오류 발생
				throw new ProjectException(SystemErrorCode.USER_ID_NOT_FOUND);
			}
			
			// 사용자 메뉴 조회 후 트리형태로 구조 변환
			return CommonUtils.buildTree(menuMapper.selectListByUserId(userId));
			
		} catch (ProjectException e) {
			throw e;
			
		} catch ( Exception e ) {
			log.error("사용자가 가지고 있는 메뉴 목록 조회 중 오류", e);
			// 안알려진 시스템 업무 오류
			throw new ProjectException(SystemErrorCode.SYS_UNKNOWN_ERROR);
		}
	}
}
