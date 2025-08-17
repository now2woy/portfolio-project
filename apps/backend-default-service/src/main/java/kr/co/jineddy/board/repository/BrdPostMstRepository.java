package kr.co.jineddy.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.board.entity.BrdPostMst;

/**
 * 게시글 Repository
 */
@Repository
public interface BrdPostMstRepository extends JpaRepository<BrdPostMst, Integer> {

}
