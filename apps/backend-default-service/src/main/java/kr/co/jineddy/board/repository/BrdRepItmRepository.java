package kr.co.jineddy.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.board.entity.BrdRepItm;

/**
 * 게시글 댓글 Repository
 */
@Repository
public interface BrdRepItmRepository extends JpaRepository<BrdRepItm, Integer> {

}
