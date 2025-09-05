package kr.co.jineddy.board.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 게시판 설정 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrdCfgMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -5655032678723285915L;
	/**
	 * 게시판 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int brdId;
	/**
	 * 게시판 명
	 */
	private String brdNm;
	/**
	 * 게시판 유형 코드
	 */
	private String brdTyCd;
	/**
	 * 답글 허용 여부
	 */
	private String allowReplyYn;
	/**
	 * 첨부 파일 여부
	 */
	private String atchFileYn;
	/**
	 * 삭제 여부
	 */
	private String delYn;
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
