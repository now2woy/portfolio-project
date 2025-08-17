package kr.co.jineddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.data.repository.query.QueryLookupStrategy;

@EnableJpaRepositories(basePackages = "kr.co.jineddy", queryLookupStrategy = QueryLookupStrategy.Key.CREATE_IF_NOT_FOUND)
@SpringBootApplication
@EnableTransactionManagement
public class PortfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
	}
}