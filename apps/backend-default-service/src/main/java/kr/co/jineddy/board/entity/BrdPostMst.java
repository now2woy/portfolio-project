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
 * 게시글 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrdPostMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 8615309164144445360L;
	/**
	 * 게시글 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;
	/**
	 * 게시판 ID
	 */
	private Integer brdId;
	/**
	 * 게시글 제목
	 */
	private String postTtl;
	/**
	 * 게시글 내용
	 */
	private String postCtt;
	/**
	 * 작성자 ID
	 */
	private String writerId;
	/**
	 * 조회 건수
	 */
	private Integer viewCnt;
	/**
	 * 첨부 파일 ID
	 */
	private Integer atchFileId;
	/**
	 * 삭제 여부
	 */
	private String delYn;
	/**
	 * 삭제 일시
	 */
	private LocalDateTime delDt;
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
