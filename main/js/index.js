	var i=1;
	var MusicNameList=["上田麗奈 - リテラチュア","上田麗奈 - リテラチュア"];
	var musicname=document.getElementById("musicname");
	console.log(musicname.innerText);
	var newmusicname=document.createElement("p");
	var musicnamebox=document.getElementsByClassName("music-name");
	
	
	var nextmusicbtn=document.getElementById("nextmusic");
	nextmusicbtn.onclick=function(){
		console.log(musicname.innerText);
	}
	
	//自定义点击事件
	function myclickById(id,fun){
		var btn=document.getElementById(id);
		btn.onclick=fun;
	}
	
	//获取播放器
	var player=document.getElementById("music-player");
	player.volume=0.6;
	
	//获取音乐总时长并修改
	function getmusicAllTime(){
		if(player.readyState > 0) 
		    {
		        var minutes = parseInt(player.duration / 60, 10);
		        var seconds = parseInt(player.duration % 60);		     
		        var musicAllTime=AddZero(minutes) +":"+AddZero(seconds);
				
				document.getElementById("music-all-time").textContent=musicAllTime;			
		    }
	};
	
	
	//获取音乐当前时间并修改
	function getmusicNowTime(){
		if(player.readyState > 0) 
		    {
		        var minutes = parseInt(player.currentTime / 60, 10);
		        var seconds = parseInt(player.currentTime % 60);
		        var musicNowTime=AddZero(minutes) +":"+AddZero(seconds);
				
				document.getElementById("music-now-time").textContent=musicNowTime;			
		    }
	};
	
	//补充分数和秒数前面的0
	function AddZero(num) {
	    return (Array(2).join(0) + num).slice(-2);
	}
	
	//播放&暂停
	myclickById("playmusic",function(){
		if(player.paused==true)player.play();
				else if(player.paused==false)player.pause();
		getmusicAllTime();
		getmusicNowTime();
	});
	
	//下一首（还没写）
	
	//上一首（还没写）
	
	//音量增加
	myclickById("volumeup",function(){
		player.volume+=0.1;
	});
	//音量减少
	myclickById("volumedown",function(){
		player.volume-=0.1;
	});
	
	
	
	window.onload=function(){	              
	  
	  setInterval("getmusicNowTime()",1000);
	}