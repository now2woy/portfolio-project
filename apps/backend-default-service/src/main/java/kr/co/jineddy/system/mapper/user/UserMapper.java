package kr.co.jineddy.system.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.jineddy.system.api.user.dto.UserResponseDto;

/**
 * 사용자 Mapper
 */
@Mapper
public interface UserMapper {
	/**
	 * 7일간 토큰 발행 목록 조회
	 * @return
	 */
	List<UserResponseDto> selectTokenIssuedCountList();
}
