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

import kr.co.jineddy.meta.api.dto.WordRequestDto;
import kr.co.jineddy.meta.api.dto.WordResponseDto;
import kr.co.jineddy.meta.service.word.WordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 단어 Controller
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/meta/v1/words")
public class WordApiController {
	/**
	 * 단어 Service
	 */
	private final WordService wordService;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping()
	public ResponseEntity<Page<WordResponseDto>> findPage(WordRequestDto requestDto, @SortDefault.SortDefaults(@SortDefault(sort = "upd_dt", direction = Sort.Direction.DESC)) Pageable pageable) {
		return ResponseEntity.ok(wordService.findPage(requestDto, pageable));
	}
	
	/**
	 * 단건 조회
	 * @param wordId
	 * @return
	 */
	@GetMapping("/{wordId}")
	public ResponseEntity<WordResponseDto> findById(@PathVariable(name="wordId") long wordId) {
		return ResponseEntity.ok(wordService.findById(wordId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<WordResponseDto> insert(@RequestBody WordRequestDto requestDto) {
		return ResponseEntity.ok(wordService.insert(requestDto));
	}
	
	/**
	 * 수정
	 * @param wordId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{wordId}")
	public ResponseEntity<WordResponseDto> update(@PathVariable(name="wordId") long wordId, @RequestBody WordRequestDto requestDto) {
		return ResponseEntity.ok(wordService.update(wordId, requestDto));
	}
	
	/**
	 * 삭제
	 * @param wordId
	 * @return
	 */
	@DeleteMapping("/{wordId}")
	public ResponseEntity<WordResponseDto> delete(@PathVariable(name="wordId") long wordId) {
		return ResponseEntity.ok(wordService.delete(wordId));
	}
}
