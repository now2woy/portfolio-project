package kr.co.jineddy.system.repository.cd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.cd.SysCdGroupMst;

/**
 * 
 */
@Repository
public interface SysCdGroupMstRepository extends JpaRepository<SysCdGroupMst, String> {
}
