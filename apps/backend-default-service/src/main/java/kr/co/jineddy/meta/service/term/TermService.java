package kr.co.jineddy.meta.service.term;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.meta.MetaErrorCode;
import kr.co.jineddy.meta.api.dto.TermRequestDto;
import kr.co.jineddy.meta.api.dto.TermResponseDto;
import kr.co.jineddy.meta.entity.term.MetTermMst;
import kr.co.jineddy.meta.repository.term.MetTermMstRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 용어 Service
 */
@Slf4j
@Transactional
@Service("termService")
@RequiredArgsConstructor
public class TermService {
	/**
	 * 표준 용어 마스터 Repository
	 */
	private final MetTermMstRepository metTermMstRepository;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<TermResponseDto> findPage(TermRequestDto requestDto, Pageable pageable) {
		return null;
	}
	
	/**
	 * 단건 조회
	 * @param termId
	 * @return
	 */
	public TermResponseDto findById(long termId) {
		return entityToResponseDto(findEntity(termId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	public TermResponseDto insert(TermRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		MetTermMst entity = MetTermMst.builder()
				.insDt(now)
				.insId(userId)
				.updDt(now)
				.updId(userId)
				.build();
		
		return entityToResponseDto(metTermMstRepository.save(entity));
	}
	
	/**
	 * 수정
	 * @param termId
	 * @param requestDto
	 * @return
	 */
	public TermResponseDto update(long termId, TermRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetTermMst entity = findEntity(termId);
		entity.setUpdDt(now);
		entity.setUpdId(userId);
		
		return entityToResponseDto(metTermMstRepository.save(entity));
	}
	
	/**
	 * 삭제
	 * @param termId
	 * @return
	 */
	public TermResponseDto delete(long termId) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetTermMst entity = findEntity(termId);
		entity.setUpdDt(now);
		entity.setUpdId(userId);
		
		return null;
	}
	
	/**
	 * Entity 조회
	 * @param domainId
	 * @return
	 * @throws EntityNotFoundException
	 */
	private MetTermMst findEntity(long termId) throws EntityNotFoundException {
		try {
			return metTermMstRepository.findById(termId).orElseThrow(() -> new EntityNotFoundException(termId + "에 해당하는 데이터가 없습니다."));
		} catch(EntityNotFoundException e) {
			log.error("Entity 조회 중 오류 발생", e);
			throw new ProjectException(MetaErrorCode.TERM_NOT_FOUND);
		}
	}
	
	/**
	 * 
	 */
	private TermResponseDto entityToResponseDto(MetTermMst entity) {
		return null;
	}
}
