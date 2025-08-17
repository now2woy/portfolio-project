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
 * 게시글 댓글 항목 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BrdRepItm implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -3417094772460568924L;
	/**
	 * 댓글 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int repId;
	/**
	 * 게시글 ID
	 */
	private int postId;
	/**
	 * 댓글 내용
	 */
	private String repCtt;
	/**
	 * 작성자 ID
	 */
	private String writerId;
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
