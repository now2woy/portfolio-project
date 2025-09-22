package kr.co.jineddy.meta.entity.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 표준 도메인 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetDomainMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -7946808637322044725L;
	/**
	 * 도메인 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long domainId;
	/**
	 * 도메인 명
	 */
	private String domainNm;
	/**
	 * 데이터 타입 코드
	 */
	private String dataTyCd;
	/**
	 * 길이
	 */
	private Integer lt;
	/**
	 * 포멧
	 */
	private String format;
	/**
	 * 단위 코드
	 */
	private String unitCd;
	/**
	 * 코드 기반 여부
	 */
	@Column(length = 1, nullable = false)
	private String cdBasedYn;
	/**
	 * 그룹 ID
	 */
	@Column(length = 50)
	private String groupId;
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
	@Column(length = 50)
	private String insId;
	/**
	 * 수정 일시
	 */
	private LocalDateTime updDt;
	/**
	 * 수정 ID
	 */
	@Column(length = 50)
	private String updId;
}
