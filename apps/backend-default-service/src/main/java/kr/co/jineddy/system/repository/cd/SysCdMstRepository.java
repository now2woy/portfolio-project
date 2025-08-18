package kr.co.jineddy.system.repository.cd;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.cd.SysCdMst;
import kr.co.jineddy.system.entity.cd.SysCdMstPk;

/**
 * 시스템 코드 Repository
 */
@Repository
public interface SysCdMstRepository extends JpaRepository<SysCdMst, SysCdMstPk>, SysCdMstRepositoryCustom {
	/**
	 * 그룹ID에 해당하는 모든 코드를 조회한다.
	 * @param groupId
	 * @return
	 */
	List<SysCdMst> findByGroupId( String groupId );
}