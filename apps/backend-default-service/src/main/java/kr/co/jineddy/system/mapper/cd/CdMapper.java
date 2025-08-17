package kr.co.jineddy.system.mapper.cd;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.system.api.cd.dto.CdResponseDto;
import kr.co.jineddy.system.service.cd.dto.SysCdInternalDto;

/**
 * 코드 Mapper
 */
@Mapper
public interface CdMapper {
	/**
	 * 전체 건수
	 * @param internalDto
	 * @return
	 */
	long selectCountAll(SysCdInternalDto internalDto);
	/**
	 * 페이징 목록
	 * @param internalDto
	 * @return
	 */
	List<CdResponseDto> selectPageAll(SysCdInternalDto internalDto);
}
