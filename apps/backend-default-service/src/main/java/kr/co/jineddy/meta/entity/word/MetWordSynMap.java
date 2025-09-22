package kr.co.jineddy.meta.entity.word;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 표준 단어 동의어 매핑 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(MetWordSynMapPk.class)
public class MetWordSynMap implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 4511740483194395538L;
	/**
	 * 단어 ID
	 */
	@Id
	private Long wordId;
	/**
	 * 동의어 명
	 */
	@Id
	private String synNm;
	/**
	 * 동의어 영문 명
	 */
	private String synEngNm;
	/**
	 * 대표 여부
	 */
	@Column(length = 1, nullable = false)
	private String reprsntYn;
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
