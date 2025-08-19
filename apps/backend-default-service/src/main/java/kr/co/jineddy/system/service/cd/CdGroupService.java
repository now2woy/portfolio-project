package kr.co.jineddy.system.service.cd;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.system.api.cd.dto.CdGroupReqeustDto;
import kr.co.jineddy.system.api.cd.dto.CdGroupResponseDto;
import kr.co.jineddy.system.api.cd.dto.CdGroupUpdateRequestDto;
import kr.co.jineddy.system.api.cd.dto.CdRequestDto;
import kr.co.jineddy.system.entity.cd.SysCdGroupMst;
import kr.co.jineddy.system.entity.cd.SysCdMst;
import kr.co.jineddy.system.entity.cd.SysCdMstPk;
import kr.co.jineddy.system.mapper.cd.CdGroupMapper;
import kr.co.jineddy.system.repository.cd.SysCdGroupMstRepository;
import kr.co.jineddy.system.repository.cd.SysCdMstRepository;
import kr.co.jineddy.system.service.cd.dto.SysCdGroupInternalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 코드 그룹 Service
 */
@Slf4j
@Transactional
@RequiredArgsConstructor
@Service("cdGroupService")
public class CdGroupService {
	/**
	 * 시스템 코드 그룹 Repository
	 */
	private final SysCdGroupMstRepository sysCdGroupMstRepository;
	/**
	 * 시스템 코드 Repository
	 */
	private final SysCdMstRepository sysCdMstRepository;
	/**
	 * 코드 그룹 Mapper
	 */
	private final CdGroupMapper cdGroupMapper;
	
	/**
	 * 시스템 코드 그룹 목록 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<CdGroupResponseDto> findPage( CdGroupReqeustDto requestDto, Pageable pageable ) {
		SysCdGroupInternalDto internalDto = SysCdGroupInternalDto.builder()
				.groupId( requestDto.getGroupId() )
				.groupNm( requestDto.getGroupNm() )
				.useYn( requestDto.getUseYn() )
				.pageSize( pageable.getPageSize() )
				.offset( pageable.getOffset() )
				.build();
		
		long total = cdGroupMapper.selectCountAll( internalDto );
		List<CdGroupResponseDto> responseDtoList = cdGroupMapper.selectPageAll( internalDto );
		
		return new PageImpl<>( responseDtoList, pageable, total );
	}
	
	/**
	 * 시스템 코드 그룹 단건 조회
	 * @param cdGroupId
	 * @return
	 */
	public CdGroupResponseDto findById(String cdGroupId) {
		return entityToResponse( findEntity( cdGroupId ) );
	}
	
	/**
	 * 시스템 코드 그룹 입력
	 * @param requestDto
	 * @return
	 */
	public CdGroupResponseDto insert( CdGroupReqeustDto requestDto ) {
		// 현재 일시
		LocalDateTime now = LocalDateTime.now();
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		
		// 요청 데이터를 Entity로 변환
		SysCdGroupMst entity = requestToEntity(requestDto);
		entity.setInsDt( now );
		entity.setInsId( userId );
		entity.setUpdDt( now );
		entity.setUpdId( userId );
		
		// 데이터 저장
		sysCdGroupMstRepository.save( entity );
		
		return entityToResponse( entity );
	}
	
	/**
	 * 시스템 코드 그룹 수정
	 * @param cdGroupId
	 * @param requestDto
	 * @return
	 */
	public CdGroupResponseDto update( String cdGroupId, CdGroupReqeustDto requestDto ) {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 기존 자료 조회
		SysCdGroupMst entity = findEntity( cdGroupId );
		
		// 변경 자료 SET
		entity.setGroupNm( requestDto.getGroupNm() );
		entity.setDc( requestDto.getDc() );
		entity.setDataTyCd( requestDto.getDataTyCd() );
		entity.setLt( requestDto.getLt() );
		entity.setFormat( requestDto.getFormat() );
		entity.setUnitCd( requestDto.getUnitCd() );
		entity.setFixedLtYn( requestDto.getFixedLtYn() );
		entity.setUseYn( requestDto.getUseYn() );
		entity.setUpdDt( LocalDateTime.now() );
		entity.setUpdId( userId );
		
		log.info( "update : {}", entity.toString() );
		
		// 데이터 저장
		sysCdGroupMstRepository.save( entity );
		
		return entityToResponse( entity );
	}
	
