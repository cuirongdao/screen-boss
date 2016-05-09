package cn.com.wilcom.screen.boss.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cn.com.wilcom.screen.boss.util.ArrayUtil;
import cn.com.wilcom.screen.boss.util.JacksonMapper;

@Controller
@PropertySource({ "classpath:resource.properties" })
public class IndexController {
	@Autowired
	private Environment env;
	private static ObjectMapper mapper = JacksonMapper.getInstance();
	private static final Logger logger = LogManager.getLogger(IndexController.class);

	public Object[] getArrayProperty(String name) {
		return ArrayUtil.convertStringToArray(env.getProperty(name));
	}

	public String toJson(Object object) {
		String jsonArr = "";
		try {
			jsonArr = mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			logger.error("转换Json失败", e);
		}
		return jsonArr;
	}

	public String getArrayPropertyAsString(String name) {
		return toJson(getArrayProperty(name));
	}

	public String getPropertyAsString(String name) {
		return toJson(env.getProperty(name));
	}

	@RequestMapping({ "/", "/index" })
	public ModelAndView index(String suffix) {
		if (suffix == null) {
			suffix = "hz";
		}
		ModelAndView model = new ModelAndView();

		model.setViewName("index");

		String devices = getArrayPropertyAsString("resource.devices_" + suffix);
		String agents = getArrayPropertyAsString("resource.agents_" + suffix);
		String queues = getArrayPropertyAsString("resource.queues_" + suffix);
		String title = getPropertyAsString("resource.title_" + suffix);

		model.addObject("devices", devices);
		model.addObject("agents", agents);
		model.addObject("queues", queues);
		model.addObject("title", title);

		return model;
	}
	
	@RequestMapping({"/index2" })
	public ModelAndView index2(String suffix) {
		if (suffix == null) {
			suffix = "hz";
		}
		ModelAndView model = new ModelAndView();

		model.setViewName("index2");

		String devices = getArrayPropertyAsString("resource.devices_" + suffix);
		String agents = getArrayPropertyAsString("resource.agents_" + suffix);
		String queues = getArrayPropertyAsString("resource.queues_" + suffix);
		String title = getPropertyAsString("resource.title_" + suffix);

		model.addObject("devices", devices);
		model.addObject("agents", agents);
		model.addObject("queues", queues);
		model.addObject("title", title);

		return model;
	}

	@RequestMapping("/agents")
	public ModelAndView agents(String suffix) {
		if (suffix == null) {
			suffix = "hz";
		}
		ModelAndView model = new ModelAndView();

		model.setViewName("agents");

		String devices = getArrayPropertyAsString("resource.devices_" + suffix);
		String agents = getArrayPropertyAsString("resource.agents_" + suffix);
		String queues = getArrayPropertyAsString("resource.queues_" + suffix);
		String title = getPropertyAsString("resource.title_" + suffix);

		model.addObject("devices", devices);
		model.addObject("agents", agents);
		model.addObject("queues", queues);
		model.addObject("title", title);

		return model;
	}

	@RequestMapping("/resource/{type}")
	@ResponseBody
	public Object[] resource(@PathVariable String type, String suffix) {
		return getArrayProperty("resource." + type + "_" + suffix);
	}
}
