package kr.co.jineddy.system.api.atchfile;

import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.jineddy.system.api.atchfile.dto.AtchFileRequestDto;
import kr.co.jineddy.system.api.atchfile.dto.AtchFileResponseDto;
import kr.co.jineddy.system.service.file.AtchFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 첨부파일 Controller
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/attch-files")
public class AtchFileApiController {
	/**
	 * 첨부파일 Service
	 */
	private final AtchFileService atchFileService;
	
	/**
	 * 첨부파일 목록
	 * @param atchFileId
	 * @return
	 */
	@GetMapping("/{atchFileId}")
	public ResponseEntity<List<AtchFileResponseDto>> list(@PathVariable(name="atchFileId") Long atchFileId) {
		return ResponseEntity.ok(atchFileService.list(atchFileId));
	}
	
	/**
	 * 첨부파일 다운로드
	 * @param atchFileId
	 * @param atchFileSeq
	 * @return
	 */
	@GetMapping("/{atchFileId}/{atchFileSeq}")
	public ResponseEntity<DownloadResponse> attchFileDownload(@PathVariable(name="atchFileId") Long atchFileId, @PathVariable(name="atchFileSeq") Long atchFileSeq) {
		String url = atchFileService.downloadFile(atchFileId, atchFileSeq);
		
		log.info("download : {}", url);
		
		return ResponseEntity.ok().body(new DownloadResponse(url));
	}
	
	/**
	 * 첨부파일 업로드
	 * @param authRequestDto
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<Long> upload(@RequestParam(value = "atchFileId", required = false) Long atchFileId, @RequestPart(value = "deletefiles", required = false) List<AtchFileRequestDto> deletefiles, @RequestParam(value = "files", required = false) List<MultipartFile> files) {
		return ResponseEntity.ok(atchFileService.updateFiles(atchFileId, deletefiles, files));
	}
	
	record DownloadResponse(String url) {}
}
