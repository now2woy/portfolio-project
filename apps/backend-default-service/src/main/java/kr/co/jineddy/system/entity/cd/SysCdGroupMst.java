package kr.co.jineddy.system.entity.cd;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 코드 그룹 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysCdGroupMst implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3338657299151818735L;
	/**
	 * 코드 그룹 ID
	 */
	@Id
	private String groupId;
	/**
	 * 코드 그룹 명
	 */
	private String groupNm;
	/**
	 * 설명
	 */
	private String dc;
	/**
	 * 데이터 타입 코드
	 */
	private String dataTyCd;
	/**
	 * 길이
	 */
	private int lt;
	/**
	 * 포멧
	 */
	private String format;
	/**
	 * 단위 코드
	 */
	private String unitCd;
	/**
	 * 고정 길이 여부
	 */
	private String fixedLtYn;
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
