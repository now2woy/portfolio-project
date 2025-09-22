package kr.co.jineddy.meta.repository.word;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.meta.entity.word.MetWordSynMap;
import kr.co.jineddy.meta.entity.word.MetWordSynMapPk;

/**
 * 표준 단어 동의어 매핑 Repository
 */
@Repository
public interface MetWordSynMapRepository extends JpaRepository<MetWordSynMap, MetWordSynMapPk> {

}
