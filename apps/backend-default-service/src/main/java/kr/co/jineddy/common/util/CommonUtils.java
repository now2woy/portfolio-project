package kr.co.jineddy.common.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CommonUtils {
	/**
	 * 로그인한 사용자ID 추출
	 * @return
	 */
	public static String getUserId() {
		// SecurityContextHolder에서 Authentication 객체 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// 사용자 ID 추출
		return authentication.getName();
	}
}
