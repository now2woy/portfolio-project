package kr.co.jineddy.meta.service.doamin;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.meta.MetaErrorCode;
import kr.co.jineddy.meta.api.dto.DomainRequestDto;
import kr.co.jineddy.meta.api.dto.DomainResponseDto;
import kr.co.jineddy.meta.entity.domain.MetDomainMst;
import kr.co.jineddy.meta.entity.term.MetTermMst;
import kr.co.jineddy.meta.entity.word.MetWordMst;
import kr.co.jineddy.meta.repository.domain.MetDomainMstRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 도메인 Service
 */
@Slf4j
@Transactional
@Service("domainService")
@RequiredArgsConstructor
public class DomainService {
	/**
	 * 표준 도메인 마스터 Repository
	 */
	private final MetDomainMstRepository metDomainMstRepository;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<DomainResponseDto> findPage(DomainRequestDto requestDto, Pageable pageable) {
		return null;
	}
	
	/**
	 * 단건 조회
	 * @param domainId
	 * @return
	 */
	public DomainResponseDto findById(long domainId) throws ProjectException {
		return entityToResponseDto(findEntity(domainId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	public DomainResponseDto insert(DomainRequestDto requestDto) throws ProjectException {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		MetDomainMst entity = MetDomainMst.builder()
				.insDt(now)
				.insId(userId)
				.updDt(now)
				.updId(userId)
				.build();
		
		return entityToResponseDto(metDomainMstRepository.save(entity));
	}
	
	/**
	 * 수정
	 * @param domainId
	 * @param requestDto
	 * @return
	 */
	public DomainResponseDto update(long domainId, DomainRequestDto requestDto) throws ProjectException {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetDomainMst entity = findEntity(domainId);
		entity.setUpdDt(now);
		entity.setUpdId(userId);
		
		return entityToResponseDto(metDomainMstRepository.save(entity));
	}
	
	/**
	 * 삭제
	 * @param domainId
	 * @return
	 */
	public DomainResponseDto delete(long domainId) throws ProjectException {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetDomainMst entity = findEntity(domainId);
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
	private MetDomainMst findEntity(long domainId) throws ProjectException {
		try {
			return metDomainMstRepository.findById(domainId).orElseThrow(() -> new EntityNotFoundException(domainId + "에 해당하는 데이터가 없습니다."));
		} catch(EntityNotFoundException e) {
			log.error("Entity 조회 중 오류 발생", e);
			throw new ProjectException(MetaErrorCode.DIMAIN_NOT_FOUND);
		}
	}
	
	/**
	 * 
	 */
	private DomainResponseDto entityToResponseDto(MetDomainMst entity) {
		return null;
	}
}
