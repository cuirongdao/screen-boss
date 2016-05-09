var arrAgent= new Array();
var outboundNum=0;
var acws=0;//话后处理
var leaves=0;//离席
var readys=0;//就绪
var n = 0;
var incomingNum=0;
var i = 0;
function scroll() {	
	alert("scroll "+i);
            if(i==0) {
                 i++;
                 window.setTimeout("scroll()",2000); 
            } 
            else if(i==1){
	               i++;
	          //cccall.InitConnection(5001,3434,"172.16.1.231");
	               alert("cccall+++++");
	              alert( cccall);
	              alert(document.getElementById("cccall"));
	               document.getElementById("cccall").InitControlServer(3457,3434,3334,"172.16.2.229","172.16.2.229");
	  		  //  alert("初始化完成！！");
	          OnMonitorDevice();
          }
       }
function OnMonitorDevice(){

  var listDevID= ListDevice.split(",");
	for (var i=0;i<listDevID.length;i++){
				//alert(listDevID[i]);	
		cccall.SendMonitorDevice(listDevID[i],"49");
		//alert("succeess OnMonitorDevice!!");
	}	
}