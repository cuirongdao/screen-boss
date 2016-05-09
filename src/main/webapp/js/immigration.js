/**
 * 隐藏未登录的坐席
 */
var hideLogoff = true;

/**
 * 分页显示
 */
var paging = true;

/**
 * 每页显示时间
 */
var pageWaitingTime = 15e3;

/**
 * 每页最大数量
 */
var pageMaximum = 10;

/**
 * 开启星期变色
 */
var changWeekColor = false;

/**
 * 连接服务器延迟时间
 */
var delayInitConnection = 2e3;

/**
 * 延迟刷新
 */
var delayRefresh = true;

/**
 * 延迟刷新时间
 */
var delayRefreshTime = 500;

/**
 * Connector IP (10.14.47.176)
 */
var serverIP = "172.16.2.66";

/**
 * Connector端口
 */
var serverPort = "3434";

/**
 * 查询排队数间隔时间
 */
var queryCallsInQueueInterval = 5e3;
/**
 * 查询应答数间隔时间
 */
var queryAnsTimesInterval = 15e3;
/**
 * 检查日期变化间隔时间
 */
var checkDateChangeInterval = 3e5;
/**
 * 分机(5220)
 */
var deviceId = "6832";

/**
 * 组号(7000)
 */
var queue = "32190";
/**
 * 验证登录数
 */
var verifyLlogin = true;
/**
 * 总容错次数
 */
var totalFaultTimes = 10;
/**
 * 初始偏差数
 */
var initialOffset = 0;
/**
 * 最大偏差次数（超过此次数，将设置永久偏差数为当前偏差数）
 */
var maxOffsetTimes = 5;
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

$().ready(function () {
    addEventListeners();
    startClock();
    startScrollQueryAgentsInfo();
    startScrollCountAnsTimes();
    startScrollQueryCallsInQueue();
    startScrollRefresh();
    startScrollPaging();
    $.when(initConnection(), queryAgents()).done(function () {
        monitorAgents();
        queryAgentsState();
        cclaix.SendQueryGroupInfoV2(deviceId, queue);
    }).fail(function () {
        logger.error("连接服务器或查询所有坐席失败");
    });
});

/**
 * 连接服务器
 * @returns
 */
function initConnection() {
    return wait(delayInitConnection).done(function () {
        var dtd = $.Deferred();
        if (cclaix.InitConnection(5001, serverPort, serverIP) === 0) {
            logger.info("连接服务器:" + serverIP + "," + serverPort);
            dtd.resolve();
        } else {
            logger.error("连接服务器出错:" + serverIP + "," + serverPort);
            dtd.reject();
        }
        return dtd.promise();
    });
}

/**
 * 空对象
 */
var suppport = {};

/**
 * 坐席状态常量
 */
var AgentState = {
    UNKNOW: 0,
    LOGGOFF: 5,
    RINGING: 1,
    DINGING: 2,
    ESTABLISHED: 3,
    IDLE: 4
};

/**
 * 忙的原因
 */
var BusyReason = {
    NONE: "",
    ACW: '<span style="font-size:32px;">话后处理</span>',
    LUNCH: "午餐",
    MEETING: "开会"
};

/**
 * 显示坐席状态的HTML
 */
var AgentStateHtml = ['<img alt="未知" src="images/loggoff.png" height="40px" width="40px">', '<img alt="来电" src="images/ringing.png" height="40px" width="40px">', '<img alt="外拨中" src="images/dialing.png" height="40px" width="40px">', '<img alt="通话中" src="images/established.png" height="40px" width="40px">', '<img alt="空闲" src="images/idle.png" height="40px" width="40px">', '<img alt="未登录" src="images/loggoff.png" height="40px" width="40px">'];

/**
 * 坐席对象
 */
var Agent = function () {
    this.agentId = "";
    this.agentState = AgentState.UNKNOW;
    this.deviceId = "";
    this.talkTime = "0:00";
    this.ansTimes = 0;
    this.totalTalkTime = 0;
    this.busyReason = BusyReason.NONE;
    this.talkTimestamp = 0;
};

/**
 * 所有坐席信息
 */
var agents = [];

/**
 * 排队数
 */
var callsInQueue = 0;

/**
 * 循环执行刷新
 */
function startScrollRefresh() {
    setInterval(function () {
        refreshAgentsDisplay();
    }, 1e3);
}

