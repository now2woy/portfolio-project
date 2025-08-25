package kr.co.jineddy.system.service.user;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import kr.co.jineddy.system.api.user.dto.UserResponseDto;
import kr.co.jineddy.system.mapper.user.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 Service
 */
@Slf4j
@Transactional
@Service("userService")
@RequiredArgsConstructor
public class UserService {
	/**
	 * 사용자 Mapper
	 */
	private final UserMapper userMapper;
	
	/**
	 * 토큰 발행 건수 목록 (7일간)
	 * @return
	 */
	public List<UserResponseDto> tokenIssuedCountList() {
		return userMapper.selectTokenIssuedCountList();
	}
}
