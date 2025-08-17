package kr.co.jineddy.system.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.user.SysUserTkn;

import java.time.LocalDateTime;
import java.util.Optional;


/**
 * 시스템 사용자 토큰 Repository
 */
@Repository
public interface SysUserTknRepository extends JpaRepository<SysUserTkn, Integer> {
	/**
	 * 
	 * @param refreshTkn
	 * @param validYn
	 * @param now
	 * @return
	 */
	public Optional<SysUserTkn> findByRefreshTknAndValidYnAndExpDtAfter(@Param("refreshTkn") String refreshTkn, @Param("validYn") String validYn, @Param("expDt") LocalDateTime now);
	
}
