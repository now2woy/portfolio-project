package kr.co.jineddy.system.service.cd;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.system.api.cd.dto.CdRequestDto;
import kr.co.jineddy.system.api.cd.dto.CdResponseDto;
import kr.co.jineddy.system.entity.cd.SysCdMst;
import kr.co.jineddy.system.entity.cd.SysCdMstPk;
import kr.co.jineddy.system.mapper.cd.CdMapper;
import kr.co.jineddy.system.repository.cd.SysCdMstRepository;
import kr.co.jineddy.system.service.cd.dto.SysCdInternalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 코드 Service
 */
@Slf4j
@Transactional
@RequiredArgsConstructor
@Service("cdService")
public class CdService {
	/**
	 * 시스템 코드 Repository
	 */
	private final SysCdMstRepository sysCdMstRepository;
	/**
	 * 코드 Mapper
	 */
	private final CdMapper cdMapper;
	
	/**
	 * 시스템 코드 목록 조회
	 * @param param
	 * @return
	 */
	public Page<CdResponseDto> findPage(CdRequestDto requestDto, Pageable pageable) {
		return sysCdMstRepository.findPage(requestDto, pageable);
	}
	
	/**
	 * 시스템 코드 목록 조회
	 * @param param
	 * @return
	 */
	public Page<CdResponseDto> findPageMybatis(CdRequestDto requestDto, Pageable pageable) {
		SysCdInternalDto internalDto = new SysCdInternalDto();
		internalDto.setGroupId(requestDto.getGroupId());
		internalDto.setCdId(requestDto.getCdId());
		internalDto.setUseYn(requestDto.getUseYn());
		internalDto.setPageSize(pageable.getPageSize());
		internalDto.setOffset((int) pageable.getOffset());
		
		List<CdResponseDto> responseDtoList = null;
		long total = cdMapper.selectCountAll(internalDto);
		
		// 조회된 데이터가 있을 경우
		if(total > 0L){
			// 목록 데이터 조회
			responseDtoList = cdMapper.selectPageAll(internalDto);
		}
		
		return new PageImpl<>(responseDtoList, pageable, total);
	}
	
	/**
	 * 시스템 코드 단건 조회
	 * @param cdGroupId
	 * @param cdId
	 * @return
	 */
	public CdResponseDto findById(String cdGroupId, String cdId) {
		return sysCdMstToResponse(findSysCdMst(cdGroupId, cdId));
	}
	
	/**
	 * 
	 * 시스템 코드 입력
	 * @param param
	 * @return
	 */
	public CdResponseDto insert(CdRequestDto requestDto) {
		// 현재 일시
		LocalDateTime now = LocalDateTime.now();
		
		// 요청 데이터를 Entity로 변환
		SysCdMst entity = requestDtoToSysCdMst(requestDto);
		entity.setInsDt(now);
		entity.setUpdDt(now);
		
		// 데이터 저장
		sysCdMstRepository.save(entity);
		
		return sysCdMstToResponse(entity);
	}
	
	/**
	 * 시스템 코드 수정
	 * @param cdId
	 * @param param
	 * @return
	 */
	public CdResponseDto update(@PathVariable String cdGroupId, @PathVariable String cdId, CdRequestDto requestDto) {
		// 기존 자료 조회
		SysCdMst entity = findSysCdMst(cdGroupId, cdId);
		
		// 변경 자료 SET
		entity.setCdNm(requestDto.getCdNm());
		entity.setSortOrdr(requestDto.getSortOrdr());
		entity.setUseYn(requestDto.getUseYn());
		entity.setRm(requestDto.getRm());
		entity.setUpdDt(LocalDateTime.now());
		entity.setUpdId(requestDto.getUpdId());
		
		log.info("update : {}", entity.toString());
		
		// 데이터 저장
		sysCdMstRepository.save(entity);
		
		return sysCdMstToResponse(entity);
	}
	
	/**
	 * 시스템 코드 삭제
	 * @param cdId
	 * @return
	 */
	public CdResponseDto delete(@PathVariable String cdGroupId, @PathVariable String cdId) {
		SysCdMst entity = findSysCdMst(cdGroupId, cdId);
		
		// TODO 수정 ID SET 필요
		entity.setUpdDt(LocalDateTime.now());
		entity.setUseYn("N");
		
		// 데이터 저장(하드 삭제하지 않고 소프트 삭제)
		sysCdMstRepository.save(entity);
		
		return sysCdMstToResponse(entity);
	}
	
	/**
	 * 시스템 코드를 PK 조회한다.
	 * @param cdGroupId
	 * @param cdId
	 * @return
	 * @throws EntityNotFoundException
	 */
	private SysCdMst findSysCdMst(String cdGroupId, String cdId) throws EntityNotFoundException {
		SysCdMstPk entityPk = new SysCdMstPk(cdGroupId, cdId);
		
		return sysCdMstRepository.findById(entityPk).orElseThrow(() -> new EntityNotFoundException(cdGroupId + ", " + cdId + "에 해당하는 시스템 코드가 없습니다."));
	}
	
	/**
	 * this to Entity
	 * @return
	 */
	private SysCdMst requestDtoToSysCdMst(CdRequestDto requestDto) {
		return SysCdMst.builder()
			.groupId( requestDto.getGroupId() )
			.cdId( requestDto.getCdId() )
			.cdNm( requestDto.getCdNm() )
			.sortOrdr( requestDto.getSortOrdr() )
			.useYn( requestDto.getUseYn() )
			.rm( requestDto.getRm() )
			.insId( requestDto.getInsId() )
			.updId( requestDto.getUpdId() )
			.build();
	}
	
	/**
	 * Entity To ResponseDto
	 * @param entity
	 */
	private CdResponseDto sysCdMstToResponse(SysCdMst sysCdMst) {
		return CdResponseDto.builder()
			.groupId( sysCdMst.getGroupId() )
			.cdId( sysCdMst.getCdId() )
			.cdNm( sysCdMst.getCdNm() )
			.sortOrdr( sysCdMst.getSortOrdr() )
			.useYn( sysCdMst.getUseYn() )
			.rm( sysCdMst.getRm() )
			.insDt( sysCdMst.getInsDt() )
			.insId( sysCdMst.getInsId() )
			.updDt( sysCdMst.getUpdDt() )
			.updId( sysCdMst.getUpdId() )
			.build();
	}
}