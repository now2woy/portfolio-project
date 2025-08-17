package kr.co.jineddy.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.board.api.dto.BrdCfgResponseDto;
import kr.co.jineddy.board.service.dto.BrdCfgInternalDto;

/**
 * 게시판 설정 Mapper
 */
@Mapper
public interface BrdCfgMapper {
	/**
	 * 전체 건수
	 * @param internalDto
	 * @return
	 */
	long selectCountAll(BrdCfgInternalDto internalDto);
	/**
	 * 페이징 목록
	 * @param internalDto
	 * @return
	 */
	List<BrdCfgResponseDto> selectPageAll(BrdCfgInternalDto internalDto);
}
