package kr.co.jineddy.meta.repository.word;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.meta.entity.word.MetWordMst;

/**
 * 표준 단어 마스터 Repository
 */
@Repository
public interface MetWordMstRepository extends JpaRepository<MetWordMst, Long> {

}
