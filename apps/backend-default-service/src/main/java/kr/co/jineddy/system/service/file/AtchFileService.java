package kr.co.jineddy.system.service.file;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import kr.co.jineddy.common.exception.ProjectException;
import kr.co.jineddy.common.util.CommonUtils;
import kr.co.jineddy.system.SystemErrorCode;
import kr.co.jineddy.system.api.atchfile.dto.AtchFileRequestDto;
import kr.co.jineddy.system.api.atchfile.dto.AtchFileResponseDto;
import kr.co.jineddy.system.entity.atchfile.SysAtchFileItm;
import kr.co.jineddy.system.entity.atchfile.SysAtchFileItmPk;
import kr.co.jineddy.system.entity.atchfile.SysAtchFileMst;
import kr.co.jineddy.system.repository.atchfile.SysAtchFileItmReposiroty;
import kr.co.jineddy.system.repository.atchfile.SysAtchFileMstRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 첨부파일 Service
 */
@Slf4j
@Transactional
@RequiredArgsConstructor
@Service("atchFileService")
public class AtchFileService {
	/**
	 * 시스템 첨부 파일 마스터 Repository
	 */
	private final SysAtchFileMstRepository sysAtchFileMstRepository;
	/**
	 * 시스템 첨부 파일 항목 Repository
	 */
	private final SysAtchFileItmReposiroty sysAtchFileItmReposiroty;
	/**
	 * S3 스토리지 Service
	 */
	private final S3StorageService s3StorageService;
	
	/**
	 * 첨부파일 목록
	 * @param atchFileId
	 * @return
	 * @throws ProjectException
	 */
	public List<AtchFileResponseDto> list(Long atchFileId) throws ProjectException {
		return sysAtchFileItmReposiroty.findByAtchFileIdAndDelYn(atchFileId, "N").stream().map(AtchFileService::entityToResponseDto).collect(Collectors.toList());
	}
	
	/**
	 * 첨부파일 업로드
	 * @param files
	 * @return
	 */
	public Long uploadFiles( List<MultipartFile> files ) throws ProjectException {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		
		// 첨부파일이 없을 경우
		if ( files.isEmpty() ) {
			throw new ProjectException( SystemErrorCode.UPLOAD_FILE_NOT_FOUND );
		}
		
		// 첨부파일 마스터 정보를 생성한다.
		SysAtchFileMst entity = SysAtchFileMst.builder()
			.useYn("Y")
			.insDt(now)
			.insId(userId)
			.updDt(now)
			.updId(userId)
			.build();
		
		sysAtchFileMstRepository.save(entity);
		
		// 첨부파일을 물리 처리 한다.
		List<SysAtchFileItm> uploadFileList = uploadFiles( entity.getAtchFileId(), 1L, files, userId, now );
		
		// 목록 데이터를 저장한다.
		sysAtchFileItmReposiroty.saveAll(uploadFileList);
		
		return entity.getAtchFileId();
	}
	
