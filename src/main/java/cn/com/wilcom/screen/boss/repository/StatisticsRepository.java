package cn.com.wilcom.screen.boss.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import cn.com.wilcom.screen.boss.util.SQLUtil;

@Repository
public class StatisticsRepository {
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public Map<String, Object> queryInboundCallStatistics(int startQueueId, int endQueueId) {
		String sql = SQLUtil.getSql("inboundStatistics");
		return jdbcTemplate.queryForObject(sql, new Object[] { startQueueId, endQueueId, startQueueId, endQueueId },
				new RowMapper<Map<String, Object>>() {

					@Override
					public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {

						Map<String, Object> result = new HashMap<String, Object>();
						result.put("answerCallRate", rs.getString("ANS_CALL_RATE"));
						result.put("inboundCalls", rs.getInt("IN_CALLS"));
						result.put("answerCalls", rs.getInt("ANS_CALLS"));
						return result;
					}

				});
	}

	public List<Map<String, Object>> queryAgentCallStatistics(int startQueueId, int endQueueId) {
		String sql = SQLUtil.getSql("topThree");
		return jdbcTemplate.query(sql, new Object[] { startQueueId, endQueueId }, new RowMapper<Map<String, Object>>() {

			@Override
			public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {

				Map<String, Object> result = new HashMap<String, Object>();
				result.put("name", rs.getString("NAME"));
				result.put("agentId", rs.getString("AGENT_NO"));
				result.put("count", rs.getInt("COUNT"));
				return result;
			}

		});
	}

	public List<Map<String, Object>> queryAgentsInfo(int startQueueId, int endQueueId) {
		String sql = SQLUtil.getSql("agentsInfo");
		return jdbcTemplate.query(sql, new Object[] { startQueueId, endQueueId }, new RowMapper<Map<String, Object>>() {

			@Override
			public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {

				Map<String, Object> result = new HashMap<String, Object>();
				result.put("agentId", rs.getString("AGENT_ID"));
				result.put("agentName", rs.getString("AGENT_NAME"));
				result.put("ansTimes", rs.getInt("ANS_TIMES"));
				result.put("totalTalkTime", rs.getInt("TOTAL_TALK_TIME"));
				return result;
			}
		});
	}
}
