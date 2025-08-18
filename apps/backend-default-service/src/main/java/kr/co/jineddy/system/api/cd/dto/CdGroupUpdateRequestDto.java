package kr.co.jineddy.system.api.cd.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

/**
 * 코드그룹과 코드 요청 DTO
 */
@Data
public class CdGroupUpdateRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 7506143504155413558L;
	/**
	 * 코드 그룹 ID
	 */
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
	/**
	 * 코드 목록
	 */
	private List<CdRequestDto> cds;
}
