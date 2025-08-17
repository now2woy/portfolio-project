package kr.co.jineddy.system.repository.cd;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.google.common.base.CaseFormat;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.co.jineddy.system.api.cd.dto.CdRequestDto;
import kr.co.jineddy.system.api.cd.dto.CdResponseDto;
import kr.co.jineddy.system.entity.cd.QSysCdGroupMst;
import kr.co.jineddy.system.entity.cd.QSysCdMst;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 코드 Repository 구현체
 */
@RequiredArgsConstructor
public class SysCdMstRepositoryImpl implements SysCdMstRepositoryCustom {
	/**
	 * DML 생성을위한 Querydsl 팩토리 클래스
	 */
	private final JPAQueryFactory jpaQueryFactory;
	/**
	 * 시스템 코드 페이징 조회
	 * @param requestDto
	 * @param pageable
	 * @return
	 */
	public Page<CdResponseDto> findPage(CdRequestDto requestDto, Pageable pageable) {
		JPQLQuery<CdResponseDto> query = jpaQueryFactory
				.select(Projections.bean(CdResponseDto.class
						, QSysCdMst.sysCdMst.groupId
						, Expressions.as(QSysCdGroupMst.sysCdGroupMst.groupNm, "groupNm")
						, QSysCdMst.sysCdMst.cdId
						, QSysCdMst.sysCdMst.cdNm
						, QSysCdMst.sysCdMst.sortOrdr
						, QSysCdMst.sysCdMst.useYn
						, QSysCdMst.sysCdMst.rm
						, QSysCdMst.sysCdMst.insId
						, QSysCdMst.sysCdMst.updDt
						))
				.from(QSysCdMst.sysCdMst)
				.leftJoin(QSysCdGroupMst.sysCdGroupMst).on(QSysCdMst.sysCdMst.groupId.eq(QSysCdGroupMst.sysCdGroupMst.groupId))
				.fetchJoin();
		
		// 정렬
		pageable.getSort().stream().forEach(sort -> {
			Order order = sort.isAscending() ? Order.ASC : Order.DESC;
			String property = sort.getProperty();

			Path<Object> target = Expressions.path(Object.class, QSysCdMst.sysCdMst, CaseFormat.LOWER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, property));
			@SuppressWarnings({ "rawtypes", "unchecked" })
			OrderSpecifier<?> orderSpecifier = new OrderSpecifier(order, target);
			query.orderBy(orderSpecifier);
		});
		
		// 페이징
		QueryResults<CdResponseDto> result = query
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetchResults();
		
		return new PageImpl<>(result.getResults(), pageable, result.getTotal());
	}
}