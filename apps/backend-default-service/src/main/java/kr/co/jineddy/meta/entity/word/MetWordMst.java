package kr.co.jineddy.meta.entity.word;

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
 * 표준 단어 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetWordMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 1678432604873929673L;
	/**
	 * 단어 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wordId;
	/**
	 * 단어 명
	 */
	private String wordNm;
	/**
	 * 단어 영어 명
	 */
	private String wordEngNm;
	/**
	 * 단어 타입 코드
	 */
	private String wordTyCd;
	/**
	 * 비고
	 */
	private String rm;
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