/**
 * 启动时钟
 */
function startClock() {
    var localWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var infoColor = "#31708f";
    var warningColor = "#8a6d3b";
    var dangerColor = "#a94442";

    function setClock() {
        var now = new Date();
        var clockDate, clockTime, clockWeek, colorhead = "",
            colorfoot = "";
        var yy = now.getFullYear();
        var MM = now.getMonth() + 1;
        if (MM < 10) MM = "0" + MM;
        var dd = now.getDate();
        if (dd < 10) dd = "0" + dd;
        var hh = now.getHours();
        if (hh < 10) hh = "0" + hh;
        var mm = now.getMinutes();
        if (mm < 10) mm = "0" + mm;
        var ss = now.getSeconds();
        if (ss < 10) ss = "0" + ss;
        var ww = now.getDay();
        if (changWeekColor) {
            if (ww > 0 && ww < 6) colorhead = '<font color="' + infoColor + '"><strong>';
            if (ww == 6) colorhead = '<font color="' + warningColor + '"><strong>';
            if (ww == 0) colorhead = '<font color="' + dangerColor + '"><strong>';
            colorfoot = "</strong></font>";
        }
        clockWeek = localWeek[ww];
        clockDate = yy + "-" + MM + "-" + dd;
        clockTime = hh + ":" + mm + ":" + ss;
        document.getElementById("clockDate").innerHTML = clockDate;
        document.getElementById("clockTime").innerHTML = clockTime;
        document.getElementById("clockWeek").innerHTML = colorhead + clockWeek + colorfoot;
    }
    setClock();
    window.setInterval(setClock, 1e3);
}

/**
 * 一天查询一次所有，当天的15秒查一次
 */
function startScrollCountAnsTimes() {
    var today = new Date();
    var countAnsTimesOfDayFlag = false;
    var countAnsTimesOfMonthFlag = false;
    var countAnsTimesOfYearFlag = false;
    var ansTimesOfDay = 0;
    var ansTimesOfMonth = 0;
    var ansTimesOfYear = 0;
    var countAnsTimesOfDay = function () {
        if (!countAnsTimesOfDayFlag) {
            logger.log("查询当天应答数...");
            $.post("countAnsTimesOfDay").done(function (pAnsTimes) {
                ansTimesOfDay = pAnsTimes;
                countAnsTimesOfDayFlag = true;
                logger.log("查询当天应答数成功");
                $("#ansTimesOfDay").html(ansTimesOfDay);
            }).fail(function () {
                logger.error("查询当天应答数失败");
            });
        }
    };
    var countAnsTimesOfMonth = function () {
        if (!countAnsTimesOfMonthFlag) {
            logger.log("查询当月应答数...");
            $.post("countAnsTimesOfMonth").done(function (pAnsTimes) {
                ansTimesOfMonth = pAnsTimes;
                countAnsTimesOfMonthFlag = true;
                logger.log("查询当月应答数成功");
                $("#ansTimesOfMonth").html(ansTimesOfMonth + ansTimesOfDay);
            }).fail(function () {
                logger.error("查询当月应答数失败");
            });
        }
    };
    var countAnsTimesOfYear = function () {
        if (!countAnsTimesOfYearFlag) {
            logger.log("查询当年应答数...");
            $.post("countAnsTimesOfYear").done(function (pAnsTimes) {
                ansTimesOfYear = pAnsTimes;
                countAnsTimesOfYearFlag = true;
                logger.log("查询当年应答数成功");
                $("#ansTimesOfYear").html(ansTimesOfYear + ansTimesOfDay);
            }).fail(function () {
                logger.error("查询当年应答数失败");
            });
        }
    };
    // 日期变化查询
    window.setInterval(function () {
        var now = new Date();
        if (today.getDate() != now.getDate()) {
            countAnsTimesOfMonthFlag = false;
            countAnsTimesOfYearFlag = false;
            logger.log("日期变化");
            // 日期变化刷新页面
            window.location.reload(true);
        }
    }, checkDateChangeInterval);
    // 定时查询
    window.setInterval(function () {
        countAnsTimesOfDayFlag = false;
        countAnsTimesOfDay();
        countAnsTimesOfMonth();
        countAnsTimesOfYear();
    }, queryAnsTimesInterval);
    // 首次运行立即查询
    countAnsTimesOfDay();
    countAnsTimesOfMonth();
    countAnsTimesOfYear();
}

