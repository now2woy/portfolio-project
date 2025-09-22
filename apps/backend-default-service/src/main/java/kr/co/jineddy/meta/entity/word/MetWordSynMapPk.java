package kr.co.jineddy.meta.entity.word;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 표준 단어 동의어 매핑 Entity Primary Key
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetWordSynMapPk implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -2595083822081305292L;
	/**
	 * 단어 ID
	 */
	private Long wordId;
	/**
	 * 동의어 명
	 */
	private String synNm;
}
