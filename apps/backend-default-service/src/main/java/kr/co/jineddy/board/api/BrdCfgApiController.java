package kr.co.jineddy.board.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.jineddy.board.api.dto.BrdCfgRequestDto;
import kr.co.jineddy.board.api.dto.BrdCfgResponseDto;
import kr.co.jineddy.board.service.BrdCfgService;
import lombok.RequiredArgsConstructor;

/**
 * 게시판 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board/v1/boards")
public class BrdCfgApiController {
	/**
	 * 게시판 Service
	 */
	private final BrdCfgService brdCfgService;
	
	/**
	 * 게시판 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	@GetMapping
	public Page<BrdCfgResponseDto> findPage(BrdCfgRequestDto requestDto, @SortDefault.SortDefaults(@SortDefault(sort = "upd_dt", direction = Sort.Direction.DESC)) Pageable pageable) {
		return brdCfgService.findPage(requestDto, pageable);
	}
	
	/**
	 * 게시판 단건 조회
	 * @param brdId
	 * @return
	 */
	@GetMapping("/{brdId}")
	public BrdCfgResponseDto findById(@PathVariable(name="brdId") int brdId) {
		return brdCfgService.findById(brdId);
	}
	
	/**
	 * 게시판 입력
	 * @param requestDto
	 * @return
	 */
	@PostMapping
	public BrdCfgResponseDto insert(@RequestBody BrdCfgRequestDto requestDto) {
		return brdCfgService.insert(requestDto);
	}
	
	/**
	 * 게시판 수정
	 * @param brdId
	 * @param requestDto
	 * @return
	 */
	@PutMapping("/{brdId}")
	public BrdCfgResponseDto update(@PathVariable(name="brdId") int brdId, @RequestBody BrdCfgRequestDto requestDto) {
		return brdCfgService.update(brdId, requestDto);
	}
	
	/**
	 * 게시판 삭제
	 * @param brdId
	 * @return
	 */
	@DeleteMapping("/{brdId}")
	public BrdCfgResponseDto delete(@PathVariable(name="brdId") int brdId) {
		return brdCfgService.delete(brdId);
	}
}
