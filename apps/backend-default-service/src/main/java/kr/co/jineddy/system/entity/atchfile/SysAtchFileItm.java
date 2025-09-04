package kr.co.jineddy.system.entity.atchfile;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 첨부 파일 항목 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SysAtchFileItmPk.class)
public class SysAtchFileItm implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 2133014358065122750L;
	/**
	 * 첨부 파일 ID
	 */
	@Id
	private Long atchFileId;
	/**
	 * 첨부 파일 순번
	 */
	@Id
	private Long atchFileSeq;
	/**
	 * 첨부 파일 명
	 */
	private String atchFileNm;
	/**
	 * 저장 파일 명
	 */
	private String saveFileNm;
	/**
	 * 저장 경로
	 */
	private String savePath;
	/**
	 * 확장자
	 */
	private String ext;
	/**
	 * 마임 타입
	 */
	private String mimeType;
	/**
	 * 파일 크기
	 */
	private Long fileSize;
	/**
	 * 삭제 여부
	 */
	private String delYn;
	/**
	 * 입력 일시
	 */
	private LocalDateTime insDt;
	/**
	 * 입력 ID
	 */
	private String insId;
	/**
	 * 수정 일시
	 */
	private LocalDateTime updDt;
	/**
	 * 수정 ID
	 */
	private String updId;
}
