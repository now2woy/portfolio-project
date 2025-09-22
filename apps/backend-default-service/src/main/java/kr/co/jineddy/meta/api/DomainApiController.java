package kr.co.jineddy.meta.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jineddy.meta.api.dto.DomainRequestDto;
import kr.co.jineddy.meta.api.dto.DomainResponseDto;
import kr.co.jineddy.meta.service.doamin.DomainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 도메인 Controller
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/meta/v1/domains")
public class DomainApiController {
	/**
	 * 도메인 Service
	 */
	private final DomainService domainService;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping()
	public ResponseEntity<Page<DomainResponseDto>> findPage(DomainRequestDto requestDto, @SortDefault.SortDefaults(@SortDefault(sort = "upd_dt", direction = Sort.Direction.DESC)) Pageable pageable) {
		return ResponseEntity.ok(domainService.findPage(requestDto, pageable));
	}
	
	/**
	 * 단건 조회
	 * @param domainId
	 * @return
	 */
	@GetMapping("/{domainId}")
	public ResponseEntity<DomainResponseDto> findById(@PathVariable(name="domainId") long domainId) {
		return ResponseEntity.ok(domainService.findById(domainId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<DomainResponseDto> insert(@RequestBody DomainRequestDto requestDto) {
		return ResponseEntity.ok(domainService.insert(requestDto));
	}
	
	/**
	 * 수정
	 * @param domainId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{domainId}")
	public ResponseEntity<DomainResponseDto> update(@PathVariable(name="domainId") long domainId, @RequestBody DomainRequestDto requestDto) {
		return ResponseEntity.ok(domainService.update(domainId, requestDto));
	}
	
	/**
	 * 삭제
	 * @param domainId
	 * @return
	 */
	@DeleteMapping("/{domainId}")
	public ResponseEntity<DomainResponseDto> delete(@PathVariable(name="domainId") long domainId) {
		return ResponseEntity.ok(domainService.delete(domainId));
	}
}
