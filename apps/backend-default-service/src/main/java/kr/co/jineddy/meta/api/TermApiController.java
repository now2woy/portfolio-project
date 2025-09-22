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

import kr.co.jineddy.meta.api.dto.TermRequestDto;
import kr.co.jineddy.meta.api.dto.TermResponseDto;
import kr.co.jineddy.meta.service.term.TermService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 용어 Controller
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/meta/v1/terms")
public class TermApiController {
	/**
	 * 용어 Service
	 */
	private final TermService termService;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping()
	public ResponseEntity<Page<TermResponseDto>> findPage(TermRequestDto requestDto, @SortDefault.SortDefaults(@SortDefault(sort = "upd_dt", direction = Sort.Direction.DESC)) Pageable pageable) {
		return ResponseEntity.ok(termService.findPage(requestDto, pageable));
	}
	
	/**
	 * 단건 조회
	 * @param termId
	 * @return
	 */
	@GetMapping("/{termId}")
	public ResponseEntity<TermResponseDto> findById(@PathVariable(name="termId") long termId) {
		return ResponseEntity.ok(termService.findById(termId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<TermResponseDto> insert(@RequestBody TermRequestDto requestDto) {
		return ResponseEntity.ok(termService.insert(requestDto));
	}
	
	/**
	 * 수정
	 * @param termId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{termId}")
	public ResponseEntity<TermResponseDto> update(@PathVariable(name="termId") long termId, @RequestBody TermRequestDto requestDto) {
		return ResponseEntity.ok(termService.update(termId, requestDto));
	}
	
	/**
	 * 삭제
	 * @param termId
	 * @return
	 */
	@DeleteMapping("/{termId}")
	public ResponseEntity<TermResponseDto> delete(@PathVariable(name="termId") long termId) {
		return ResponseEntity.ok(termService.delete(termId));
	}
}
