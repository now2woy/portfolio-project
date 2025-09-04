package kr.co.jineddy.system.entity.atchfile;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 첨부 파일 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysAtchFileMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 5513999483206891292L;
	/**
	 * 첨부 파일 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long atchFileId;
	/**
	 * 사용 여부
	 */
	private String useYn;
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
