package kr.co.jineddy.system.entity.user;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 사용자 권한 항목 Entity Primary Key
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysUserRoleItmPk implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 7186240558317252099L;
	/**
	 * 사용자 ID
	 */
	private String userId;
	/**
	 * 사용자 권한 코드
	 */
	private String userRoleCd;
}
