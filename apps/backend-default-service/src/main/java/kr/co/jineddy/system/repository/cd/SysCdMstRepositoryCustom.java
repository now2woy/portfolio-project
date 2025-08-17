package kr.co.jineddy.system.repository.cd;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import kr.co.jineddy.system.api.cd.dto.CdRequestDto;
import kr.co.jineddy.system.api.cd.dto.CdResponseDto;

/**
 * 시스템 코드 Repository Custom
 */
public interface SysCdMstRepositoryCustom {
	/**
	 * 시스템 코드 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	Page<CdResponseDto> findPage(CdRequestDto requestDto, Pageable pageable);
}