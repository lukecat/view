var kwh1 = [ null, null, null, null, null, null, null, null, null ];		//その日の時間別データ
var yen1 = [ null, null, null, null, null, null, null, null, null ];		//その日の時間別データ
var kwh2 = [ null, null, null, null, null, null, null ];			//1週間の日別データ
var yen2 = [ null, null, null, null, null, null, null ];			//1週間の日別データ
var kwh3 = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];	//1ヶ月の日別データ
var yen3 = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];	//1ヶ月の日別データ

var tick2 = ['', '', '', '', '', '', ''];
var tick3 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];


function getCsvData(){
	setTimeout("getCsvData()", 10*60*1000);

	//データ初期化
	kwh1 = [ null, null, null, null, null, null, null, null, null ];
	yen1 = [ null, null, null, null, null, null, null, null, null ];
	kwh2 = [ null, null, null, null, null, null, null ];	
	yen2 = [ null, null, null, null, null, null, null ];	
	kwh3 = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];
	yen3 = [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null ];

	var nowdate = new Date();
	var year = nowdate.getFullYear();	// 年 
	var mon  = nowdate.getMonth() + 1; // 月 
	var date = nowdate.getDate();		// 日
	var week = nowdate.getDay();		//曜日
	var hour = nowdate.getHours();		//時
	var minute = nowdate.getMinutes();	//分
	//var second = nowdate.getSeconds();

	//[1週間の日別データ]の対象範囲
	var geta = week-1; if(geta<0) geta=6;	//月曜日(1)から開始。日曜日(0)は最後に持ってくる。
	var weekY =[ new Date(year,mon-1,date-geta).getFullYear(), new Date(year,mon-1,date-geta+1).getFullYear(), 
					new Date(year,mon-1,date-geta+2).getFullYear(), new Date(year,mon-1,date-geta+3).getFullYear(),
					new Date(year,mon-1,date-geta+4).getFullYear(), new Date(year,mon-1,date-geta+5).getFullYear(),
					new Date(year,mon-1,date-geta+6).getFullYear() ];
	var weekM =[ new Date(year,mon-1,date-geta).getMonth()+1, new Date(year,mon-1,date-geta+1).getMonth()+1, 
					new Date(year,mon-1,date-geta+2).getMonth()+1, new Date(year,mon-1,date-geta+3).getMonth()+1,
					new Date(year,mon-1,date-geta+4).getMonth()+1, new Date(year,mon-1,date-geta+5).getMonth()+1,
					new Date(year,mon-1,date-geta+6).getMonth()+1 ];
	var weekD =[ new Date(year,mon-1,date-geta).getDate(), new Date(year,mon-1,date-geta+1).getDate(), 
					new Date(year,mon-1,date-geta+2).getDate(), new Date(year,mon-1,date-geta+3).getDate(),
					new Date(year,mon-1,date-geta+4).getDate(), new Date(year,mon-1,date-geta+5).getDate(),
					new Date(year,mon-1,date-geta+6).getDate() ];
	//[1週間の日別データ]の項目
	var w = ['月', '火', '水', '木', '金', '土', '日'];
	for(i=0; i<7; i++) tick2[i] = weekM[i] +'/'+ weekD[i] + '(' +w[i]+ ')';
	//[1ヶ月の日別データ]の項目
	for(i=0; i<31; i+=2){
		tick3[i] = mon +'/'+ (i+1);
		//if(tickdate.getMonth() != new Date(year, mon-1, i+2)) break;
	}
	

	//現在の時間まで0で初期化
	var time_array = [ 0, 0, 3, 6, 9, 12, 15, 18, 21 ];
	for(i=0; i<time_array.length; i++){
		if(time_array[i]<=hour){ kwh1[i]=0; yen1[i]=0; }
	}
	//現在の曜日まで0で初期化
	for(i=0; i<=geta; i++){ kwh2[i]=0; yen2[i]=0; }
	//現在の日まで0で初期化
	for(i=1; i<date; i++){ kwh3[i]=0;	yen3[i]=0; }

	$.ajax({
		type: "GET",
		url: "data.CSV",
		success: function(data){
			data = data.replace(/\r\n/g, "\n");
			data = data.replace(/\r/g, "\n");
			var lines = data.split("\n");
			for(i=3; i<lines.length; i++){
				var record = lines[i].split(",");
				//その日の時間別データ
				if(record[0]==year && record[1]==mon && record[2]==date){
					if( 0<=hour && record[3]==0){ kwh1[0] += Number(record[15]); yen1[0] += Number(record[25]); }
					if( 0<=hour && record[3]<= 3){ kwh1[1] += Number(record[15]); yen1[1] += Number(record[25]); }
					if( 3<=hour && record[3]<= 6){ kwh1[2] += Number(record[15]); yen1[2] += Number(record[25]); }
					if( 6<=hour && record[3]<= 9){ kwh1[3] += Number(record[15]); yen1[3] += Number(record[25]); }
					if( 9<=hour && record[3]<=12){ kwh1[4] += Number(record[15]); yen1[4] += Number(record[25]); }
					if(12<=hour && record[3]<=15){ kwh1[5] += Number(record[15]); yen1[5] += Number(record[25]); }
					if(15<=hour && record[3]<=18){ kwh1[6] += Number(record[15]); yen1[6] += Number(record[25]); }
					if(18<=hour && record[3]<=21){ kwh1[7] += Number(record[15]); yen1[7] += Number(record[25]); }
					if(21<=hour && record[3]<=24){ kwh1[8] += Number(record[15]); yen1[8] += Number(record[25]); }
				}
				//1週間の日別データ
				if(geta>=0 && record[0]==weekY[0] && record[1]==weekM[0] && record[2]==weekD[0]){
					kwh2[0] += Number(record[15]); yen2[0] += Number(record[25]);
				}
				if(geta>=1 && record[0]==weekY[1] && record[1]==weekM[1] && record[2]==weekD[1]){
					kwh2[1] += Number(record[15]); yen2[1] += Number(record[25]);
				}
				if(geta>=2 && record[0]==weekY[2] && record[1]==weekM[2] && record[2]==weekD[2]){
					kwh2[2] += Number(record[15]); yen2[2] += Number(record[25]);
				}
				if(geta>=3 && record[0]==weekY[3] && record[1]==weekM[3] && record[2]==weekD[3]){
					kwh2[3] += Number(record[15]); yen2[3] += Number(record[25]);
				}
				if(geta>=4 && record[0]==weekY[4] && record[1]==weekM[4] && record[2]==weekD[4]){
					kwh2[4] += Number(record[15]); yen2[4] += Number(record[25]);
				}
				if(geta>=5 && record[0]==weekY[5] && record[1]==weekM[5] && record[2]==weekD[5]){
					kwh2[5] += Number(record[15]); yen2[5] += Number(record[25]);
				}
				if(geta>=6 && record[0]==weekY[6] && record[1]==weekM[6] && record[2]==weekD[6]){
					kwh2[6] += Number(record[15]); yen2[6] += Number(record[25]);
				}
				//1ヶ月の日別データ
				if(record[0]==year && record[1]==mon && record[2]<=date){
					if(record[2]==1){ kwh3[0] += Number(record[15]); yen3[0] += Number(record[25]); }
					if(record[2]==2){ kwh3[1] += Number(record[15]); yen3[1] += Number(record[25]); }
					if(record[2]==3){ kwh3[2] += Number(record[15]); yen3[2] += Number(record[25]); }
					if(record[2]==4){ kwh3[3] += Number(record[15]); yen3[3] += Number(record[25]); }
					if(record[2]==5){ kwh3[4] += Number(record[15]); yen3[4] += Number(record[25]); }
					if(record[2]==6){ kwh3[5] += Number(record[15]); yen3[5] += Number(record[25]); }
					if(record[2]==7){ kwh3[6] += Number(record[15]); yen3[6] += Number(record[25]); }
					if(record[2]==8){ kwh3[7] += Number(record[15]); yen3[7] += Number(record[25]); }
					if(record[2]==9){ kwh3[8] += Number(record[15]); yen3[8] += Number(record[25]); }
					if(record[2]==10){ kwh3[9] += Number(record[15]); yen3[9] += Number(record[25]); }
					if(record[2]==11){ kwh3[10] += Number(record[15]); yen3[10] += Number(record[25]); }
					if(record[2]==12){ kwh3[11] += Number(record[15]); yen3[11] += Number(record[25]); }
					if(record[2]==13){ kwh3[12] += Number(record[15]); yen3[12] += Number(record[25]); }
					if(record[2]==14){ kwh3[13] += Number(record[15]); yen3[13] += Number(record[25]); }
					if(record[2]==15){ kwh3[14] += Number(record[15]); yen3[14] += Number(record[25]); }
					if(record[2]==16){ kwh3[15] += Number(record[15]); yen3[15] += Number(record[25]); }
					if(record[2]==17){ kwh3[16] += Number(record[15]); yen3[16] += Number(record[25]); }
					if(record[2]==18){ kwh3[17] += Number(record[15]); yen3[17] += Number(record[25]); }
					if(record[2]==19){ kwh3[18] += Number(record[15]); yen3[18] += Number(record[25]); }
					if(record[2]==20){ kwh3[19] += Number(record[15]); yen3[19] += Number(record[25]); }
					if(record[2]==21){ kwh3[20] += Number(record[15]); yen3[20] += Number(record[25]); }
					if(record[2]==22){ kwh3[21] += Number(record[15]); yen3[21] += Number(record[25]); }
					if(record[2]==23){ kwh3[22] += Number(record[15]); yen3[22] += Number(record[25]); }
					if(record[2]==24){ kwh3[23] += Number(record[15]); yen3[23] += Number(record[25]); }
					if(record[2]==25){ kwh3[24] += Number(record[15]); yen3[24] += Number(record[25]); }
					if(record[2]==26){ kwh3[25] += Number(record[15]); yen3[25] += Number(record[25]); }
					if(record[2]==27){ kwh3[26] += Number(record[15]); yen3[26] += Number(record[25]); }
					if(record[2]==28){ kwh3[27] += Number(record[15]); yen3[27] += Number(record[25]); }
					if(record[2]==29){ kwh3[28] += Number(record[15]); yen3[28] += Number(record[25]); }
					if(record[2]==30){ kwh3[29] += Number(record[15]); yen3[29] += Number(record[25]); }
					if(record[2]==31){ kwh3[30] += Number(record[15]); yen3[30] += Number(record[25]); }
				}
			}
			//週ごとデータの累積処理
			for(i=1; i<=geta; i++){ kwh2[i] += kwh2[i-1];	yen2[i] += yen2[i-1]; }
			//1ヶ月ごとデータの累積処理
			for(i=1; i<date; i++){ kwh3[i] += kwh3[i-1];	yen3[i] += yen3[i-1]; }

			$("#update").html(year +'/'+ mon +'/'+ date +' '+ hour +':'+ minute +' 更新');
			tabClick(1);
			setChart1();
		}
	});
}


