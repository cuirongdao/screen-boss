package cn.com.wilcom.screen.boss.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import cn.com.wilcom.screen.boss.controller.StatisticsController;
import cn.com.wilcom.screen.boss.repository.StatisticsRepository;

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = { StatisticsController.class, StatisticsRepository.class })
public class WebConfig extends WebMvcConfigurerAdapter {
	// @Override
	// public void addResourceHandlers(ResourceHandlerRegistry registry) {
	// registry.addResourceHandler("/js/**").addResourceLocations("/WEB-INF/js/");
	// registry.addResourceHandler("/css/**").addResourceLocations("/WEB-INF/css/");
	// registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/");
	// registry.addResourceHandler("/jsons/**").addResourceLocations("/WEB-INF/jsons/");
	// registry.addResourceHandler("/libs/**").addResourceLocations("/WEB-INF/libs/");
	// registry.addResourceHandler("/views/**").addResourceLocations("/WEB-INF/views/");
	// registry.addResourceHandler("/partials/**").addResourceLocations("/WEB-INF/partials/");
	// }

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Bean
	public ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setPrefix("/WEB-INF/views/");
		viewResolver.setSuffix(".jsp");

		return viewResolver;
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		super.addViewControllers(registry);
		registry.addViewController("login/form").setViewName("login");
		registry.addViewController("welcome").setViewName("welcome");
		registry.addViewController("admin").setViewName("admin");
	}

	@Bean(name = "messageSource")
	public MessageSource configureMessageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:lang/messages");
		messageSource.setCacheSeconds(5);
		messageSource.setDefaultEncoding("UTF-8");

		return messageSource;
	}

}
