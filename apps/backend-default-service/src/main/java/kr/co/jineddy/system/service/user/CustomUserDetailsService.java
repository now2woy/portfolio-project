package kr.co.jineddy.system.service.user;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.jineddy.system.entity.user.SysUserMst;
import kr.co.jineddy.system.repository.user.SysUserMstRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	/**
	 * 시스템 사용자 마스터 Repository
	 */
	private final SysUserMstRepository sysUserMstRepository;
	
	/**
	 * loads user-specific data.
	 */
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return sysUserMstRepository.findById(username)
				.map(this::createUserDetails)
				.orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
	}
	
	/**
	 * DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
	 * @param sysUserMst
	 * @return
	 */
	private UserDetails createUserDetails(SysUserMst sysUserMst) {
		// TODO 권한 관련 부분 확인 필요
		GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
		
		return new User(
				String.valueOf(sysUserMst.getUserId()),
				sysUserMst.getPwd(),
				Collections.singleton(grantedAuthority));
	}
}
