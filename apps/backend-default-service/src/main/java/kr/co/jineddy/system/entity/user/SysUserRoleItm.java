package kr.co.jineddy.system.entity.user;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 사용자 권한 항목 Entity
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SysUserRoleItmPk.class)
public class SysUserRoleItm implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -6495694078802664355L;
	/**
	 * 사용자 ID
	 */
	@Id
	private String userId;
	/**
	 * 사용자 권한 코드
	 */
	@Id
	private String userRoleCd;
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
