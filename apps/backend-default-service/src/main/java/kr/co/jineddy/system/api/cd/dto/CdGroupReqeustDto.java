package kr.co.jineddy.system.api.cd.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 코드 그룹 요청 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CdGroupReqeustDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 8803141753575801990L;
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
	 * 현재 페이지
	 */
	private long offset;
	/**
	 * 페이지 크기
	 */
	private int pageSize;
}
