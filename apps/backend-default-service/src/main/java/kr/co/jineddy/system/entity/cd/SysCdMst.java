package kr.co.jineddy.system.entity.cd;

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
 * 시스템 코드 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SysCdMstPk.class)
public class SysCdMst implements Serializable {
	/**
	 *  
	 */
	private static final long serialVersionUID = 8527168388333646112L;
	/**
	 * 코드 그룹 ID
	 */
	@Id
	private String groupId;
	/**
	 * 코드 ID
	 */
	@Id
	private String cdId;
	/**
	 * 코드 명
	 */
	private String cdNm;
	/**
	 * 정렬 순서
	 */
	private int sortOrdr;
	/**
	 * 사용여부
	 */
	private String useYn;
	/**
	 * 비고
	 */
	private String rm;
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
