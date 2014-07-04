/*時計を縦方向中央に表示する（奥出）*/
	function setMiddle(){
	　var img_width = $('.clocklocal').width();	
		console.log(img_width);
　	$('.clock').css('margin-top',-1*img_width/2);
	}
	$(window).load(function(){
		setMiddle();
	}); 
	$( window ).resize(function() {
		setMiddle();
	}); 
	
	
	var openTime= new Date();
	var datetime;
	var timeDifference=-11;
	var datetime =new Date();
	var nightStarts=18;
	var nightEnds=6;

	
	var timerID;
	
	var isWindowActive=true;
	
	var remoteDatetime=new Date();
	
	function initializeNeedle(){
			datetime=new Date();

			setInterval(actionInASec, 1000);

	}
	
	$(function(){
		initializeNeedle();

});
	
	$(window).focus(function() {
	$(".sec").clearQueue()
	});
	
	
	
	function actionInASec(){

		datetime=new Date();
		remoteDatetime.setHours(datetime.getHours()+timeDifference)
		var sec=openTime.getSeconds()+(datetime-openTime)/1000;
		var min=datetime.getMinutes();
		var hour=datetime.getHours();
		var formerHour;
		
		if(hour!=formerHour){
		if(hour<nightEnds || hour>=nightStarts){
			$("img.clocklocal").attr("src","./img/clocknight.svg")
			
		}else{
			$("img.clocklocal").attr("src","./img/clock.svg")		
		}
		
		var remoteHour=remoteDatetime.getHours();

		if(remoteHour<nightEnds || remoteHour>=nightStarts){
			$("img.clockremote").attr("src","./img/clocknightback.svg")
			
		}else{
			$("img.clockremote").attr("src","./img/clockback.svg")		
		}
		
		
		}
		
		formerHour=hour;
		
		var localHourDeg=hour*30+(min/60)*30;
		var remoteHourDeg=(hour+timeDifference)*30+(min/60)*30;
		
		var radius=50;
		var oX=50;
		var oY=53;
		
		var remoteHourX1 = oX+radius*Math.sin((remoteHourDeg-22)* (Math.PI / 180));
		var remoteHourY1 = oY+radius*Math.cos((remoteHourDeg-22)* (Math.PI / 180))*-1;
		
		var remoteHourX2 = oX+radius*Math.sin((remoteHourDeg+22)* (Math.PI / 180));
		var remoteHourY2 = oY+radius*Math.cos((remoteHourDeg+22)* (Math.PI / 180))*-1;
		
		$(".clockremote").css("-webkit-clip-path","polygon("+remoteHourX1+"% "+remoteHourY1+"%,"+remoteHourX2+"% "+remoteHourY2+"%,50.8% 52%");
		$(".clockremote").css("clip-path","polygon("+remoteHourX1+"% "+remoteHourY1+"%,"+remoteHourX2+"% "+remoteHourY2+"%,50.8% 52%");


		
		console.log(remoteHourX1+","+remoteHourY1+",,"+remoteHourX2+","+remoteHourY2)

		$(".sec").transition({rotate:parseInt(sec)*6+0.5+"deg"},80).transition({rotate:"-=0.5deg"},20);
		$(".long").transition({rotate:min*6+(datetime.getSeconds()/60)*6+"deg"},0);
		$(".short.mine").transition({rotate:localHourDeg+"deg"},0);
		$(".short.others").transition({rotate:remoteHourDeg+"deg"},0);
		
	}
