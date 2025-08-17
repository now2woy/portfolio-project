package kr.co.jineddy.system.api.auth.dto;

import java.io.Serializable;

import kr.co.jineddy.system.entity.user.SysUserMst;
import lombok.Builder;
import lombok.Data;

/**
 * 인증 응답 DTO
 */
@Data
@Builder
public class AuthResponseDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -766935377587312985L;
	/**
	 * 사용자 ID
	 */
	private String userId;
	/**
	 * 사용자 명
	 */
	private String useNm;
}
