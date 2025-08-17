package kr.co.jineddy.system.entity.user;

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
 * 시스템 사용자 토큰 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysUserTkn implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -7379167029704753052L;
	/**
	 * 토큰 ID
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tknId;
	/**
	 * 사용자 ID
	 */
	private String userId;
	/**
	 * 리프레시 토큰
	 */
	private String refreshTkn;
	/**
	 * 만료 일시
	 */
	private LocalDateTime expDt;
	/**
	 * 발행 일시
	 */
	private LocalDateTime issuedDt;
	/**
	 * 발행 IP
	 */
	private String issuedIp;
	/**
	 * 사용자 에이전트
	 */
	private String userAgent;
	/**
	 * 유효 여부
	 */
	private String validYn;
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

