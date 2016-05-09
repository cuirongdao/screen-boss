package cn.com.wilcom.screen.boss.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@PropertySource({ "classpath:db.properties" })
public class DbConfig {
	public static final String DRIVER_CLASS_NAME = "jdbc.driver_class_name";
	public static final String URL = "jdbc.url";
	public static final String USER_NAME = "jdbc.username";
	public static final String PASSWORD = "jdbc.password";
	public static final String DIALECT = "jdbc.hibernate.dialect";
	public static final String SHOW_SQL = "jdbc.hibernate.show_sql";

	@Autowired
	private Environment env;

	@Bean
	public DataSource dataSource() {

		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(env.getRequiredProperty(DRIVER_CLASS_NAME));
		dataSource.setUrl(env.getRequiredProperty(URL));
		dataSource.setUsername(env.getRequiredProperty(USER_NAME));
		dataSource.setPassword(env.getRequiredProperty(PASSWORD));

		return dataSource;
	}

	// @Bean
	// public PlatformTransactionManager transactionManager() {
	//
	// DataSourceTransactionManager txManager = new
	// DataSourceTransactionManager();
	// txManager.setDataSource(dataSource());
	// return txManager;
	// }
}
