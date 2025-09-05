package kr.co.jineddy.board.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import kr.co.jineddy.board.api.dto.BrdCfgRequestDto;
import kr.co.jineddy.board.api.dto.BrdCfgResponseDto;
import kr.co.jineddy.board.entity.BrdCfgMst;
import kr.co.jineddy.board.mapper.BrdCfgMapper;
import kr.co.jineddy.board.repository.BrdCfgMstRepository;
import kr.co.jineddy.board.service.dto.BrdCfgInternalDto;
import kr.co.jineddy.common.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 게시판 Service
 */
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service("brdCfgService")
public class BrdCfgService {
	/**
	 * 게시판 설정 Repository
	 */
	private final BrdCfgMstRepository brdCfgMstRepository;
	/**
	 * 게시판 설정 Mapper
	 */
	private final BrdCfgMapper brdCfgMapper;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<BrdCfgResponseDto> findPage(BrdCfgRequestDto requestDto, Pageable pageable) {
		BrdCfgInternalDto internalDto = new BrdCfgInternalDto();
		internalDto.setBrdNm(requestDto.getBrdNm());
		internalDto.setDelYn(requestDto.getDelYn());
		internalDto.setOffset(pageable.getOffset());
		internalDto.setPageSize(pageable.getPageSize());
		
		List<BrdCfgResponseDto> responseDtoList = null;
		long total = brdCfgMapper.selectCountAll(internalDto);
		
		// 조회된 데이터가 있을 경우
		if(total > 0L){
			// 목록 데이터 조회
			responseDtoList = brdCfgMapper.selectPageAll(internalDto);
		}
		
		return new PageImpl<>(responseDtoList, pageable, total);
	}
	
	/**
	 * 단건 조회
	 * @param boardId
	 * @return
	 */
	public BrdCfgResponseDto findById(int boardId) {
		BrdCfgMst brdCfgMst = findBrdCfgMst(boardId);
		return entityToResponseDto(brdCfgMst);
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	public BrdCfgResponseDto insert(BrdCfgRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		
		// RequestDto to Entity
		BrdCfgMst brdCfgMst = BrdCfgMst.builder()
				.brdNm(requestDto.getBrdNm())
				.brdTyCd(requestDto.getBrdTyCd())
				.allowReplyYn(requestDto.getAllowReplyYn())
				.atchFileYn(requestDto.getAtchFileYn())
				.delYn("N")
				.insDt(now)
				.insId(userId)
				.updDt(now)
				.updId(userId)
				.build();
		
		// 데이터 저장
		brdCfgMstRepository.save(brdCfgMst);
		
		return entityToResponseDto(brdCfgMst);
	}
	
	/**
	 * 수정
	 * @param boardId
	 * @param requestDto
	 * @return
	 */
	public BrdCfgResponseDto update(int boardId, BrdCfgRequestDto requestDto) {
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		BrdCfgMst brdCfgMst = findBrdCfgMst(boardId);
		
		// 데이터 수정
		brdCfgMst.setBrdNm(requestDto.getBrdNm());
		brdCfgMst.setBrdTyCd(requestDto.getBrdTyCd());
		brdCfgMst.setAllowReplyYn(requestDto.getAllowReplyYn());
		brdCfgMst.setAtchFileYn(requestDto.getAtchFileYn());
		brdCfgMst.setDelYn(requestDto.getDelYn());
		brdCfgMst.setUpdDt(now);
		brdCfgMst.setUpdId(userId);
		
		// 데이터 저장
		brdCfgMstRepository.save(brdCfgMst);
		
		return entityToResponseDto(brdCfgMst);
	}
	
	/**
	 * 삭제
	 * @param boardId
	 * @return
	 */
	public BrdCfgResponseDto delete(int boardId) {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		BrdCfgMst brdCfgMst = findBrdCfgMst(boardId);
		
		brdCfgMst.setUpdDt(LocalDateTime.now());
		brdCfgMst.setUpdId(userId);
		brdCfgMst.setDelYn("N");
		
		// 데이터 저장
		brdCfgMstRepository.save(brdCfgMst);
		
		return entityToResponseDto(brdCfgMst);
	}
	
	/**
	 * 게시판 설정을 PK로 조회한다.
	 * @param boardId
	 * @return
	 * @throws EntityNotFoundException
	 */
	private BrdCfgMst findBrdCfgMst(int boardId) throws EntityNotFoundException {
		return brdCfgMstRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException(boardId + "에 해당하는 게시판이 없습니다."));
	}
	
	/**
	 * entity 를 ResponseDto로 변환
	 * @param entity
	 * @return
	 */
	private BrdCfgResponseDto entityToResponseDto(BrdCfgMst entity) {
		BrdCfgResponseDto responseDto = BrdCfgResponseDto.builder()
				.brdId(entity.getBrdId())
				.brdNm(entity.getBrdNm())
				.brdTyCd(entity.getBrdTyCd())
				.allowReplyYn(entity.getAllowReplyYn())
				.atchFileYn(entity.getAtchFileYn())
				.delYn(entity.getDelYn())
				.insDt(entity.getInsDt())
				.insId(entity.getInsId())
				.updDt(entity.getUpdDt())
				.updId(entity.getInsId())
				.build();
		
		return responseDto;
	}
}
