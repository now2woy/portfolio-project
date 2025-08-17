package kr.co.jineddy.board.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.board.BoardErrorCode;
import kr.co.jineddy.board.api.dto.BrdPostRequestDto;
import kr.co.jineddy.board.api.dto.BrdPostResponseDto;
import kr.co.jineddy.board.entity.BrdPostMst;
import kr.co.jineddy.board.mapper.BrdPostMapper;
import kr.co.jineddy.board.repository.BrdPostMstRepository;
import kr.co.jineddy.board.service.dto.BrdPostInternalDto;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 게시글 Service
 */
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service("brdPostService")
public class BrdPostService {
	/**
	 * 게시글 Repository
	 */
	private final BrdPostMstRepository brdPostMstRepository;
	/**
	 * 게시글 Mapper
	 */
	private final BrdPostMapper brdPostMapper;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<BrdPostResponseDto> findPage(int brdId, BrdPostRequestDto requestDto, Pageable pageable) {
		BrdPostInternalDto internalDto = new BrdPostInternalDto();
		internalDto.setBrdId(brdId);
		internalDto.setPostTtl(requestDto.getPostTtl());
		internalDto.setPostCtt(requestDto.getPostCtt());
		internalDto.setWriterId(requestDto.getWriterId());
		internalDto.setOffset(pageable.getOffset());
		internalDto.setPageSize(pageable.getPageSize());
		
		List<BrdPostResponseDto> responseDtoList = null;
		long total = brdPostMapper.selectCountAll(internalDto);
		
		// 목록 데이터 조회
		responseDtoList = brdPostMapper.selectPageAll(internalDto);
		
		return new PageImpl<>(responseDtoList, pageable, total);
	}
	
	/**
	 * 단건 조회
	 * @param brdId
	 * @param postId
	 * @return
	 * @throws Exception
	 */
	public BrdPostResponseDto findById(int brdId, int postId) throws ProjectException {
		BrdPostMst brdPostMst = findBrdPostMst(postId);
		
		// 접근한 게시판ID와 실제 게시물의 게시판ID가 다를 경우
		if(brdId != brdPostMst.getBrdId()) {
			throw new ProjectException(BoardErrorCode.POST_ACCESS_DENIED);
		}
		
		return entityToResponseDto(brdPostMst);
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	public BrdPostResponseDto insert(int brdId, BrdPostRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		
		// RequestDto to Entity
		BrdPostMst brdPostMst = BrdPostMst.builder()
				.brdId(brdId)
				.postTtl(requestDto.getPostTtl())
				.postCtt(requestDto.getPostCtt())
				.writerId(userId)
				.viewCnt(0)
				.delYn("N")
				.delDt(null)
				.insDt(now)
				.insId(userId)
				.updDt(now)
				.updId(userId)
				.build();
		
		// 데이터 저장
		brdPostMstRepository.save(brdPostMst);
		
		return entityToResponseDto(brdPostMst);
	}
	
	/**
	 * 수정
	 * @param brdId
	 * @param postId
	 * @param requestDto
	 * @return
	 * @throws Exception
	 */
	public BrdPostResponseDto update(int brdId, int postId, BrdPostRequestDto requestDto) throws ProjectException {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 수정한 자료 조회
		BrdPostMst brdPostMst = findBrdPostMst(postId);
		
		// 접근한 게시판ID와 실제 게시물의 게시판ID가 다를 경우
		if(brdId != brdPostMst.getBrdId()) {
			throw new ProjectException(BoardErrorCode.POST_ACCESS_DENIED);
		}
		
		// 등록한 사람과 다를 경우 수정 불가
		if(!userId.equals(brdPostMst.getInsId())) {
			throw new ProjectException(BoardErrorCode.POST_UPDATE_NOT_ALLOW);
		}
		
		// 데이터 수정
		brdPostMst.setPostTtl(requestDto.getPostTtl());
		brdPostMst.setPostCtt(requestDto.getPostCtt());
		brdPostMst.setUpdDt(now);
		brdPostMst.setUpdId(userId);
		
		// 데이터 저장
		brdPostMstRepository.save(brdPostMst);
		
		return entityToResponseDto(brdPostMst);
	}
	
	/**
	 * 삭제
	 * @param brdId
	 * @param postId
	 * @return
	 * @throws Exception
	 */
	public BrdPostResponseDto delete(int brdId, int postId) throws ProjectException {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 수정한 자료 조회
		BrdPostMst brdPostMst = findBrdPostMst(postId);
		
		// 접근한 게시판ID와 실제 게시물의 게시판ID가 다를 경우
		if(brdId != brdPostMst.getBrdId()) {
			throw new ProjectException(BoardErrorCode.POST_ACCESS_DENIED);
		}
		
		log.info("userId : {}, WriterId : {}", userId, brdPostMst.getWriterId());
		
		// 등록한 사람과 다를 경우 수정 불가
		if(!userId.equals(brdPostMst.getWriterId())) {
			throw new ProjectException(BoardErrorCode.POST_DELETE_NOT_ALLOW);
		}
		
		// 삭제정보 추가
		brdPostMst.setDelYn("Y");
		brdPostMst.setDelDt(now);
		brdPostMst.setUpdDt(now);
		brdPostMst.setUpdId(userId);
		
		// 데이터 저장
		brdPostMstRepository.save(brdPostMst);
		
		return entityToResponseDto(brdPostMst);
	}
	
	/**
	 * 게시판 설정을 PK로 조회한다.
	 * @param boardId
	 * @return
	 * @throws EntityNotFoundException
	 */
	private BrdPostMst findBrdPostMst(int postId) throws EntityNotFoundException {
		return brdPostMstRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException(postId + "에 해당하는 게시물이 없습니다."));
	}
	
	/**
	 * entity 를 ResponseDto로 변환
	 * @param entity
	 * @return
	 */
	private BrdPostResponseDto entityToResponseDto(BrdPostMst entity) {
		BrdPostResponseDto responseDto = BrdPostResponseDto.builder()
				.brdId(entity.getBrdId())
				.postId(entity.getPostId())
				.postTtl(entity.getPostTtl())
				.postCtt(entity.getPostCtt())
				.writerId(entity.getWriterId())
				.viewCnt(entity.getViewCnt())
				.delYn(entity.getDelYn())
				.delDt(entity.getDelDt())
				.insDt(entity.getInsDt())
				.insId(entity.getInsId())
				.updDt(entity.getUpdDt())
				.updId(entity.getInsId())
				.build();
		
		return responseDto;
	}
}
