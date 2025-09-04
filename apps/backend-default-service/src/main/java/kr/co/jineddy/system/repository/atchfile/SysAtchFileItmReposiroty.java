package kr.co.jineddy.system.repository.atchfile;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kr.co.jineddy.system.entity.atchfile.SysAtchFileItm;
import kr.co.jineddy.system.entity.atchfile.SysAtchFileItmPk;

/**
 * 시스템 첨부 파일 항목 Repository
 */
@Repository
public interface SysAtchFileItmReposiroty extends JpaRepository<SysAtchFileItm, SysAtchFileItmPk> {
	/**
	 * atchFileId과 일치하고 atchFileSeqs 값을 in 으로 포함된 경우 조회
	 * @param atchFileId
	 * @param atchFileSeqs
	 * @return
	 */
	List<SysAtchFileItm> findByAtchFileIdAndAtchFileSeqIn(Long atchFileId, List<Long> atchFileSeqs);
	/**
	 * atchFileId과 일치하고 delYn과 일치하는 목록 조회
	 * @param atchFileId
	 * @param delYn
	 * @return
	 */
	List<SysAtchFileItm> findByAtchFileIdAndDelYn(Long atchFileId, String delYn);
	
	/**
	 * atchFileId의 AtchFileSeq 기준 최대값 조회
	 * @param atchFileId
	 * @return
	 */
	Optional<SysAtchFileItm> findTopByAtchFileIdOrderByAtchFileSeqDesc(Long atchFileId);
}
