package kr.co.jineddy.system.entity.cd;

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
public class SysCdMstPk implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2476882997030934328L;
	/**
	 * 코드 그룹 ID
	 */
	private String groupId;
	/**
	 * 코드 ID
	 */
	private String cdId;
}