function tabClick(index){
	if(index==1){
		$("#tab1").css("background","#ffffff");	$("#tab1").css("border-bottom","none");
		$("#tab2").css("background","#cccccc");	$("#tab2").css("border-bottom","1px solid #999999");
		$("#tab3").css("background","#cccccc");	$("#tab3").css("border-bottom","1px solid #999999");
		setChart1();
	}
	if(index==2){
		$("#tab1").css("background","#cccccc");	$("#tab1").css("border-bottom","1px solid #999999");
		$("#tab2").css("background","#ffffff");	$("#tab2").css("border-bottom","none");
		$("#tab3").css("background","#cccccc");	$("#tab3").css("border-bottom","1px solid #999999");
		setCahrt2();
	}
	if(index==3){
		$("#tab1").css("background","#cccccc");	$("#tab1").css("border-bottom","1px solid #999999");
		$("#tab2").css("background","#cccccc");	$("#tab2").css("border-bottom","1px solid #999999");
		$("#tab3").css("background","#ffffff");	$("#tab3").css("border-bottom","none");
		setCahrt3();
	}
	
}



function setChartLabel(){
	var text = '<table border="0" width="100%" cellpadding="0px;"><tr>';
	text += '<td width="20" style="color:#777777;font-size:10pt;">(kW)</td>';	
	text += '<td>&nbsp;</td>';
	text += '<td width="40" style="color:#777777;font-size:10pt;">(円)</td>';	
	text += '</tr></td>';
	$("#label").html(text);
}