/**
 * 查询所有坐席
 * @returns
 */
function queryAgents() {
    logger.log("查询所有坐席...");
    return $.post("queryAgentsInfo").done(function (pAgentsInfo) {
        logger.log("查询所有坐席成功");
        if (!pAgentsInfo) return;
        agents = [];
        for (var i = 0, len = pAgentsInfo.length; i < len; i++) {
            var tmpAgentInfo = pAgentsInfo[i] || suppport;
            var tmpAgent = new Agent();
            if (!tmpAgentInfo.agentId) continue;
            tmpAgent.agentId = tmpAgentInfo.agentId || tmpAgent.agentId;
            tmpAgent.ansTimes = tmpAgentInfo.ansTimes || tmpAgent.ansTimes;
            tmpAgent.totalTalkTime = tmpAgentInfo.totalTalkTime || tmpAgent.totalTalkTime;
            agents.push(tmpAgent);
        }
        refreshAgentsDisplay();
    }).fail(function () {
        logger.error("查询所有坐席失败");
        return window.setTimeout(function () {
            queryAgents();
        }, 6000);
    });
}

/**
 * 监视所有坐席
 */
function monitorAgents() {
    logger.log("monitorAndQueryAgents - 监视所有坐席");
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i];
        if (tmpAgent.agentId) {
            cclaix.SendMonitorDevice(tmpAgent.agentId, 53);
            cclaix.SendQueryAgentStateV2(deviceId, tmpAgent.agentId);
        }
    }
}

/**
 * 查询所有坐席
 */
function queryAgentsState() {
    logger.log("查询所有坐席状态");
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i];
        if (tmpAgent.agentId) {
            cclaix.SendMonitorDevice(tmpAgent.agentId, 53);
            cclaix.SendQueryAgentStateV2(deviceId, tmpAgent.agentId);
        }
    }
}

/**
 * 通过分机号查询坐席状态
 * @param deviceId
 */
function queryAgentStateByDeviceId(deviceId) {
    logger.log("queryAgentStateByDeviceId - 查询坐席状态:" + deviceId);
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i];
        if (deviceId == tmpAgent.deviceId && tmpAgent.agentId) {
            cclaix.SendQueryAgentStateV2("", tmpAgent.agentId);
            return;
        }
    }
}

/**
 * 是否正在缓冲刷新中
 */
var buffer = false;

/**
 * 刷新坐席信息
 */
function refreshAgentsDisplay() {
    // 延迟刷新
    if (delayRefresh) {
        if (buffer) return;
        wait(delayRefreshTime).done(function () {
            doRrefreshAgentsDisplay();
            buffer = false;
        });
        buffer = true;
    } else {
        // 执行刷新
        doRrefreshAgentsDisplay();
    }
}

/**
 * 当前页
 */
var currentPage = 1;

/**
 * 开始循环分页显示
 */
function startScrollPaging() {
    window.setInterval(function () {
        currentPage++;
    }, pageWaitingTime);
}

var tableHead= "<thead>"
			+ "    <tr>"
			+ "        <th>工号</th>"
			+ "        <th>当前坐席状态</th>"
			+ "        <th>分机</th>"
			+ "        <th>当前通话时长</th>"
			+ "        <th>应答次数</th>"
			+ "        <th>服务总时长(s)</th>"
			+ "        <th>置忙原因</th>"
			+ "    </tr>"
			+ "</thead>"
/**
 * 执行刷新
 */
