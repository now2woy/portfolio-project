package kr.co.jineddy.system.entity.user;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 사용자 마스터 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysUserMst implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -7002398044610953798L;
	/**
	 * 사용자 ID
	 */
	@Id
	private String userId;
	/**
	 * 사용자 명
	 */
	private String userNm;
	/**
	 * 비밀번호
	 */
	private String pwd;
	/**
	 * 사용자 계정 상태 코드
	 */
	private String userIdStatCd;
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
