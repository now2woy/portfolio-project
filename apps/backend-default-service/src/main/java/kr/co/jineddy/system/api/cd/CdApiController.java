package kr.co.jineddy.system.api.cd;

import org.springframework.data.web.SortDefault;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jineddy.system.api.cd.dto.CdRequestDto;
import kr.co.jineddy.system.api.cd.dto.CdResponseDto;
import kr.co.jineddy.system.service.cd.CdService;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 코드 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/cds")
public class CdApiController {
	/**
	 * 시스템 코드 Service
	 */
	private final CdService cdService;
	
	/**
	 * 시스템 코드 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping
	public Page<CdResponseDto> findPage(CdRequestDto requestDto
			, @SortDefault.SortDefaults({ @SortDefault(sort = "group_id", direction = Sort.Direction.ASC), @SortDefault(sort = "sort_ordr", direction = Sort.Direction.ASC) }) Pageable pageable) {
		return cdService.findPageMybatis(requestDto, pageable);
	}
	
	/**
	 * 시스템 코드 단건 조회
	 * @param cdGroupId
	 * @param cdId
	 * @return
	 */
	@GetMapping("/{cdGroupId}/{cdId}")
	public CdResponseDto findById(@PathVariable(name="cdGroupId") String cdGroupId, @PathVariable(name="cdId") String cdId) {
		return cdService.findById(cdGroupId, cdId);
	}
	
	/**
	 * 
	 * 시스템 코드 입력
	 * @param param
	 * @return
	 */
	@PostMapping
	public CdResponseDto insert(@RequestBody CdRequestDto requestDto) {
		return cdService.insert(requestDto);
	}
	
	/**
	 * 시스템 코드 수정
	 * @param cdId
	 * @param param
	 * @return
	 */
	@PutMapping("/{cdGroupId}/{cdId}")
	public CdResponseDto update(@PathVariable(name="cdGroupId") String cdGroupId, @PathVariable(name="cdId") String cdId, @RequestBody CdRequestDto requestDto) {
		return cdService.update(cdGroupId, cdId, requestDto);
	}
	
	/**
	 * 시스템 코드 삭제
	 * @param cdId
	 * @return
	 */
	@DeleteMapping("/{cdGroupId}/{cdId}")
	public CdResponseDto delete(@PathVariable(name="cdGroupId") String cdGroupId, @PathVariable(name="cdId") String cdId) {
		return cdService.delete(cdGroupId, cdId);
	}
}