function doRrefreshAgentsDisplay() {
    logger.log('doRrefreshAgentsDisplay');
    var tmpAgents = hideLogoff ? filterLogout() : agents;
    var startNum;
    var endNum;
    if (paging) {
        var totalPages = parseInt(tmpAgents.length / pageMaximum) + 1;
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        startNum = (currentPage - 1) * pageMaximum;
        endNum = currentPage == totalPages ? tmpAgents.length : currentPage * pageMaximum;
    } else {
        startNum = 0;
        endNum = tmpAgents.length;
    }
    var html = "";
    for (var i = startNum, j = 0; i < endNum; i++, j++) {
        var tmpAgent = tmpAgents[i];
        if (!tmpAgent) continue;
        if (tmpAgent.talkTimestamp) {
            var now = new Date().getTime();
            tmpAgent.talkTime = formatTime((now - tmpAgent.talkTimestamp) / 1e3);
        } else {
            tmpAgent.talkTime = "0:00";
        }
        html += '<tr class="' + (j % 2 ? "even-line" : "odd-line") + (AgentState.UNKNOW == tmpAgent.agentState || AgentState.LOGGOFF == tmpAgent.agentState ? " logoff-line" : "") + '">';
        html += "<td>" + tmpAgent.agentId + "</td>";
        html += "<td>" + AgentStateHtml[tmpAgent.agentState] + "</td>";
        html += "<td>" + tmpAgent.deviceId + "</td>";
        html += "<td>" + tmpAgent.talkTime + "</td>";
        html += "<td>" + tmpAgent.ansTimes + "</td>";
        html += "<td>" + tmpAgent.totalTalkTime + "</td>";
        html += "<td>" + tmpAgent.busyReason + "</td>";
        html += "</tr>";
    }
    html ="<table class=\"font-large\">" + tableHead + html + "</table>";
    $('#agentsData').html(html);
}
/**
 * 过滤未登录的
 */
function filterLogout() {
    var tmpAgents = [];
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i];
        if (AgentState.LOGGOFF == tmpAgent.agentState || AgentState.UNKNOW == tmpAgent.agentState) {
            continue;
        }
        tmpAgents.push(tmpAgent);
    }
    return tmpAgents;
}

/**
 * 格数化秒
 * @param second
 * @returns
 */
function formatTime(second) {
    return [parseInt(second / 60 % 60), (parseInt(second % 60) + "").replace(/\b(\d)\b/g, "0$1")].join(":");
}

/**
 * 开始循环查询坐席信息
 */
function startScrollQueryAgentsInfo() {
    var queryAgentsInfo = function () {
        logger.log("查询坐席信息...");
        $.post("queryAgentsInfo").done(function (pAgentsInfo) {
            logger.log("查询坐席信息成功");
            pAgentsInfo = pAgentsInfo || suppport;
            // 更新坐席数据
            for (var i = 0, len = agents.length; i < len; i++) {
                for (var j = 0; j < pAgentsInfo.length; j++) {
                    var tmpAgent = agents[i];
                    var tmpAgentInfo = pAgentsInfo[j] || suppport;
                    if (!tmpAgent.agentId || !tmpAgentInfo.agentId) continue;
                    if (tmpAgent.agentId == tmpAgentInfo.agentId) {
                        tmpAgent.ansTimes = tmpAgentInfo.ansTimes || 0;
                        tmpAgent.totalTalkTime = tmpAgentInfo.totalTalkTime || 0;
                    }
                }
            }
            refreshAgentsDisplay();
        }).fail(function () {
            logger.error("查询坐席信息失败");
        });
    };
    // 定时查询
    window.setInterval(function () {
        queryAgentsInfo();
    }, 15e3);
}

/**
 * 开始循环查询排队数
 */
function startScrollQueryCallsInQueue() {
    setInterval(function () {
        logger.log("查询排队数...");
        cclaix.SendQueryGroupInfoV2(deviceId, queue);
    }, queryCallsInQueueInterval);
}

/**
 * 延迟执行
 * @param waitingTime 等待时间
 * @returns jQuery promise对象
 */
function wait(waitingTime) {
    var dtd = $.Deferred();
    //在函数内部，新建一个Deferred对象
    var tasks = function () {
        dtd.resolve();
    };
    setTimeout(tasks, waitingTime);
    return dtd.promise();
}

/**
 * 监听事件
 */
