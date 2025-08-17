package kr.co.jineddy.system.api.cd;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jineddy.system.api.cd.dto.CdGroupReqeustDto;
import kr.co.jineddy.system.api.cd.dto.CdGroupResponseDto;
import kr.co.jineddy.system.service.cd.CdGroupService;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 코드 그룹 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/cd-groups")
public class CdGroupApiController {
	/**
	 * 
	 */
	private final CdGroupService cdGroupService;
	
	/**
	 * 시스템 코드 그룹 목록 조회
	 * @param param
	 * @return
	 */
	@GetMapping
	public Page<CdGroupResponseDto> findPage(CdGroupReqeustDto param, @PageableDefault(sort = "upd_dt", direction = Sort.Direction.DESC) Pageable pageable) {
		return null;
	}
	
	/**
	 * 시스템 코드 그룹 단건 조회
	 * @param cdGroupId
	 * @return
	 */
	@GetMapping("/{cdGroupId}")
	public CdGroupResponseDto findById(@PathVariable(name="cdGroupId") String cdGroupId) {
		return null;
	}
	
	/**
	 * 
	 * 시스템 코드 그룹 입력
	 * @param param
	 * @return
	 */
	@PostMapping
	public CdGroupResponseDto insert(CdGroupReqeustDto param) {
		return null;
	}
	
	/**
	 * 시스템 코드 그룹 수정
	 * @param cdGroupId
	 * @param param
	 * @return
	 */
	@PutMapping("/{cdGroupId}")
	public CdGroupResponseDto update(@PathVariable(name="cdGroupId") String cdGroupId, CdGroupReqeustDto param) {
		return null;
	}
	
	/**
	 * 시스템 코드 그룹 삭제
	 * @param cdGroupId
	 * @return
	 */
	@DeleteMapping("/{cdGroupId}")
	public CdGroupResponseDto delete(@PathVariable(name="cdGroupId") String cdGroupId) {
		return null;
	}
}
