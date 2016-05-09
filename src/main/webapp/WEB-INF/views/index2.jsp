<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<base href="<%=basePath%>">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="boss,screen,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="css/app.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="FusionCharts/FusionCharts.js"></script>

<script type="text/javascript" src="echarts/echarts.simple.min.js"></script>

</head>
<body background="backgroud.jpg" onLoad="init()">
	<object classid="clsid:2FA7FC61-8B41-44CF-AAF4-D1F2E7DC2BC4"
		id="cccall" style="LEFT: 0px; TOP: 0px; width: 1px; height: 1px">
	</object>
	<div id="Layer1">
		<div id="chartdiv" align="center"></div>
	</div>
	<div align="center">
		<span class="STYLE1"><strong>老板电器呼叫中心坐席信息 </strong></span>
	</div>
	<div id="Layer3">
		<div id="Layer7">
			<div align="center" class="STYLE2">当日接通率</div>
		</div>
		<div class="STYLE3" id="Layer8">
			<div align="center" class="STYLE4">来电量</div>
		</div>
		<div class="STYLE5" id="Layer9">
			<div align="center">
				<strong>应答量</strong>
			</div>
		</div>
		<div id="Layer22">
			<div align="center" class="STYLE9" id="answerCallRate">--</div>
		</div>
		<div class="STYLE9" id="Layer23">
			<div align="center" id="inboundCalls">--</div>
		</div>
		<div id="Layer24">
			<div align="center" class="STYLE9" id="answerCalls">--</div>
		</div>
		<img src="showdata.jpg" width="265" height="169">
	</div>
	<div id="Layer4">
		<div class="STYLE5" id="Layer10">
			<div align="center">
				<strong>排队总数</strong>
			</div>
		</div>
		<div class="STYLE6" id="Layer11">
			<div align="center" class="STYLE7">呼入总数</div>
		</div>
		<div class="STYLE5" id="Layer12">
			<div align="center">
				<strong>呼出总数</strong>
			</div>
		</div>
		<div class="STYLE2" id="Layer25">
			<div align="center" class="STYLE10" id="waitcalls">--</div>
		</div>
		<div class="STYLE5" id="Layer26">
			<div align="center" class="STYLE10" id="inbound">
				<strong>--</strong>
			</div>
		</div>
		<div class="STYLE5" id="Layer27">
			<div align="center" class="STYLE10" id="outbound">
				<strong>--</strong>
			</div>
		</div>
		<img src="showdata.jpg" width="265" height="169">
	</div>
	<div id="Layer5">
		<div class="STYLE2" id="Layer13">
			<div align="center">就绪人数</div>
		</div>
		<div id="Layer14">
			<div align="center" class="STYLE2">离席人数</div>
		</div>
		<div id="Layer15">
			<div align="center" class="STYLE5">
				<strong>话后处理人数</strong>
			</div>
		</div>
		<div id="Layer28">
			<div align="center" class="STYLE9" id="readys">--</div>
		</div>
		<div id="Layer29">
			<div align="center" class="STYLE9" id="leaves">--</div>
		</div>
		<div id="Layer30">
			<div align="center" class="STYLE9" id="acws">--</div>
		</div>
		<img src="showdata.jpg" width="265" height="169">
	</div>
	<div id="Layer6">
		<div id="Layer16">
			<div align="center" class="STYLE5" id="firstn">
				<strong>--</strong>
			</div>
		</div>
		<div id="Layer17">
			<div align="center" class="STYLE2" id="secondn">--</div>
		</div>
		<div id="Layer18">
			<div align="center" class="STYLE2" id="thirdn">--</div>
		</div>
		<div class="STYLE2" id="Layer31">
			<div align="center" class="STYLE10" id="firstc">---</div>
		</div>
		<div id="Layer32">
			<div align="center" class="STYLE9" id="secondc">---</div>
		</div>
		<div class="STYLE7" id="Layer33">
			<div align="center" class="STYLE9" id="thirdc">---</div>
		</div>
		<img src="showdata.jpg" width="265" height="169">
	</div>
	<div class="STYLE8" id="Layer19">当日话务量前三名</div>
	<div id="Layer20">
		<div align="center" class="STYLE2">姓名</div>
	</div>
	<div class="STYLE2" id="Layer21">
		<div align="center">话务量</div>
	</div>
	<div id="Layer34">
		<div id="chartdiv2" style="background-color:red;height: 300px" align="center"></div>
	</div>
	<script type="text/javascript">
	/**
	 * 日志管理
	 */
	var logger = {
	    log: function (text) {
	        if (typeof console != "undefined") {
	            console.log("[" + new Date().toLocaleTimeString() + "]" + text);
	        }
	    },
	    info: function (text) {
	        if (typeof console != "undefined") {
	            console.info("[" + new Date().toLocaleTimeString() + "]" + text);
	        }
	    },
	    warn: function (text) {
	        if (typeof console != "undefined") {
	            console.warn("[" + new Date().toLocaleTimeString() + "]" + text);
	        }
	    },
	    error: function (text) {
	        if (typeof console != "undefined") {
	            console.error("[" + new Date().toLocaleTimeString() + "]" + text);
	        }
	    }
	};
		var listDevID = ${agents};
		var deviceIds = ${devices};
		var queues = ${queues};
		var title = ${title};
		
		var startQueueId = deviceIds[0], endQueueId = deviceIds[deviceIds.length - 1];
		
		logger.log("agents=" + listDevID);
		logger.log("devices=" + deviceIds);
		logger.log("queues=" + queues);
		logger.log("startQueueId=" + startQueueId);
		logger.log("endQueueId=" + endQueueId);
		
		$.ajaxSetup({
			cache : false
		});
	</script>

	<script type="text/javascript">
		var myReqday;
		var myReqday1;
		var myReqday2;
		var myReqday3;

		function queryInbound() {
			$.ajax({
				method: 'GET',
				url: 'inbound',
				data: {
					startQueueId: startQueueId,
					endQueueId: endQueueId
				}
			}).done(function(data, textStatus, jqXHR) {
				if (data) {
					$('#answerCallRate').html(data.answerCallRate + '%');
					$('#inboundCalls').html(data.inboundCalls);
					$('#answerCalls').html(data.answerCalls);
				}
			});
		}

		function queryTopThree() {
			$.ajax({
				method: 'GET',
				url: 'top_three',
				data: {
					startQueueId: startQueueId,
					endQueueId: endQueueId
				}
			}).done(function(data, textStatus, jqXHR) {

				if (data) {
					if (data[0]) {
						$('#firstn').html(data[0].name);
						$('#firstc').html(data[0].count);
					}
					if (data[1]) {
						$('#secondn').html(data[1].name);
						$('#secondc').html(data[1].count);
					}
					if (data[2]) {
						$('#thirdn').html(data[2].name);
						$('#thirdc').html(data[2].count);
					}
				}
			});

		}

		function displayAengtStatChart(ready, notReady, acw, busy) {


			var myChart = echarts.init(document.getElementById('chartdiv2'));//

			var Xnum = [ "排队", "就绪","离席","接听","小休"];
			var Ynum = [ 10, ready, notReady, busy, acw ];
			
			var option = {
				tooltip : {
					show : true
				},
				legend : {
					data : [ '人数' ]
				},
				xAxis : [ {
					type : 'category',
					data : Xnum
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : [ {
					"name" : "人数",
					"type" : "bar",
					"data" : Ynum
				} ]
			};

			// 为echarts对象加载数据
			myChart.setOption(option);
		}

		function displayQueueChart(queue) {
			var myCharts = new FusionCharts("FusionCharts/StackedColumn3D.swf",
					"myChartId", "300", "320");
			var dataXml = "<graph alternateHGridAlpha='60' alternateHGridColor='f8f8f8' bgAlpha='70' bgColor='#26456c' baseFontColor='#fbfbfd' caption='当前排队数' decimalPrecision='0' divLineAlpha='60' divlinecolor='c5c5c5' numberPrefix='' showAlternateHGridColor='1' showColumnShadow='1' showValues='0' xAxisName='Month' yAxisName='Revenue'><categories><category name='" + title + "'/></categories><dataset color='c4e3f7' seriesName='请求量'><set ides='queue' value='" + queue + "'/></dataset><dataset color='Fad35e' seriesName='阀值'><set ides='queue' value='0'/></dataset><trendlines><line color='91C728'displayValue='Target' showOnTop='1' startValue='26000'/></trendlines></graph>";

			myCharts.setDataXML(dataXml);
			myCharts.render("chartdiv");

		}

		//alert(ListDevice);

		var arrAgent = new Array();
		var acws = 0;//话后处理
		var leaves = 0;//离席
		var readys = 0;//就绪
		var inbound = 0;//呼入数
		var outbound = 0;//呼出数
		var n = 0;
		var incomingNum = 0;
		var i = 0;
		var j = 0;
		var incomState = "in";
		var outboudState = "out";

		function init() {
			//alert("init!!");
			displayQueueChart();
			displayAengtStatChart();
			scroll();
			getNus();
			querygroup();
			scrollQueryInbound();
			scrollQueryTopThree();
			alertXML();
		}
		function scroll() {
			//alert("scroll "+i);
			if (i == 0) {
				i++;
				window.setTimeout("scroll()", 2000);
			} else if (i == 1) {
				i++;
				logger.info('连接服务器...');
				cccall.InitControlServer(3457, 3434, 3434, "172.16.16.104",
						"172.16.16.104");
				// alert("初始化完成！！");
				//cccall.OpenWritePath();
				OnMonitorDevice();
			}
		}

		function scrollQueryInbound() {
			logger.log('查询进线信息...');
			queryInbound();
			window.setTimeout("queryInbound()", 600000);
		}

		function scrollQueryTopThree() {
			logger.log('查询话务量前三名...');
			queryTopThree();
			window.setTimeout("queryTopThree()", 600000);
		}
		var leavechart = 0;
		var readychart = 0;
		var acwchart = 0;
		var tonghuachart = 0;
		function alertXML() {
			displayAengtStatChart(readychart, leavechart, acwchart, tonghuachart);
			window.setTimeout("alertXML()", 20000);
		}

		function OnMonitorDevice() {
			var i = 0, len = listDevID.length, agentID;
			logger.log('查询坐席状态...' + listDevID);
			function queryAgentState() {
				if (i < len) {
					agentID = listDevID[i];
					setTimeout(function() {
						cccall.SendMonitorDevice(agentID, 53);
						cccall.SendQueryAgentStateV2("", agentID);
						queryAgentState();
					}, 10);
				}
				i++;
			}
			queryAgentState();
		}
	</script>

	<script type="text/javascript">
		function querygroup() {
			logger.log('查询技能组排队...' + queues);
			for (var i = 0; i < queues.length; i++) {
				cccall.SendQueryGroupInfoV2(queues[i], queues[i]);
			}
			window.setTimeout(querygroup, 10000);
			//cccall.SendQueryGroupInfoV2("4202","4202");
		}

		function agentstat(_agentNo, _agentStat, _deviceID, _deviceSta) {
			this.agentNo = _agentNo;
			this.agentStat = _agentStat;
			this.deviceSta = _deviceSta;
			this.deviceID = _deviceID;
			this.callIDs = new Array();
		}
	</script>
	<script type="text/javascript" for="cccall" event="OnCCLinkChangeEvt(Ip, Port, isActive)">
	 if (isActive == 1) {
	        logger.info("[事件] 服务器连接成功，IP：" + Ip + "，端口：" + Port);
	    } else if (isActive == 0) {
	        logger.error("[事件] 服务器不可用，IP：" + Ip + "，端口：" + Port);
	        window.location.reload(true);
	    }
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnMonitorDeviceRespond(bSuccess)>
		// alert("监控工号成功");

		// var listDevIDs= ListDevice.split(",");

		//cccall.SendQueryAgentStateV2(listDevIDs[j],listDevIDs[j]);
		//j++;
	</script>
	<script type="text/javascript">
		var waits = {};
	</script>
	<script type="text/javascript" FOR=cccall
		EVENT=OnQueryGroupInfoV2Respond(sGroupID,GroupDev,sAvailableAgents,sCallsInQueue,sAgentsLoggedIn,Reserve1,Reserve2)>
		// alert("查询排队信息");
		//alert("queryQueueinfo"+sGroupID+"--"+GroupDev+"--"+sAvailableAgents+"--"+sCallsInQueue);

		waits[sGroupID] = parseInt(sCallsInQueue);
		var waitcalls = 0;
		for ( var no in waits) {
			waitcalls += waits[no];
		}
		$('#waitcalls').html(waitcalls);
		displayQueueChart(waitcalls);
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnQueryAgentStateV2Respond(sDeviceID,sLoginAgentID,sAgentName,sAgentGroupList,OperatorType,cAgentState,ReasonCode,sLoginDeviceID,sIPAddress,sPort,agentDeviceState,Reservel,Reserve2)>
	<!--
		//alert("OnQueryAgentStateV2Respond"+"deviceID---"+sLoginDeviceID+"--"+"agentID"+sLoginAgentID+"--"+"agentMode"+cAgentState+"agentDeviceState-----"+agentDeviceState);

		var devicestat = "";
		if (agentDeviceState == 50) {
			devicestat = "incoming";
		}
		if (agentDeviceState == 51) {
			devicestat = "outcoming";
		}
		var agt = new agentstat(sLoginAgentID, cAgentState, sLoginDeviceID,
				devicestat);
		arrAgent[n] = agt;
		//  alert("坐席工号=="+arrAgent[n].agentNo);  
		//  alert("坐席分机号码"+arrAgent[n].deviceID); 
		// cccall.SendMonitorDevice(arrAgent[n].deviceID,49);
		n++;
		getNus();
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnRequestFailureRespond(deviceID,type,code)>
		
	</script>
	<script type="text/javascript" FOR=cccall
		EVENT=OnOriginatedCallEvt(deviceID,callID,DNIS)>
		/*	for(var i=0;i<arrAgent.length;i++){
				  if (arrAgent[i].deviceID==deviceID){
					arrAgent[i].callIDs[1]=callID;
					arrAgent[i].deviceSta = "out";
				  }
			  } */
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnSeizedEvt(callID,deviceID)>
		//摘机
		//	alert("OnSeizedEvt"+callID+"--"+deviceID+"--");
		for (var i = 0; i < arrAgent.length; i++) {
			if (arrAgent[i].deviceID == deviceID) {

				if (arrAgent[i].callIDs.length == 0) {

					arrAgent[i].callIDs[0] = callID;
					arrAgent[i].deviceSta = "out";
					//alert("------------------out");
				}

				if (arrAgent[i].callIDs.length == 1) {

					arrAgent[i].callIDs[1] = callID;
				}

				if (arrAgent[i].callIDs.length == 2) {

					arrAgent[i].callIDs[2] = callID;
				}

			}
		}
		//getNus();
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnIncomingCallEvt(deviceID,callID,DNIS,ANI,callType,UUI)>
		// alert("呼入振铃OnIncomingCallEvt"+deviceID+"--"+"---"+callID); 
		for (var i = 0; i < arrAgent.length; i++) {
			if (arrAgent[i].deviceID == deviceID) {
				arrAgent[i].callIDs[0] = callID;
				arrAgent[i].deviceSta = "in";
				//alert("----------------------in");
			}
		}
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnAgentStateChangeEvtV2(deviceID,agentID,agentMode,ReasonCode,Reserve1,Reserve2,AgentName)>
		//alert("坐席状态响应OnAgentStateChangeEvtV2"+"==="+"agentID"+agentID+"---"+"agentMode"+agentMode  +  "-----V2");

		for (var i = 0; i < arrAgent.length; i++) {
			if (arrAgent[i].agentNo == agentID) {
				//  alert("arrAgent[i].agentNo"+"--"+arrAgent[i].agentNo);
				arrAgent[i].agentStat = agentMode;
			}
		}
		getNus();
	</script>
	<script type="text/javascript">
		function getNus() {
			leaves = 0;
			acws = 0;
			readys = 0;
			inbound = 0;
			outbound = 0;

			for (var i = 0; i < arrAgent.length; i++) {

				if (arrAgent[i].agentStat == 50) {

					//alert("leaves====="+leaves);
					if (arrAgent[i].deviceSta == "incoming"
							|| arrAgent[i].deviceSta == "outcoming") {
						tonghuachart++;
					} else {
						leaves++;
						leavechart++;
					}
				}
				if (arrAgent[i].agentStat == 52) {

					//alert("acws====="+acws);
					if (arrAgent[i].deviceSta == "incoming"
							|| arrAgent[i].deviceSta == "outcoming") {
						tonghuachart++;
					} else {
						acws++;
						acwchart++;
					}
				}
				if (arrAgent[i].agentStat == 51) {

					if (arrAgent[i].deviceSta == "incoming"
							|| arrAgent[i].deviceSta == "outcoming") {
						tonghuachart++;
					} else {
						readys++;
						readychart++;
					}
					//alert("readys====="+readys);
				}
				if (arrAgent[i].deviceSta == "incoming") {
					inbound++;
					tonghuachart++;
				}
				if (arrAgent[i].deviceSta == "outcoming") {
					outbound++;
					tonghuachart++;
				}

			}

			//  alert("leaves : " + leaves +"  acws : " + acws +" readys : " + readys +"incoming  ==  " + inbound + "  outcoming == " + outbound);
			document.getElementById("leaves").innerText = leaves;
			document.getElementById("acws").innerText = acws;
			document.getElementById("readys").innerText = readys;
			document.getElementById("inbound").innerText = inbound;
			document.getElementById("outbound").innerText = outbound;

		}
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnCallDisconnectEvt(deviceID,callID,callingDeviceID,calledDeviceID)>
		//挂断
		//alert("挂断 ： "  +"callingDeviceID  "+ callingDeviceID+ "   calledDeviceID   "  +  calledDeviceID +"  callID  "+callID )

		for (var i = 0; i < arrAgent.length; i++) {
			if (arrAgent[i].callIDs[0] == callID) {
				//alert("-=-=-=-=-" + callID);
				arrAgent[i].callIDs = new Array();
				arrAgent[i].deviceSta = "";
			}
			if (arrAgent[i].callIDs[1] == callID) {
				arrAgent[i].callIDs[1] = null;
				//arrAgent[i].deviceSta="";	
			}
			if (arrAgent[i].callIDs[2] == callID) {
				arrAgent[i].callIDs[2] = null;
			}

		}

		getNus();
	</script>

	<script type="text/javascript" FOR=cccall
		EVENT=OnCallConnectEvt(deviceID,callID,callingDeviceID,calledDeviceID,trunkGrp,trunkMem)>
		//alert("电话接通OnCallConnectEvt"  + callingDeviceID + "   " + calledDeviceID + "   "  +callID );
		for (var i = 0; i < arrAgent.length; i++) {

			if (arrAgent[i].deviceID == deviceID
					&& arrAgent[i].deviceSta == "in") {
				arrAgent[i].deviceSta = "incoming";
				//alert("=========incoming===========" + deviceID);
			}
			if (arrAgent[i].deviceID == deviceID
					&& arrAgent[i].deviceSta == "out") {
				arrAgent[i].deviceSta = "outcoming";
				//alert("=========outcoming=========="+ deviceID);
			}
		}
		getNus();
	</script>

	<script type="text/javascript" FOR="cccall"
		EVENT=OnTransferCallEvt(deviceID,callID,oldPriCallID,oldSecCallID,callingDeviceID,transferingDeviceID,transferedDeviceID)>
		/// alert("电话转接  " + " callid  "  +callID );
		for (var i = 0; i < arrAgent.length; i++) {
			if (arrAgent[i].callIDs[0] == callID) {
				arrAgent[i].callIDs = new Array();
				arrAgent[i].deviceSta = "";
			}
			if (arrAgent[i].callIDs[1] == callID) {
				arrAgent[i].callIDs[1] = null;
			}
			if (arrAgent[i].callIDs[2] == callID) {
				arrAgent[i].callIDs[2] = null;
			}
		}
		getNus();
	</script>


</body>
</html>