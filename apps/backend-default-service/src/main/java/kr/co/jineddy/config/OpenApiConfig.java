package kr.co.jineddy.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * API 문서화 설정
 */
@Configuration
public class OpenApiConfig {
	/**
	 * 제목 및 인증 정보 파라미터 설정
	 * @return
	 */
	@Bean
	OpenAPI openAPI() {
		String schemeName = "bearerAuth";
		
		return new OpenAPI()
			.info(new Info()
					.title("now2woy's Portfolio API")
					.description("서비스 중인 REST API 문서")
					.version("1.0.0")
			)
			.schemaRequirement(schemeName, new SecurityScheme()
					.name(schemeName)
					.type(SecurityScheme.Type.HTTP)
					.scheme("bearer")
					.bearerFormat("JWT")
			)
			.addSecurityItem(new SecurityRequirement().addList(schemeName));
	}
	
	/**
	 * 시스템 그룹 분할
	 * @return
	 */
	@Bean
	GroupedOpenApi systemsApi() {
		return GroupedOpenApi.builder()
			.group("systems")
			.pathsToMatch("/api/system/**")
			.build();
	}
	
	/**
	 * 게시판 그룹 분할
	 * @return
	 */
	@Bean
	GroupedOpenApi boardsApi() {
		return GroupedOpenApi.builder()
			.group("boards")
			.pathsToMatch("/api/board/**")
			.build();
	}
}
