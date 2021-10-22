	//自定义点击事件
	function myclickById(id,fun){
		var btn=document.getElementById(id);
		btn.onclick=fun;
	}
	

	//临时代码块
	{
		//歌单列表
		var musicList=["久保ユリカ,水瀬いのり - 雨だれの歌","上田麗奈 - リテラチュア","Akie秋绘 - elm"];
		//默认歌曲
		var i=0;
	}

	//获取播放器，以及播放器音频地址
	var player=document.getElementById("music-player");
	var musicURL=document.getElementById("musicurl");

	//设定网页刚加载的初始值
	musicURL.src=("../music/"+musicList[i]+".mp3");
	player.load();

	//设置默认音量为0.4
	player.volume=0.4;

	
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
	
	//获取当前播放器中的音乐文件名并修改
	//原理：获取音乐播放器地址的文件路径，并截取最后一个'/'之后的字符和最后一个'.'之间的字符就是音乐名
	//decodeURI(),负责把地址中的煞笔的乱码解析回到正常的Unicode代码，不然看起来就是一坨屎一样的代码
	function getmusicName(){
	var musicname =player.currentSrc;
		musicname=musicname.substring(musicname.lastIndexOf("/")+1,musicname.length);
		musicname=musicname.substring(0,musicname.lastIndexOf("."));
		musicname=decodeURI(musicname);
		document.getElementById("musicname").textContent=musicname;
	}
	
	//三个函数集合
	function regetMusic(){
		getmusicName();
		getmusicAllTime();
		getmusicNowTime();
	}


	//播放&暂停
	myclickById("playmusic",function(){
		if(player.paused==true){
			player.play();
			//修改播放按钮
			document.getElementById("playmusic").firstElementChild.classList="iconfont icon-zanting";
		}
		else if(player.paused==false){
			player.pause();
			//修改播放按钮
			document.getElementById("playmusic").firstElementChild.classList="iconfont icon-bofang";
		}
		regetMusic();
	});
	

	//上一首
	myclickById("nextmusic",function(){
		if(i<=0)i=musicList.length-1;
		else i--;
		
		musicURL.src=("../music/"+musicList[i]+".mp3");
		player.load();
		player.play();
		//修改播放按钮
		document.getElementById("playmusic").firstElementChild.classList="iconfont icon-zanting";
	});

	//下一首
	myclickById("beforemusic",function(){
		if(i>=musicList.length-1)i=0;
		else i++;
		
		musicURL.src=("../music/"+musicList[i]+".mp3");
		player.load();
		player.play();
		//修改播放按钮
		document.getElementById("playmusic").firstElementChild.classList="iconfont icon-zanting";	
	});

	//音量增加
	myclickById("volumeup",function(){
		player.volume+=0.1;
	});
	//音量减少
	myclickById("volumedown",function(){
		player.volume-=0.1;
	});
	
	
	
	window.onload=function(){
	  setInterval("regetMusic()",1000);
	}