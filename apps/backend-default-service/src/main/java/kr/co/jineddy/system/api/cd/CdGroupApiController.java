package kr.co.jineddy.system.api.cd;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jineddy.system.api.cd.dto.CdGroupReqeustDto;
import kr.co.jineddy.system.api.cd.dto.CdGroupResponseDto;
import kr.co.jineddy.system.api.cd.dto.CdGroupUpdateRequestDto;
import kr.co.jineddy.system.service.cd.CdGroupService;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 코드 그룹 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping( "/api/system/v1/cd-groups" )
public class CdGroupApiController {
	/**
	 * 시스템 코드 그룹 Service
	 */
	private final CdGroupService cdGroupService;
	
	/**
	 * 시스템 코드 그룹 목록 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping
	public ResponseEntity<Page<CdGroupResponseDto>> findPage( CdGroupReqeustDto requestDto, @PageableDefault( sort = "upd_dt", direction = Sort.Direction.DESC ) Pageable pageable ) {
		return ResponseEntity.ok( cdGroupService.findPage( requestDto, pageable ) );
	}
	
	/**
	 * 시스템 코드 그룹 단건 조회
	 * @param cdGroupId
	 * @return
	 */
	@GetMapping( "/{cdGroupId}" )
	public ResponseEntity<CdGroupResponseDto> findById( @PathVariable( name="cdGroupId" ) String cdGroupId ) {
		return ResponseEntity.ok( cdGroupService.findById( cdGroupId ) );
	}
	
	/**
	 * 
	 * 시스템 코드 그룹 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping
	public ResponseEntity<CdGroupResponseDto> insert( CdGroupReqeustDto requestDto ) {
		return ResponseEntity.ok( cdGroupService.insert( requestDto ) );
	}
	
	/**
	 * 시스템 코드 그룹 수정
	 * @param cdGroupId
	 * @param requestDto
	 * @return
	 */
	@PutMapping( "/{cdGroupId}" )
	public ResponseEntity<CdGroupResponseDto> update( @PathVariable( name="cdGroupId" ) String cdGroupId, CdGroupReqeustDto requestDto ) {
		return ResponseEntity.ok( cdGroupService.update( cdGroupId, requestDto ) );
	}
	
	/**
	 * 시스템 코드 그룹 및 하위 코드 수정
	 * @param cdGroupId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{cdGroupId}/cds")
	public ResponseEntity<?> updateCdGroupAndAllCds( @PathVariable("cdGroupId") String cdGroupId, @RequestBody CdGroupUpdateRequestDto requestDto ) {
		return ResponseEntity.ok( cdGroupService.updateCdGroupAndAllCds( cdGroupId, requestDto ) );
	}
	
	/**
	 * 시스템 코드 그룹 삭제
	 * @param cdGroupId
	 * @return
	 */
	@DeleteMapping( "/{cdGroupId}" )
	public ResponseEntity<CdGroupResponseDto> delete( @PathVariable(name="cdGroupId") String cdGroupId ) {
		return ResponseEntity.ok( cdGroupService.delete( cdGroupId ) );
	}
}