	/**
	 * 시스템 코드 그룹 및 하위 코드 수정
	 * @param cdGroupId
	 * @param requestDto
	 * @return
	 */
	public CdGroupResponseDto updateCdGroupAndAllCds( String cdGroupId, CdGroupUpdateRequestDto requestDto ) {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 기존 자료 조회
		SysCdGroupMst entity = findEntity( cdGroupId );
		
		// 변경 자료 SET
		entity.setGroupNm( requestDto.getGroupNm() );
		entity.setDc( requestDto.getDc() );
		entity.setDataTyCd( requestDto.getDataTyCd() );
		entity.setLt( requestDto.getLt() );
		entity.setFormat( requestDto.getFormat() );
		entity.setUnitCd( requestDto.getUnitCd() );
		entity.setFixedLtYn( requestDto.getFixedLtYn() );
		entity.setUseYn( requestDto.getUseYn() );
		entity.setUpdDt( LocalDateTime.now() );
		entity.setUpdId( userId );
		
		log.info( "update all : {}", entity.toString() );
		
		// 데이터 저장
		sysCdGroupMstRepository.save( entity );
		
		// 기존 코드 목록 조회
		List<SysCdMst> existingCds = sysCdMstRepository.findByGroupId( cdGroupId );
		Set<String> existingCdIds = existingCds.stream()
				.map( SysCdMst::getCdId )
				.collect( Collectors.toSet() );
		
		// 새로운 코드 목록에서 ID만 추출
		Set<String> updatedCdIds = requestDto.getCds().stream()
				.map( CdRequestDto::getCdId )
				.collect( Collectors.toSet() );
		
		// 삭제 대상 코드
		// 기존 코드에는 있지만, 새로운 목록에는 없는 코드를 찾아 삭제
		List<SysCdMstPk> cdsToDelete = existingCds.stream()
				.filter( existingCd -> !updatedCdIds.contains(existingCd.getCdId()) )
				.map( existingCd -> SysCdMstPk.builder().groupId( existingCd.getGroupId() ).cdId( existingCd.getCdId() ).build() )
				.collect( Collectors.toList() );
		
		log.info( "delete cd : {}", cdsToDelete.stream().map( SysCdMstPk::toString ).collect( Collectors.joining(", ") ) );
		
		// 일괄 삭제
		sysCdMstRepository.deleteAllByIdInBatch( cdsToDelete );
		
		// 추가 및 수정 대상 코드
		// 새로운 목록의 모든 코드를 순회하며 업데이트 또는 추가
		for( CdRequestDto cdDto : requestDto.getCds() ) {
			SysCdMst cd = null;
			
			// 수정
			if ( existingCdIds.contains( cdDto.getCdId() ) ) {
				SysCdMstPk entityPk = new SysCdMstPk( cdGroupId, cdDto.getCdId() );
				cd = sysCdMstRepository.findById( entityPk ).orElseThrow( () -> new EntityNotFoundException( cdGroupId + ", " + cdDto.getCdId() + "에 해당하는 시스템 코드가 없습니다." ) );
				cd.setCdNm( cdDto.getCdNm() );
				cd.setSortOrdr( cdDto.getSortOrdr() );
				cd.setUseYn( cdDto.getUseYn() );
				cd.setRm( cdDto.getRm() );
				cd.setUpdDt( LocalDateTime.now() );
				cd.setUpdId( userId );
				
			// 입력
			} else {
				cd = SysCdMst.builder()
					.groupId( cdGroupId )
					.cdId( cdDto.getCdId() )
					.cdNm( cdDto.getCdNm() )
					.sortOrdr( cdDto.getSortOrdr() )
					.useYn( cdDto.getUseYn() )
					.rm( cdDto.getRm() )
					.insId( cdDto.getInsId() )
					.insId( userId )
					.updId( cdDto.getUpdId() )
					.updId( userId )
					.build();
			}
			
			log.info( "insert or update cd : {}", entity.toString() );
			
			sysCdMstRepository.save( cd );
		}
		
		return entityToResponse( entity );
	}
	
	/**
	 * 시스템 코드 그룹 삭제
	 * @param cdGroupId
	 * @return
	 */
	public CdGroupResponseDto delete( String cdGroupId ) {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		
		SysCdGroupMst entity = findEntity( cdGroupId );
		
		// 삭제정보 SET
		entity.setUpdDt( LocalDateTime.now() );
		entity.setUpdId( userId );
		entity.setUseYn( "N" );
		
		// 데이터 저장(하드 삭제하지 않고 소프트 삭제)
		sysCdGroupMstRepository.save( entity );
		
		return entityToResponse( entity );
	}
	
	/**
	 * PK를 이용해 Entity 단건을 조회한다.
	 * @param cdGroupId
	 * @return
	 * @throws EntityNotFoundException
	 */
	private SysCdGroupMst findEntity( String cdGroupId ) throws EntityNotFoundException {
		return sysCdGroupMstRepository.findById( cdGroupId ).orElseThrow( () -> new EntityNotFoundException( cdGroupId + "에 해당하는 시스템 코드 그룹이 없습니다." ) );
	}
	
	/**
	 * RequestDto to Entity
	 * @param requestDto
	 * @return
	 */
	private SysCdGroupMst requestToEntity( CdGroupReqeustDto requestDto ) {
		return SysCdGroupMst.builder()
			.groupId( requestDto.getGroupId() )
			.groupNm( requestDto.getGroupNm() )
			.dc( requestDto.getDc() )
			.dataTyCd( requestDto.getDataTyCd() )
			.lt( requestDto.getLt() )
			.format( requestDto.getFormat() )
			.unitCd( requestDto.getUnitCd() )
			.fixedLtYn( requestDto.getFixedLtYn() )
			.useYn( requestDto.getUseYn() )
			.insDt( requestDto.getInsDt() )
			.insId( requestDto.getInsId() )
			.updDt( requestDto.getUpdDt() )
			.updId( requestDto.getUpdId() )
			.build();
	}
	
	/**
	 * Entity To ResponseDto
	 * @param entity
	 */
	private CdGroupResponseDto entityToResponse( SysCdGroupMst entity ) {
		return CdGroupResponseDto.builder()
			.groupId( entity.getGroupId() )
			.groupNm( entity.getGroupNm() )
			.dc( entity.getDc() )
			.dataTyCd( entity.getDataTyCd() )
			.lt( entity.getLt() )
			.format( entity.getFormat() )
			.unitCd( entity.getUnitCd() )
			.fixedLtYn( entity.getFixedLtYn() )
			.useYn( entity.getUseYn() )
			.insDt( entity.getInsDt() )
			.insId( entity.getInsId() )
			.updDt( entity.getUpdDt() )
			.updId( entity.getUpdId() )
			.build();
	}
}
