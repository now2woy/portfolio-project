package kr.co.jineddy.system.mapper.menu;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.system.api.menu.dto.MenuResponseDto;

/**
 * 메뉴 Mapper
 */
@Mapper
public interface MenuMapper {
	/**
	 * 모든 메뉴 목록
	 * @return
	 */
	List<MenuResponseDto> selectListByAll();
	/**
	 * 사용자가 가지고 있는 메뉴 목록
	 * @param userId
	 * @return
	 */
	List<MenuResponseDto> selectListByUserId(String userId);
}
