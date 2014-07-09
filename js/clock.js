/*時計を縦方向中央に表示する（奥出）*/
	function setMiddle(){
		var img_width = $('.clocklocal').width();	
		// console.log(img_width);
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
	var timeDifference=calculateTimeDifference(localStorage['utc_offset'])
	var datetime =new Date();
	var nightStarts=18;
	var nightEnds=6;

	
	var timerID;
	
	var isWindowActive=true;
	
	var remoteDatetime=new Date();
	
	function initializeNeedle(){
			datetime=new Date();
			displayTimeInfo();
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
		remoteDatetime.setTime(datetime.getTime()+timeDifference*1000)
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
		var remoteHourDeg=remoteDatetime.getHours()*30+(min/60)*30;
		
		var radius=50;
		var oX=50;
		var oY=53;
		
		var remoteHourX1 = oX+radius*Math.sin((remoteHourDeg-22)* (Math.PI / 180));
		var remoteHourY1 = oY+radius*Math.cos((remoteHourDeg-22)* (Math.PI / 180))*-1;
		
		var remoteHourX2 = oX+radius*Math.sin((remoteHourDeg+22)* (Math.PI / 180));
		var remoteHourY2 = oY+radius*Math.cos((remoteHourDeg+22)* (Math.PI / 180))*-1;
		
		$(".clockremote").css("-webkit-clip-path","polygon("+remoteHourX1+"% "+remoteHourY1+"%,"+remoteHourX2+"% "+remoteHourY2+"%,50.8% 52%");
		$(".clockremote").css("clip-path","polygon("+remoteHourX1+"% "+remoteHourY1+"%,"+remoteHourX2+"% "+remoteHourY2+"%,50.8% 52%");


		
		// console.log(remoteHourX1+","+remoteHourY1+",,"+remoteHourX2+","+remoteHourY2)

		$(".sec").transition({rotate:parseInt(sec)*6+0.2+"deg"},50).transition({rotate:"-=0.2deg"},0);
		$(".long").transition({rotate:min*6+(datetime.getSeconds()/60)*6+"deg"},0);
		$(".short.mine").transition({rotate:localHourDeg+"deg"},0);
		$(".short.others").transition({rotate:remoteHourDeg+"deg"},0);
		
	}


	function calculateTimeDifference(offset){
		var date= new Date();
		 return parseInt(offset)-date.getTimezoneOffset()*-60;
	}
	
	function displayTimeInfo(){
	
		if(localStorage['utc_offset']){
		
		 var timezone=localStorage['timezone'];
		 var screen_name=localStorage['screen_name'];
		 timeDifference=calculateTimeDifference(localStorage['utc_offset'])

		 }else{ //Neymar hardcoding hack
		var timezone="Brasilia";
		 var screen_name="neymarjr";
		 timeDifference=calculateTimeDifference(-10800)

		 }	
	

	
		var sign="";
		if(timeDifference<0){
			sign=""
		}else{
			sign="+";
		}
		
		 var timeDiffernceText=sign+(timeDifference/3600)+":"+("0" + (timeDifference%3600)/60).slice(-2);
		

	     $('#timezone').text(timezone);
         $('#time_offset').text(timeDiffernceText);
         
         
         
         $('#screen_name').html("Timezone <a href='http://twitter.com/" + screen_name + "'>@" + screen_name + "</a>");
         $("input#twid").val(screen_name);
		
	}
