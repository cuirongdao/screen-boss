function drawHistogram(data_Array,data2_Array,data3_Array, table_left, table_top, all_width, all_height, table_title, x_unit, y_unit, uniqueId)
{
    //颜色列表：预设10个。
    var colors = ["#F08080","#F0FFF0","#F0FFF0","#CDAD00","#fc0","#3cc","#ff19ff","#993300","#f60","#f60"];

    //数据个数
    var num = data_Array.length;
    var numa = data2_Array.length;
    
    var num1 = data3_Array.length;           //项目个数
    var num2 = data3_Array[0].length;
    //图形宽度
    var item_width = parseInt(20000/num + 0.5);
    var item_width2 = item_width;
    //起始坐标
    var begin_x = parseInt(((item_width-1200)/2)+2200);
    var begin_x2 = parseInt(((item_width-1200)/2)+1000);
    
    //算比例高度
    //取所有值的最大值
    var value_max = 0;
    for(i=0; i<num; i++)
    {
        if(value_max<data_Array[i][0])
        {
            value_max = data_Array[i][0]
        }
    }
    
    for(i=0; i<numa; i++){
    	if(value_max<data2_Array[i][0])
        {
            value_max = data2_Array[i][0]
        }
    }

    value_max = parseInt(value_max);
    value_max_str = value_max + "";

    if(value_max > 9)
    {
        temp = value_max_str.substring(2,1);
        if(temp > 4)
        {
         temp2 = (parseInt(value_max/Math.pow(10,value_max_str.length-1))+1) * Math.pow(10,value_max_str.length-1)
        }
        else
        {
           temp2 = (parseInt(value_max/Math.pow(10,value_max_str.length-1))+0.5) * Math.pow(10,value_max_str.length-1)
        }
    }
    else if(value_max > 4)
    {
        temp2 = 10;
    }
    else
    {
        temp2 = 5;
    }
    //横坐标有五条线，折算成每条线的高度。
    item_height = temp2/5;
    item_Width = 20000/(num2-2) 
    
    //开始作图
    var result = "";
    
    //大背景
    result += "<v:shapetype id='" + uniqueId + "Box' coordsize='21600,21600' o:spt='16' adj='5400'></v:shapetype>";
    result += "<v:rect id='"  + uniqueId + "background' style='position:absolute;left:"+table_left+"px;top:"+table_top+"px;WIDTH:"+all_width+"px;HEIGHT:"+all_height+"px;' fillcolor='#E1EDF5' strokecolor='gray'>";
  
    result += "</v:rect>";
    result += "<v:group ID='" + uniqueId + "table' style='position:absolute;left:"+table_left+"px;top:"+table_top+"px;WIDTH:"+all_width+"px;HEIGHT:"+all_height+"px;' coordsize = '23500,12700'>" ;
    result += " <v:Rect style='position:relative;left:1500;top:200;width:20000;height:800'filled='false' stroked='false'>";
    result += " <v:TextBox inset='0pt,0pt,0pt,0pt'>";
    
    //标题
    result += " <table width='100%' border='0' align='center' cellspacing='0'>";
    result += " <tr>";
    result += " <td align='center' valign='middle'><div style='font-size:12pt; font-family:黑体;'><B>"+table_title+"</B></div></td>";
    result += " </tr>";
    result += " </table>";
    result += " </v:TextBox>";
    result += " </v:Rect> ";
    
    //背景与箭头
    result += " <v:rect id='" + uniqueId + "back' style='position:relative;left:1700;top:1200;width:20500; height:10500;' fillcolor='#E1EDF5' strokecolor='#DFDFDF'>";
    result += " <v:fill rotate='t' angle='-45' focus='100%' type='gradient'/>";
    result += " </v:rect>";
    result += " <v:line ID='" + uniqueId + "X' from='1700,11700' to='22700,11700' style='z-index:2' strokecolor='#000000' strokeWeight=1pt><v:stroke EndArrow='Classic'/></v:line>";
    result += " <v:line ID='" + uniqueId + "Y' from='1700,900' to='1700,11700' style='z-index:2' strokecolor='#000000' strokeWeight=1pt><v:stroke StartArrow='Classic'/></v:line>";
    result += " <v:line ID='" + uniqueId + "Y' from='22000,900' to='22000,11700' style='z-index:2' strokecolor='#000000' strokeWeight=1pt><v:stroke StartArrow='Classic'/></v:line>";
    
    //X轴与Y轴的单位
    result += " <v:Rect style='position:relative;left:100;top:700;width:1500;height:600' filled='false' stroked='false'>"
    result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:9pt;'><div align='right'>"+y_unit+"</div></v:TextBox>"
    result += " </v:Rect> " 
    result += " <v:Rect style='position:relative;left:22200;top:11900;width:2000;height:600' filled='false' stroked='false'>"
    result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:9pt;'><div align='left'>"+x_unit+"</div></v:TextBox>"
    result += " </v:Rect> " 
    
    //画五条横坐标
    for(i=0; i<=4; i++)
    {
        result += " <v:line from='1200,"+(i*2000+1700)+"' to='1700,"+(i*2000+1700)+"' style='z-index:2' strokecolor='#000000'></v:line>";
        result += " <v:line from='1700,"+(i*2000+1700)+"' to='2200,"+(i*2000+1200)+"' style='z-index:2' strokecolor='#0099FF'></v:line>";
        result += " <v:line from='2200,"+(i*2000+1200)+"' to='22200,"+(i*2000+1200)+"' style='z-index:2' strokecolor='#0099FF'></v:line>";
        result += " <v:line from='2200,"+(i*2000+2200)+"' to='22200,"+(i*2000+2200)+"' style='z-index:2' strokecolor='#0099FF'>";
        result += " <v:stroke dashstyle='Dot'/>"
        result += " </v:line>"
        
        result += " <v:Rect style='position:relative;left:100;top:"+(i*2000+1250)+";width:1500;height:600' filled='false' stroked='false'>";
        result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:9pt;'><div align='right'>"+item_height*(5-i)+"</div></v:TextBox>";
       
       //添加新	y轴标度 
       // result += " <v:TextBox inset='500pt,-13pt,0pt,0pt' style='font-size:9pt;'><div align='right'>"+20*(5-i)+"</div></v:TextBox>";
        result += " </v:Rect> " ;
    }
    for(i=0; i<=4; i++)
    {
        result += " <v:line from='1200,"+(i*2000+1700)+"' to='1700,"+(i*2000+1700)+"' style='z-index:2' strokecolor='#000000'></v:line>";
        result += " <v:line from='1700,"+(i*2000+1700)+"' to='2200,"+(i*2000+1200)+"' style='z-index:2' strokecolor='#0099FF'></v:line>";
        result += " <v:line from='2200,"+(i*2000+1200)+"' to='22200,"+(i*2000+1200)+"' style='z-index:2' strokecolor='#0099FF'></v:line>";
        result += " <v:line from='2200,"+(i*2000+2200)+"' to='22200,"+(i*2000+2200)+"' style='z-index:2' strokecolor='#0099FF'>";
        result += " <v:stroke dashstyle='Dot'/>"
        result += " </v:line>"
        
        result += " <v:Rect style='position:relative;left:100;top:"+(i*2000+1250)+";width:1500;height:600' filled='false' stroked='false'>";
      //  result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:9pt;'><div align='right'>"+item_height*(5-i)+"</div></v:TextBox>";
       
       //添加新	y轴标度 
        result += " <v:TextBox inset='500pt,-13pt,0pt,0pt' style='font-size:9pt;'><div align='right'>"+20*(5-i)+"</div></v:TextBox>";
        result += " </v:Rect> " ;
    }
    
    
    
    
    //画三条让图形变得立体的线
    result += " <v:line from='2200,11200' to='22200,11200' style='z-index:2' strokecolor='#0099FF'></v:line>";
    result += " <v:line from='2200,1200' to='2200,11200' style='z-index:2' strokecolor='#0099FF'></v:line>";
    result += " <v:line from='1700,11700' to='2200,11200' style='z-index:2' strokecolor='#0099FF'></v:line>";
    
    result += " <v:line from='22000,900' to='22200,11200' style='z-index:2' strokecolor='#0099FF'></v:line>";
    result += " <v:line from='22000,11700' to='22200,11200' style='z-index:2' strokecolor='#0099FF'></v:line>";
    
    
    //画柱子了
    for(i=0; i<num; i++)
    {
        this_hight = parseInt(data_Array[i][0]/(5*item_height)*10000+420);
        result += " <v:shape id='" + uniqueId + "Box"+i+"' type='#" + uniqueId + "Box' fillcolor='#F0FFF0' strokecolor='#5f5f5f' style='position:relative; left:"+(i*item_width2+begin_x2)+";top:"+parseInt(10000-this_hight+1620)+";width:1200;height:"+this_hight+";z-index:10' title='" + data_Array[i][2] + "'>";
        result += " <v:fill o:opacity2='52429f' rotate='t' angle='-45' focus='100%' type='gradient'/>";
        result += " </v:shape>";
        result += " <v:Rect style='position:relative;left:"+(i*item_width2+2200)+";top:"+parseInt(10000-this_hight+1000)+";width:"+item_width/2+";height:1000' filled='false' stroked='false'>";
        result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:6pt;'><div align='center'>"+data_Array[i][0]+"</div></v:TextBox>";
        result += " </v:Rect>" ;
        
        result += " <v:Rect style='position:relative;left:"+(i*item_width2+2200)+";top:11850;width:"+item_width/2+";height:600' filled='false' stroked='false'>";
        result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:6pt;'><div align='center'><a href='" + data_Array[i][3] + "'>"+data_Array[i][1]+"</a></div></v:TextBox>";
        result += " </v:Rect> " ;
        
    }
    for(i=0; i<numa; i++){
    
        this_hight = parseInt(data2_Array[i][0]/(5*item_height)*10000+420);
        result += " <v:shape id='" + uniqueId + "Box"+i+"' type='#" + uniqueId + "Box' fillcolor='"+colors[i]+"' strokecolor='#5f5f5f' style='position:relative; left:"+(i*item_width+begin_x)+";top:"+parseInt(10000-this_hight+1620)+";width:1200;height:"+this_hight+";z-index:10' title='" + data_Array[i][2] + "'>";
        result += " <v:fill o:opacity2='52429f' rotate='t' angle='-45' focus='100%' type='gradient'/>";
        result += " </v:shape>";
        result += " <v:Rect style='position:relative;left:"+(i*item_width+2200)+";top:"+parseInt(10000-this_hight+1000)+";width:"+item_width+";height:1000' filled='false' stroked='false'>";
        result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:6pt;'><div align='center'>"+data2_Array[i][0]+"</div></v:TextBox>";
        result += " </v:Rect>" ;
        
        result += " <v:Rect style='position:relative;left:"+(i*item_width+2200)+";top:11850;width:"+item_width+";height:600' filled='false' stroked='false'>";
        result += " <v:TextBox inset='0pt,0pt,0pt,0pt' style='font-size:6pt;'><div align='center'><a href='" + data2_Array[i][3] + "'>"+data2_Array[i][1]+"</a></div></v:TextBox>";
        result += " </v:Rect> " ;
        
      	
    }
          
    
    	
    for(i=1; i<num1; i++)
    {
        if(i==1)
        {
            displaystr=""
        }
        else
        {
            displaystr="none"
        }
        //列表栏的动态效果
        result += " <div id='" + uniqueId + "_"+i+"'>"
        //画中间的线
        for(j=0; j<num2-2; j++)
        {
           var this_Height1 = parseInt(data3_Array[i][j+1]/(5*item_height)*10000*2.5)
            var this_Height2 = parseInt(data3_Array[i][j+2]/(5*item_height)*10000*2.5)
            result += " <v:line from='"+(j*item_Width+1850)+","+(10000-this_Height1+1550)+"' to='"+((j+1)*item_Width+1850)+","+(10000-this_Height2+1550)+"'style='z-index:"+(i*10)+";' strokeweight='0.1pt' strokecolor='"+colors[i-1]+"'>"
            result += " <o:extrusion v:ext='view' backdepth='12pt' on='t' lightposition='-50000,-50000' lightposition2='50000'/>"
            result += " </v:line>"
            
        }
        result += " </div>"
    }
    	
    	
    result += "</v:group>";
    return result;
}