function addEventListeners() {
    logger.log("addEventListeners - 监听事件");
    // 添加事件
    cclaix.attachEvent("OnOriginatedCallEvt", OnOriginatedCallEvt);
    cclaix.attachEvent("OnSeizedEvt", OnSeizedEvt);
    cclaix.attachEvent("OnIncomingCallEvt", OnIncomingCallEvt);
    cclaix.attachEvent("OnPickupCallEvt", OnPickupCallEvt);
    cclaix.attachEvent("OnConferenceCallEvt", OnConferenceCallEvt);
    cclaix.attachEvent("OnTransferCallEvt", OnTransferCallEvt);
    cclaix.attachEvent("OnRequestFailureRespond", OnRequestFailureRespond);
    cclaix.attachEvent("OnMonitorDeviceRespond", OnMonitorDeviceRespond);
    cclaix.attachEvent("OnAgentStateChangeEvtV2", OnAgentStateChangeEvtV2);
    cclaix.attachEvent("OnCallConnectEvt", OnCallConnectEvt);
    cclaix.attachEvent("OnConnectionDisconnectEvt", OnConnectionDisconnectEvt);
    cclaix.attachEvent("OnCallDisconnectEvt", OnCallDisconnectEvt);
    cclaix.attachEvent("OnQueryAgentStateV2Respond", OnQueryAgentStateV2Respond);
    cclaix.attachEvent("OnQueryGroupInfoV2Respond", OnQueryGroupInfoV2Respond);
    cclaix.attachEvent("OnCCLinkChangeEvt", OnCCLinkChangeEvt);
    cclaix.attachEvent("OnCCLinkUnavailableEvt", OnCCLinkUnavailableEvt);
    cclaix.attachEvent("OnCCLinkSwitchEvt", OnCCLinkSwitchEvt);
}

/**
 * 解析忙的原因
 * @param sReasonCode
 * @returns {String}
 */
function parseBusyReason(sReasonCode) {
    if ("0" === sReasonCode) {
        return BusyReason.ACW;
    } else if ("1" === sReasonCode) {
        return BusyReason.LUNCH;
    } else if ("2" === sReasonCode) {
        return BusyReason.MEETING;
    } else {
        return BusyReason.NONE;
    }
}

/**
 * 解析坐席状态，可能为空
 * @param cAgentState 坐席状态
 * @param agentDeviceState 分机状态
 * @returns {Number} 大屏坐席状态
 */
function parseAgentState(cAgentState, agentDeviceState) {
    if (cAgentState == 49) {
        return AgentState.LOGGOFF;
    } else if (cAgentState == 48) {
        return AgentState.IDLE;
    }
    if (!agentDeviceState) return;
    var tmpAgentState = AgentState.UNKNOW;
    switch (agentDeviceState) {
        // 空闲
    case 48:
        tmpAgentState = AgentState.IDLE;
        break;

        // 摘机
    case 49:
        tmpAgentState = AgentState.DINGING;
        break;

        // 呼入通话，保持
    case 50:
        tmpAgentState = AgentState.ESTABLISHED;
        break;

        // 呼出通话，内线呼叫通话
    case 51:
        tmpAgentState = AgentState.ESTABLISHED;
        break;

        // 振铃状态
    case 52:
        tmpAgentState = AgentState.RINGING;
        break;

        // 外拨拨号
    case 53:
        tmpAgentState = AgentState.DINGING;
        break;

    default:
        break;
    }
    return tmpAgentState;
}

/**
 * 设置坐席状态
 */
function setAgentStateByDeviceId(deviceId, agentState) {
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i] || suppport;
        if (tmpAgent.deviceId == deviceId) {
            if (AgentState.ESTABLISHED == agentState) {
                if (!tmpAgent.talkTimestamp) {
                    tmpAgent.talkTimestamp = new Date().getTime();
                }
            } else {
                tmpAgent.talkTimestamp = 0;
            }
            tmpAgent.agentState = agentState;
            break;
        }
    }
    refreshAgentsDisplay();
}

/**
 * 设置坐席信息
 * @param agentId
 * @param deviceId
 * @param agentState 坐席状态，可能为空
 * @param busyReason
 */
function setAgentInfoByAgentId(agentId, deviceId, agentState, busyReason) {
    for (var i = 0, len = agents.length; i < len; i++) {
        var tmpAgent = agents[i] || suppport;
        if (agentId == tmpAgent.agentId) {
            tmpAgent.deviceId = deviceId || "";
            if (agentState != undefined) {
                if (AgentState.ESTABLISHED == agentState) {
                    if (!tmpAgent.talkTimestamp) {
                        tmpAgent.talkTimestamp = new Date().getTime();
                    }
                } else {
                    agentState.talkTimestamp = 0;
                }
                tmpAgent.agentState = agentState;
            }
            tmpAgent.busyReason = busyReason;
            break;
        }
    }
    refreshAgentsDisplay();
}

/**
 * 请求失败响应
 * @param deviceID
 * @param OpType
 * @param code
 */
