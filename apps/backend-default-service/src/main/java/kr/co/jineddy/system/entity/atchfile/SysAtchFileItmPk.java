package kr.co.jineddy.system.entity.atchfile;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 시스템 코드 마스터 Entity Primary Key
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SysAtchFileItmPk implements Serializable {
	/**
	 * 시리얼 버전 ID
	 */
	private static final long serialVersionUID = 5096796491939406317L;
	/**
	 * 첨부 파일 ID
	 */
	private Long atchFileId;
	/**
	 * 첨부 파일 순번
	 */
	private Long atchFileSeq;
}
