package kr.co.jineddy.system.repository.cd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.cd.SysCdGroupMst;

/**
 * 시스템 코드 그룹 Repository
 */
@Repository
public interface SysCdGroupMstRepository extends JpaRepository<SysCdGroupMst, String> {
}
