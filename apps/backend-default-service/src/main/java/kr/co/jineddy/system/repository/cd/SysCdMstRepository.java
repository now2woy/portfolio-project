package kr.co.jineddy.system.repository.cd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.cd.SysCdMst;
import kr.co.jineddy.system.entity.cd.SysCdMstPk;

/**
 * 시스템 코드 Repository
 */
@Repository
public interface SysCdMstRepository extends JpaRepository<SysCdMst, SysCdMstPk>, SysCdMstRepositoryCustom {
	
}