package kr.co.jineddy.system.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.user.SysUserRoleItm;
import kr.co.jineddy.system.entity.user.SysUserRoleItmPk;

/**
 * 시스템 사용자 권한 항목 Repository
 */
@Repository
public interface SysUserRoleItmRepository extends JpaRepository<SysUserRoleItm, SysUserRoleItmPk> {
	/**
	 * 사용자 ID로 사용자 권한 코드 목록 조회
	 * @param userId
	 * @return
	 */
	List<SysUserRoleItm> findByUserId(String userId);
}
