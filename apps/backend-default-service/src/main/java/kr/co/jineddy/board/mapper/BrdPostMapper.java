package kr.co.jineddy.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.board.api.dto.BrdPostResponseDto;
import kr.co.jineddy.board.service.dto.BrdPostInternalDto;

/**
 * 게시글 Mapper
 */
@Mapper
public interface BrdPostMapper {
	/**
	 * 전체 건수
	 * @param internalDto
	 * @return
	 */
	long selectCountAll(BrdPostInternalDto internalDto);
	/**
	 * 페이징 목록
	 * @param internalDto
	 * @return
	 */
	List<BrdPostResponseDto> selectPageAll(BrdPostInternalDto internalDto);
}
