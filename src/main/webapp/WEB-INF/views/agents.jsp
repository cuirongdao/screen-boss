<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<title>老板电器大屏监控</title>
<link rel="stylesheet" type="text/css" href="css/agents.css">
<script type="text/javascript" src="js/promise.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/agents.js"></script>
<script type="text/javascript">
	var agentIds = ${agents};
	var queuesIds = ${queues};
	
	var startAgentId = agentIds[0], endAgentId = agentIds[agentIds.length - 1];
	
	$.ajaxSetup({
		cache : false
	});
</script>
</head>
<body>
    <object classid="clsid:2FA7FC61-8B41-44CF-AAF4-D1F2E7DC2BC4" id="cclaix"
    style="LEFT:0px;TOP:0px;width:0px;height:1px" visible="true"></object>
    <div class="container">
        <div class="header">
             <h1 class="font-large distance-long">老板电器电话咨询坐席信息</h1> 
        </div>
        <div class="side-left">
            <div class="clock">
                <p class="font-large distance-long clock-text" id="clockDate">2015-08-31</p>
                <p class="font-medium distance-medium clock-text" id="clockTime">16:34:24</p>
                <p class="font-medium distance-medium clock-text" id="clockWeek">星期一</p>
            </div>
            <!-- 
            <div class="call-statistic">
                 <h2 class="font-medium call-statistic-title" style="color:#ff0000;">当前排队数：</h2> 
                <p class="font-large call-statistic-value" id="callsInQueue" style="color:#ff0000;">14</p>
                 <h2 class="font-medium call-statistic-title" style="color:#CC99FF;">当天应答数：</h2> 
                <p class="font-large call-statistic-value" id="ansTimesOfDay" style="color:#CC99FF;">1274</p>
                 <h2 class="font-medium call-statistic-title" style="color:#FFFF99;">当月应答数：</h2> 
                <p class="font-large call-statistic-value" id="ansTimesOfMonth" style="color:#FFFF99;">26161</p>
                 <h2 class="font-medium call-statistic-title" style="color:#00ff00;">当年应答数：</h2> 
                <p class="font-large call-statistic-value" id="ansTimesOfYear" style="color:#00ff00;">245251</p>
            </div>
             -->
        </div>
        <div class="side-right"  id="agentsData">
            <table class="font-large">
                <thead>
                    <tr>
                        <th>工号</th>
                        <th>当前坐席状态</th>
                        <th>分机</th>
                        <th>当前通话时长</th>
                        <th>应答次数</th>
                        <th>服务总时长(s)</th>
                        <th>置忙原因</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd-line">
                        <td>4002</td>
                        <td>
                            <img alt="外拨中" src="images/dialing.png" height="48px" width="48px">
                        </td>
                        <td>5205</td>
                        <td>1:07</td>
                        <td>88</td>
                        <td>7489</td>
                        <td></td>
                    </tr>
                    <tr class="even-line">
                        <td>4007</td>
                        <td>
                            <img alt="外拨中" src="images/dialing.png" height="48px" width="48px">
                        </td>
                        <td>5210</td>
                        <td>1:05</td>
                        <td>120</td>
                        <td>9372</td>
                        <td></td>
                    </tr>
                    <tr class="odd-line">
                        <td>4010</td>
                        <td>
                            <img alt="空闲" src="images/idle.png" height="48px" width="48px">
                        </td>
                        <td>5204</td>
                        <td>0:48</td>
                        <td>132</td>
                        <td>15030</td>
                        <td></td>
                    </tr>
                    <tr class="even-line">
                        <td>4016</td>
                        <td>
                            <img alt="通话中" src="images/established.png" height="48px" width="48px">
                        </td>
                        <td>5218</td>
                        <td>0:00</td>
                        <td>145</td>
                        <td>9611</td>
                        <td></td>
                    </tr>
                    <tr class="odd-line">
                        <td>4019</td>
                        <td>
                            <img alt="外拨中" src="images/dialing.png" height="48px" width="48px">
                        </td>
                        <td>5212</td>
                        <td>0:11</td>
                        <td>132</td>
                        <td>9630</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>