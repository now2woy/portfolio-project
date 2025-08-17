package kr.co.jineddy.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.board.entity.BrdCfgMst;

/**
 * 게시판 설정 Repository
 */
@Repository
public interface BrdCfgMstRepository extends JpaRepository<BrdCfgMst, Integer> {

}
