package kr.co.jineddy.system.api.cd.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 코드 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CdResponseDto implements Serializable {
	private static final long serialVersionUID = 8223452399176382554L;
	/**
	 * 코드 그룹 ID
	 */
	private String groupId;
	/**
	 * 코드 그룹 명
	 */
	private String groupNm;
	/**
	 * 코드 ID
	 */
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