	/**
	 * 첨부파일 수정
	 * @param requestDto
	 * @param files
	 * @return
	 */
	public Long updateFiles(Long atchFileId, List<AtchFileRequestDto> deletefiles, List<MultipartFile> files) throws ProjectException {
		// 사용자ID 추출
		String userId = CommonUtils.getUserId();
		// 현재일시
		LocalDateTime now = LocalDateTime.now();
		
		// 추가할 첨부파일이 없고 삭제할 첨부파일도 없을 경우
		if ( ( files == null || files.isEmpty() ) && ( deletefiles == null || deletefiles.isEmpty() ) ) {
			if( atchFileId != null ) {
				return atchFileId;
			} else {
				return 0L;
			}
		}
		
		// 첨부 파일 ID로 첨부파일 마스터 정보 조회
		SysAtchFileMst entity = null;
		// 첨부파일순번(기본 1)
		Long maxAtchFileSeq = 1L;
		
		// 첨부파일ID가 없을 경우
		if(atchFileId == null) {
			// 생성
			entity = SysAtchFileMst.builder()
					.useYn("Y")
					.insDt(now)
					.insId(userId)
					.updDt(now)
					.updId(userId)
					.build();
				
				sysAtchFileMstRepository.save(entity);
				
		// 있을 경우
		} else {
			// 조회
			entity = sysAtchFileMstRepository.findById(atchFileId).orElseThrow(() -> new ProjectException( SystemErrorCode.UPLOAD_FILE_AND_DELETE_FILE_NOT_FOUND ));
			maxAtchFileSeq = sysAtchFileItmReposiroty.findTopByAtchFileIdOrderByAtchFileSeqDesc(atchFileId).orElse(SysAtchFileItm.builder().atchFileSeq(0L).build()).getAtchFileSeq() + 1;
			
			// 삭제 할 첨부파일이 있을 경우
			if( deletefiles != null  && !deletefiles.isEmpty() ) {
				// 삭제할 첨부파일 정보 조회
				List<SysAtchFileItm> uploadedFileList = sysAtchFileItmReposiroty.findByAtchFileIdAndAtchFileSeqIn(atchFileId, deletefiles.stream().map(AtchFileRequestDto::getAtchFileSeq).collect(Collectors.toList()));
				
				for( SysAtchFileItm deleteFile : uploadedFileList ) {
					deleteFile.setDelYn( "Y" );
					deleteFile.setUpdDt( now );
					deleteFile.setUpdId( userId );
					
					// 물리 파일도 삭제 한다.
					s3StorageService.delete(deleteFile.getSaveFileNm());
					
					// DB에서 삭제한다.
					sysAtchFileItmReposiroty.save( deleteFile );
				}
			}
		}
		
		// 업로드 된 파일이 있을 경우
		if( files != null && !files.isEmpty() ) {
			List<SysAtchFileItm> uploadFileList = uploadFiles( entity.getAtchFileId(), maxAtchFileSeq, files, userId, now );
			
			// 목록 데이터를 저장한다.
			sysAtchFileItmReposiroty.saveAll( uploadFileList );
		}
		
		return entity.getAtchFileId();
	}
	
	/**
	 * 첨부파일 다운로드
	 * @param atchFileId
	 * @param atchFileSeq
	 * @return
	 * @throws ProjectException
	 */
	public String downloadFile( Long atchFileId, Long atchFileSeq ) throws ProjectException {
		SysAtchFileItm entity = sysAtchFileItmReposiroty.findById(SysAtchFileItmPk.builder().atchFileId(atchFileId).atchFileSeq(atchFileSeq).build()).orElseThrow(() -> new ProjectException( SystemErrorCode.UPLOAD_FILE_AND_DELETE_FILE_NOT_FOUND ));
		
		return s3StorageService.generateDownloadUrl(entity.getSaveFileNm(), entity.getAtchFileNm());
	}
	
	/**
	 * entity 를 ResponseDto으로 변경
	 * @param entity
	 * @return
	 */
	private static AtchFileResponseDto entityToResponseDto(SysAtchFileItm entity) {
		return AtchFileResponseDto.builder()
			.atchFileId(entity.getAtchFileId())
			.atchFileSeq(entity.getAtchFileSeq())
			.atchFileNm(entity.getAtchFileNm())
			.fileSize(entity.getFileSize())
			.build();
	}
	
	/**
	 * 물리 경로에 첨부파일을 업로드 하고 해당 정보를 List로 만든다.
	 * @param atchFileId
	 * @param maxAtchFileSeq
	 * @param files
	 * @return
	 */
	private List<SysAtchFileItm> uploadFiles( Long atchFileId, Long maxAtchFileSeq, List<MultipartFile> files, String userId, LocalDateTime now ) {
		List<SysAtchFileItm> uploadFileList = new ArrayList<>();
		
		try {
			for ( MultipartFile file : files ) {
				if ( !file.isEmpty() ) {
					String atchFileNm = file.getOriginalFilename();
					String ext = atchFileNm.substring( atchFileNm.lastIndexOf( "." ) );
					long fileSize = file.getSize();
					String saveFileNm = s3StorageService.upload(file, ext);
					
					uploadFileList.add( SysAtchFileItm.builder()
						.atchFileId( atchFileId )
						.atchFileSeq( maxAtchFileSeq++ )
						.atchFileNm( atchFileNm )
						.saveFileNm( saveFileNm )
						.ext( ext )
						.mimeType( file.getContentType() )
						.fileSize( fileSize )
						.delYn( "N" )
						.insDt( now )
						.insId( userId )
						.updDt( now )
						.updId( userId )
						.build() );
				}
			}
		} catch( IOException e ) {
			log.error( "파일 업로드 실패", e );
			throw new ProjectException( SystemErrorCode.FILE_IOEXCEPTION_ERROR );
		}
		
		return uploadFileList;
	}
}
