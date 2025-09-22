package kr.co.jineddy.meta.repository.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.meta.entity.domain.MetDomainMst;

/**
 * 표준 도메인 마스터 Repository
 */
@Repository
public interface MetDomainMstRepository extends JpaRepository<MetDomainMst, Long> {

}