//最大値からグラフ縦軸のレンジを決める。
function getMaxRange(val){
	var maxRange = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
						100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 
						750, 800, 850, 900, 950, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 
						2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 
						4600, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6600, 
						6800, 7000, 7200, 7400, 7600, 7800, 8000, 8200, 8400, 8600, 8800, 
						9000, 9200, 9400, 9600, 9800, 10000 ];

	var mv=0;
	for(i=0; i<val.length; i++){
		if(mv < val[i]) mv=val[i];
	}
	for(i=0; i<maxRange.length; i++){
		if(maxRange[i] > mv) return maxRange[i];
	}
}

//チャートの上にある数値表記のセット
function updateValue(kwh_v, yen_v){
	var kwh_now=0;
	var yen_now=0;
	for(i=0; i<kwh_v.length; i++){
		if(kwh_v[i]==null){
			kwh_now=Math.floor(kwh_v[i-1]);	yen_now=Math.floor(yen_v[i-1]);
			break;
		}
	}
	//alert(kwh_now +"/"+ yen_now);

	var text = '<table width="80%" height="100%" bgcolor="#999999" cellspacing="1" cellpadding="10" style="margin-left:auto;margin-right:auto;"><tr>';
	text += '<td style="background:#ffffff;width:50%;">';
	text += '	<table width="100%" border="0"><tr>';
	text += '	<td style="color:#666666;font-family:\'Meiryo UI\';font-size:12pt;">発電量</td>';
	text += '	<td style="color:#666666;font-family:\'Meiryo UI\';font-size:16pt;text-align:right;">' +Money(kwh_now)+ 'kW</td>';
	text += '	</tr></table>';
	text += '</td>';
	text += '<td style="background:#ffffff;width:50%;">';
	text += '	<table width="100%" border="0"><tr>';
	text += '	<td style="color:#666666;font-family:\'Meiryo UI\';font-size:12pt;">売電額</td>';
	text += '	<td style="color:#666666;font-family:\'Meiryo UI\';font-size:16pt;text-align:right;">' +Money(yen_now)+ '円</td>';
	text += '	</tr></table>';
	text += '</td>';
	text += '</tr></table>';

	$("#valtable").html(text);
}

