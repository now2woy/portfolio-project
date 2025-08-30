package kr.co.jineddy.system.api.menu;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.jineddy.system.api.menu.dto.MenuResponseDto;
import kr.co.jineddy.system.service.menu.MenuService;
import lombok.RequiredArgsConstructor;

/**
 * 메뉴 Controller
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/system/v1/menus")
public class MenuApiController {
	/**
	 * 메뉴 Service
	 */
	private final MenuService menuService;
	
	/**
	 * 모든 메뉴 목록
	 * @param request
	 * @param response
	 * @return
	 */
	@GetMapping("/all-menus")
	public ResponseEntity<List<MenuResponseDto>> allMenus(HttpServletRequest request, HttpServletResponse response) {
		return ResponseEntity.ok(menuService.allMenus());
	}
	
	/**
	 * 사용자가 가지고 있는 메뉴 목록
	 * @param request
	 * @param response
	 * @return
	 */
	@GetMapping("/user-menus")
	public ResponseEntity<List<MenuResponseDto>> userMenus(HttpServletRequest request, HttpServletResponse response) {
		return ResponseEntity.ok(menuService.userMenus());
	}
}
