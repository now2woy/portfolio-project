package kr.co.jineddy.system.mapper.cd;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.system.api.cd.dto.CdGroupResponseDto;
import kr.co.jineddy.system.service.cd.dto.SysCdGroupInternalDto;

/**
 * 코드 그룹 Mapper
 */
@Mapper
public interface CdGroupMapper {
	/**
	 * 전체 건수
	 * @param internalDto
	 * @return
	 */
	long selectCountAll(SysCdGroupInternalDto internalDto);
	/**
	 * 페이징 목록
	 * @param internalDto
	 * @return
	 */
	List<CdGroupResponseDto> selectPageAll(SysCdGroupInternalDto internalDto);
}
