package kr.co.jineddy.meta.entity.term;

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
 * 표준 용어 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetTermMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -4757974678299771116L;
	/**
	 * 용어 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long termId;
	/**
	 * 용어 명
	 */
	private String termNm;
	/**
	 * 용어 영문 명
	 */
	private String termEngNm;
	/**
	 * 도메인 ID
	 */
	private Long domainId;
	/**
	 * 설명
	 */
	private String dc;
	/**
	 * 사용 여부
	 */
	@Column(length = 1, nullable = false)
	private String useYn;
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
