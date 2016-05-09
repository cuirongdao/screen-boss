package cn.com.wilcom.screen.boss.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.com.wilcom.screen.boss.repository.StatisticsRepository;

@RestController
public class StatisticsController {
	@Autowired
	private StatisticsRepository repository;

	@RequestMapping("/inbound")
	public Map<String, Object> queryInboundCallStatistics(int startQueueId, int endQueueId) {
		return repository.queryInboundCallStatistics(startQueueId, endQueueId);
	}

	@RequestMapping("/top_three")
	public List<Map<String, Object>> queryAgentCallStatistics(int startQueueId, int endQueueId) {
		return repository.queryAgentCallStatistics(startQueueId, endQueueId);
	}

	@RequestMapping("/agents_info")
	public List<Map<String, Object>> queryAgentsInfo(int startQueueId, int endQueueId) {
		return repository.queryAgentsInfo(startQueueId, endQueueId);
	}
}