function Money(str) {
	var num = new String(str).replace(/,/g, "");
	while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
	return num;
}



//1ヶ月の日別集計
function setCahrt3(){
  updateValue(kwh3, yen3);

  $("#chart").empty();
  var plot2 = $.jqplot('chart', [kwh3, yen3], {
    //title: '東京',
    series:[
      {
        yaxis:'yaxis',
        renderer:$.jqplot.BarRenderer,
        rendererOptions:{ highlightMouseOver: false, barPadding:0, barWidth:10 }
      },
      {
        yaxis:'y2axis'
      }
    ],
	seriesColors: [ '#aaaaff', '#ff99ff' ],
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer,
        ticks: tick3,
        //label: '月'
      },
      yaxis: {
		 //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
        //label: 'kWh',
        min: 0,
        max: getMaxRange(kwh3),
        numberTicks: 11
      },
      y2axis: {
        //label: '円',
        min: 0,
        max: getMaxRange(yen3),
        numberTicks: 11
      }
    }
  });
}


//1週間の日別集計
function setCahrt2(){
  updateValue(kwh2, yen2);

  $("#chart").empty();
  //var tick = ['月曜日', '火曜日', '水曜日', '杢曜日', '金曜日', '土曜日', '日曜日' ];
  var plot2 = $.jqplot('chart', [kwh2, yen2], {
    //title: '東京',
    series:[
      {
        yaxis:'yaxis',
        renderer:$.jqplot.BarRenderer,
        rendererOptions:{highlightMouseOver: false}
      },
      {
        yaxis:'y2axis'
      }
    ],
	seriesColors: [ '#aaaaff', '#ff99ff' ],
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer,
        ticks: tick2,
        //label: '月'
      },
      yaxis: {
		 //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
        //label: 'kWh',
        min: 0,
        max: getMaxRange(kwh2),
        numberTicks: 11
      },
      y2axis: {
        //label: '円',
        min: 0,
        max: getMaxRange(yen2),
        numberTicks: 11
      }
    }
  });
}


//本日の集計
function setChart1(){
  updateValue(kwh1, yen1);

  $("#chart").empty();
  var tick = ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00' ];
  var plot2 = $.jqplot('chart', [kwh1, yen1], {
    //title: '東京',
    series:[
      {
        yaxis:'yaxis',
        renderer:$.jqplot.BarRenderer,
        rendererOptions:{highlightMouseOver: false}
      },
      {
        yaxis:'y2axis'
      }
    ],
	seriesColors: [ '#aaaaff', '#ff99ff' ],
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer,
        ticks: tick,
        //label: '月'
      },
      yaxis: {
        //label: 'kWh',
        min: 0,
        max: getMaxRange(kwh1),
        numberTicks: 11
      },
      y2axis: {
        //label: '円',
        min: 0,
        max: getMaxRange(yen1),
        numberTicks: 11
      }
    }
  });
}
//});