function OnRequestFailureRespond(deviceID, OpType, code) {
    switch (code) {
    case 131:
        logger.error("请求失败! 工号：" + deviceID + "，工号错误");
        break;

    case 135:
        logger.error("请求失败! 工号：" + deviceID + "，监控失败");
        break;

    default:
        logger.warn("请求失败! 设备：" + deviceID + "，类型：" + OpType + "，code：" + code);
        break;
    }
}

/**
 * 监控成功响应
 * @param bSuccess
 */
function OnMonitorDeviceRespond(bSuccess) {
    logger.log("监视返回" + bSuccess);
}

/**
 * 坐席状态改变事件
 */
function OnAgentStateChangeEvt(deviceID, agentID, agentMode) {
    logger.log("[事件]坐席状态改变事件" + deviceID + agentID + agentMode);
}

/**
 * 坐席状态改变事件
 */
function OnAgentStateChangeEvtV2(deviceID, agentID, agentMode, reasonCode, reserve1, reserve2, agentName) {
    logger.log("[事件] 坐席状态改变事件V2，分机：" + deviceID + "，坐席：" + agentID + "，状态码：" + agentMode + "，原因码：" + reasonCode);
    // 返回undefined不改变状态
    var agentState = parseAgentState(agentMode, null);
    var busyReason = parseBusyReason(reasonCode);
    if (agentMode == 52) {
        busyReason = BusyReason.ACW;
    }
    setAgentInfoByAgentId(agentID, deviceID, agentState, busyReason);
}

/**
 * 外拨事件
 * @param deviceID
 * @param callID
 * @param DNIS
 */
function OnOriginatedCallEvt(deviceID, callID, DNIS) {
    logger.log("[事件] 外拨事件，分机：" + deviceID + "，CallID：" + callID + "，被叫：" + DNIS);
    setAgentStateByDeviceId(deviceID, AgentState.DINGING);
}

/**
 * 摘机事件
 * @param callID
 * @param deviceID
 */
function OnSeizedEvt(callID, deviceID) {
    logger.log("[事件] 摘机事件，CallID：" + callID + "，分机：" + deviceID);
    setAgentStateByDeviceId(deviceID, AgentState.DINGING);
}

/**
 * 来电事件
 */
function OnIncomingCallEvt(deviceID, callID, DNIS, ANI, callType, UUI) {
    logger.log("[事件] 来电事件，分机：" + deviceID + "，CallID：" + callID + "，被叫：" + DNIS + "，主叫：" + ANI + "，呼叫类型：" + callType + "，UUI：" + UUI);
    setAgentStateByDeviceId(deviceID, AgentState.RINGING);
}

/**
 * 电话转移事件
 */
function OnTransferCallEvt(deviceID, callID, oldPriCallID, oldSecCallID, callingDeviceID, transferingDeviceID, transferedDeviceID) {
    logger.log("[事件] 电话转移，转移方：" + transferingDeviceID);
    queryAgentStateByDeviceId(deviceID);
}

/**
 * 电话代接事件
 * @param deviceID
 * @param callID
 * @param ANI
 * @param DNIS
 */
function OnPickupCallEvt(deviceID, callID, ANI, DNIS) {
    logger.log("[事件] 电话代接事件，分机：" + deviceID + "，CallID：" + callID + "，主叫：" + ANI + "，被叫：" + DNIS);
    queryAgentStateByDeviceId(deviceID);
}

/**
 * 电话会议事件
 */
function OnConferenceCallEvt(deviceID, callID, oldPriCallID, oldSecCallID, deviceList) {
    logger.log("[事件] 电话会议事件，分机：" + deviceID + "，新的呼叫CallID：" + callID + "，原来的第一个CallID：" + oldPriCallID + "，原来的第二个CallID：" + oldSecCallID + "，会议的分机列表：" + deviceList);
    setAgentStateByDeviceId(deviceID, AgentState.ESTABLISHED);
}

/**
 * 开始通话事件
 */
function OnCallConnectEvt(deviceID, callID, ANI, DNIS, trunkGrp, trunkMem) {
    logger.log("[事件] 开始通话deviceID:" + deviceID + " CallID:" + callID + " ANI:" + ANI + " DNIS:" + DNIS + " trunkGrp:" + trunkGrp + " trunkMem:" + trunkMem);
    queryAgentStateByDeviceId(deviceID);
}

/**
 * 挂机事件
 */
