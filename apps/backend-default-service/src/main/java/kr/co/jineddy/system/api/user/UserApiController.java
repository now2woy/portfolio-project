package kr.co.jineddy.system.api.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.jineddy.system.api.user.dto.UserResponseDto;
import kr.co.jineddy.system.service.user.UserService;
import lombok.RequiredArgsConstructor;

/**
 * 사용자 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/users")
public class UserApiController {
	/**
	 * 사용자 Service
	 */
	private final UserService userService;
	
	/**
	 * 토큰 발행 건수 목록 (7일간)
	 * @param request
	 * @param response
	 * @return
	 */
	@GetMapping("/token-issued-counts")
	public ResponseEntity<List<UserResponseDto>> tokenIssuedCountList(HttpServletRequest request, HttpServletResponse response) {
		return ResponseEntity.ok(userService.tokenIssuedCountList());
	}
}
