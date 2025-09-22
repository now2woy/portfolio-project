package kr.co.jineddy.meta.service.word;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.meta.MetaErrorCode;
import kr.co.jineddy.meta.api.dto.WordRequestDto;
import kr.co.jineddy.meta.api.dto.WordResponseDto;
import kr.co.jineddy.meta.entity.word.MetWordMst;
import kr.co.jineddy.meta.repository.word.MetWordMstRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 단어 Service
 */
@Slf4j
@Transactional
@Service("wordService")
@RequiredArgsConstructor
public class WordService {
	/**
	 * 표준 단어 마스터 Repository
	 */
	private final MetWordMstRepository metWordMstRepository;
	
	/**
	 * 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<WordResponseDto> findPage(WordRequestDto requestDto, Pageable pageable) {
		return null;
	}
	
	/**
	 * 단건 조회
	 * @param wordId
	 * @return
	 */
	public WordResponseDto findById(long wordId) {
		return entityToResponseDto(findEntity(wordId));
	}
	
	/**
	 * 입력
	 * @param requestDto
	 * @return
	 */
	public WordResponseDto insert(WordRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		MetWordMst entity = MetWordMst.builder()
				.insDt(now)
				.insId(userId)
				.updDt(now)
				.updId(userId)
				.build();
		
		return entityToResponseDto(metWordMstRepository.save(entity));
	}
	
	/**
	 * 수정
	 * @param wordId
	 * @param requestDto
	 * @return
	 */
	public WordResponseDto update(long wordId, WordRequestDto requestDto) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetWordMst entity = findEntity(wordId);
		entity.setUpdDt(now);
		entity.setUpdId(userId);
		
		return entityToResponseDto(metWordMstRepository.save(entity));
	}
	
	/**
	 * 삭제
	 * @param wordId
	 * @return
	 */
	public WordResponseDto delete(long wordId) {
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 처리할 데이터 조회
		MetWordMst entity = findEntity(wordId);
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
	private MetWordMst findEntity(long wordId) throws EntityNotFoundException {
		try {
			return metWordMstRepository.findById(wordId).orElseThrow(() -> new EntityNotFoundException(wordId + "에 해당하는 데이터가 없습니다."));
		} catch(EntityNotFoundException e) {
			log.error("Entity 조회 중 오류 발생", e);
			throw new ProjectException(MetaErrorCode.WORD_NOT_FOUND);
		}
	}
	
	/**
	 * 
	 */
	private WordResponseDto entityToResponseDto(MetWordMst entity) {
		return null;
	}
}
