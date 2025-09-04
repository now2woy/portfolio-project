package kr.co.jineddy.system.repository.atchfile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.atchfile.SysAtchFileMst;

/**
 * 시스템 첨부 파일 마스터 Repository
 */
@Repository
public interface SysAtchFileMstRepository extends JpaRepository<SysAtchFileMst, Long> {

}
