SELECT T.NAME AS AGENT_NAME, T.NO AS AGENT_ID, SUM(T.callnumber) AS ANS_TIMES, SUM(T.talktime) AS TOTAL_TALK_TIME
FROM (
	SELECT *
	FROM (
		SELECT NAME, NO
		FROM T_Agent
	) A
		RIGHT JOIN (
			SELECT AgentNo, CASE WHEN COUNT(answertime) >= 1 THEN 1 ELSE 0 END AS callnumber, SUM(CEIL((TO_DATE(TO_CHAR(ENDTIME, 'yyyy-mm-dd hh24:mi:ss'), 'yyyy-mm-dd hh24:mi:ss') - TO_DATE(TO_CHAR(ANSWERTIME, 'yyyy-mm-dd hh24:mi:ss'), 'yyyy-mm-dd hh24:mi:ss')) * 24 * 60 * 60)) AS talktime
			FROM WGS_ExtensionPhase
			WHERE AnswerTime > TRUNC(SYSDATE)
			GROUP BY AgentNo, UCID
		) E ON A.NO = E.AgentNo 
	WHERE E.ExtensionNo >= ?
		AND E.ExtensionNo <= ?
) T
GROUP BY T.NO, T.NAME