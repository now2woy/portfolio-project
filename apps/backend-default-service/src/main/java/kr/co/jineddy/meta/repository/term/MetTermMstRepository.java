package kr.co.jineddy.meta.repository.term;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.meta.entity.term.MetTermMst;

/**
 * 표준 용어 마스터 Repository
 */
@Repository
public interface MetTermMstRepository extends JpaRepository<MetTermMst, Long> {

}