function OnCallDisconnectEvt(deviceID, callID, ANI, DNIS) {
    logger.log("[事件] 挂机 deviceID:" + deviceID + " CallID:" + callID + " ANI:" + ANI + " DNIS:" + DNIS);
    setAgentStateByDeviceId(deviceID, AgentState.IDLE);
}

/**
 * 连接断开事件
 */
function OnConnectionDisconnectEvt(deviceID, callID, CalledDeviceID) {
    logger.log("[事件] 连接断开 deviceID:" + deviceID + " CallID:" + callID + " CalledDeviceID:" + CalledDeviceID);
}

/**
 * 剩余容错次数，首次为0，验证通过置0
 */
var remainingTimes = 0;
/**
 * 永久登录数偏差（如果多次查询均有偏差，此值则为偏差值）
 */
var offsetForever = initialOffset;
/**
 * 偏差次数
 */
var offsetTimes = 0;
/**
 * 当前偏差数
 */
var currentOffset = 0;

/**
 * 查询组响应
 */
function OnQueryGroupInfoV2Respond(sGroupID, GroupDec, sAvailableAgents, sCallsInQueue, sAgentsLoggedIn, Reserve1, Reserve2) {
    logger.log("[响应] 组id:" + sGroupID + " 组描述:" + GroupDec + " 组内可用数:" + sAvailableAgents + " 组内排队数:" + sCallsInQueue + " 组内登录数:" + sAgentsLoggedIn);

    $("#callsInQueue").html(sCallsInQueue);
    // 验证登录数
    if (verifyLlogin) {
        // 查询结果与实际不同
        var tmpOffset = Math.abs(sAgentsLoggedIn - filterLogout().length);
        // 如果偏差数不等于上一次的，重置偏差次数
        if (tmpOffset != currentOffset) {
            offsetTimes = 0;
        }
        currentOffset = tmpOffset;
        // 当前偏差数小于或等于永久偏差数
        if (currentOffset <= offsetForever) {
            // 重置剩余次数
            remainingTimes = 0;
            // 重置偏差次数
            offsetTimes = 0;
            // 修正永久偏差数为当前偏差数
            offsetForever = currentOffset;
        } else if (--remainingTimes < 0) {
            queryAgentsState();
            remainingTimes = totalFaultTimes;
            if (++offsetTimes >= maxOffsetTimes) {
                logger.info('存在偏差数，设置永久偏差数:' + offsetForever);
                offsetForever = currentOffset;
            }
        }
    }
}

/**
 * 查询坐席状态响应
 */
function OnQueryAgentStateV2Respond(sDeviceID, sLoginAgentID, sAgentName, sAgentGroupList, OperatorType, cAgentState, sReasonCode, sLoginDeviceID, sIPAddres, sPort, agentDeviceState, Reserve1, Reserve2) {
    logger.log("[响应] 查询坐席状态[坐席id：" + sLoginAgentID + "，坐席状态：" + cAgentState + "，登录分机：" + sLoginDeviceID + ",分机状态：" + agentDeviceState + "]");
    var agentState = parseAgentState(cAgentState, agentDeviceState);
    var busyReason = parseBusyReason(sReasonCode);
    setAgentInfoByAgentId(sLoginAgentID, sLoginDeviceID, agentState, busyReason);
}

/**
 * 初始化注册时返回事件
 * @param Ip
 * @param Port
 * @param isActive
 */
function OnCCLinkChangeEvt(Ip, Port, isActive) {
    if (isActive == 1) {
        logger.info("[事件] 服务器连接成功，IP：" + Ip + "，端口：" + Port);
    } else if (isActive == 0) {
        logger.error("[事件] 服务器不可用，IP：" + Ip + "，端口：" + Port);
        window.location.reload(true);
    }
}

/**
 * 收到该事件表示当前没有可用服务器
 */
function OnCCLinkUnavailableEvt(mainIp, backIp, mainPort, backPort) {
    logger.error("[事件] 没有可用服务器，主服务器：" + mainIp + "，主服务器端口：" + mainPort + "，备服务器：" + backIp + "，备服务器端口：" + backPort);
}

/**
 * 主备切换完成返回事件
 * @param Ip
 * @param Port
 */
function OnCCLinkSwitchEvt(Ip, Port) {
    logger.warn("[事件] 主备服务器切换完成，IP：" + Ip + "端口：" + Port);
}