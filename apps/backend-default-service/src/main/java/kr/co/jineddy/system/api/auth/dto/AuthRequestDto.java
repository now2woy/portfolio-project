package kr.co.jineddy.system.api.auth.dto;

import java.io.Serializable;

import org.springframework.security.crypto.password.PasswordEncoder;

import kr.co.jineddy.system.entity.user.SysUserMst;
import lombok.Data;

/**
 * 인증 요청 DTO
 */
@Data
public class AuthRequestDto implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = -6098982627310234419L;
	/**
	 * 사용자 ID
	 */
	private String userId;
	/**
	 * 사용자 명
	 */
	private String userNm;
	/**
	 * 비밀번호
	 */
	private String pwd;
}
