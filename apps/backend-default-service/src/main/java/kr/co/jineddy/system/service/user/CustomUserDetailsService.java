package kr.co.jineddy.system.service.user;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.jineddy.system.entity.user.SysUserMst;
import kr.co.jineddy.system.entity.user.SysUserRoleItm;
import kr.co.jineddy.system.repository.user.SysUserMstRepository;
import kr.co.jineddy.system.repository.user.SysUserRoleItmRepository;
import lombok.RequiredArgsConstructor;

/**
 * 사용자 로그인 처리 Service
 */
@RequiredArgsConstructor
@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	/**
	 * 시스템 사용자 마스터 Repository
	 */
	private final SysUserMstRepository sysUserMstRepository;
	/**
	 * 시스템 사용자 권한 항목 Repository
	 */
	private final SysUserRoleItmRepository sysUserRoleItmRepository;
	
	/**
	 * 사용자 정보 불러오기
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
		// 사용자의 권한 조회
		List<SysUserRoleItm> roleList = sysUserRoleItmRepository.findByUserId(sysUserMst.getUserId());
		
		List<GrantedAuthority> authorities = null;
		
		// 조회된 권한이 없을 경우 기본 권한 부여
		if(roleList.isEmpty()) {
			authorities = new ArrayList<>();
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
			
		// 조회된 권한이 있을 경우 모두 담는다.
		} else {
			authorities = roleList.stream()
					.map(role -> new SimpleGrantedAuthority(role.getUserRoleCd()))
					.collect(Collectors.toList());
		}
		
		// 사용자 정보 생성
		return new User(sysUserMst.getUserId(), sysUserMst.getPwd(), authorities);
	}
}
