package kr.co.jineddy.system.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.user.SysUserMst;

/**
 * 시스템 사용자 마스터 Repository
 */
@Repository
public interface SysUserMstRepository extends JpaRepository<SysUserMst, String> {

}
