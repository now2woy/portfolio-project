package kr.co.jineddy.board.api;

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

import kr.co.jineddy.board.api.dto.BrdPostRequestDto;
import kr.co.jineddy.board.api.dto.BrdPostResponseDto;
import kr.co.jineddy.board.service.BrdPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 게시글 Controller
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board/v1/posts")
public class BrdPostApiController {
	/**
	 * 게시글 Service
	 */
	private final BrdPostService brdPostService;
	
	/**
	 * 게시글 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping("/{brdId}")
	public ResponseEntity<Page<BrdPostResponseDto>> findPage(@PathVariable(name="brdId") int brdId, BrdPostRequestDto requestDto, @SortDefault.SortDefaults(@SortDefault(sort = "upd_dt", direction = Sort.Direction.DESC)) Pageable pageable) {
		log.info("brdId : {}, requestDto : {}", brdId, requestDto);
		return ResponseEntity.ok(brdPostService.findPage(brdId, requestDto, pageable));
	}
	
	/**
	 * 게시글 단건 조회
	 * @param postId
	 * @return
	 */
	@GetMapping("/{brdId}/{postId}")
	public ResponseEntity<BrdPostResponseDto> findById(@PathVariable(name="brdId") int brdId, @PathVariable(name="postId") int postId) {
		return ResponseEntity.ok(brdPostService.findById(brdId, postId));
	}
	
	/**
	 * 게시글 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping("/{brdId}")
	public ResponseEntity<BrdPostResponseDto> insert(@PathVariable(name="brdId") int brdId, @RequestBody BrdPostRequestDto requestDto) {
		return ResponseEntity.ok(brdPostService.insert(brdId, requestDto));
	}
	
	/**
	 * 게시글 수정
	 * @param postId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{brdId}/{postId}")
	public ResponseEntity<BrdPostResponseDto> update(@PathVariable(name="brdId") int brdId, @PathVariable(name="postId") int postId, @RequestBody BrdPostRequestDto requestDto) {
		return ResponseEntity.ok(brdPostService.update(brdId, postId, requestDto));
	}
	
	/**
	 * 게시글 삭제
	 * @param postId
	 * @return
	 */
	@DeleteMapping("/{brdId}/{postId}")
	public ResponseEntity<BrdPostResponseDto> delete(@PathVariable(name="brdId") int brdId, @PathVariable(name="postId") int postId) {
		return ResponseEntity.ok(brdPostService.delete(brdId, postId));
	}
}
