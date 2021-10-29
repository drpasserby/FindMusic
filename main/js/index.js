	//自定义点击事件
	function myclickById(id,fun){
		var btn=document.getElementById(id);
		btn.onclick=fun;
	}
	

	//临时代码块
	{
		//歌单列表
		var musicList=[
		"久保ユリカ,水瀬いのり - 雨だれの歌",
		"上田麗奈 - リテラチュア",
		"Akie秋绘 - elm",
		"陈致逸,HOYO-MiX - Her Legacy 未曾失落的回忆",
		"Sound Horizon - 美しきもの"
		];
		//默认歌曲
		var i=0;
		
		myclickById("test",function(){
			alert(musicplayerPictureBox);
		})
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

	//修改播放器图片（初步）
	function changePlayerPicture(){
		document.getElementById("player-picture").src=("../img/"+musicList[i]+".jpg");
	}
	
	//三个函数集合
	function regetMusic(){
		//获取封面
		setTimeout(getmusicName,1);
		//获取总时间
		getmusicAllTime();
		//获取现在播放时间
		getmusicNowTime();
		//修改音乐封面
		changePlayerPicture();
	}


	//播放&暂停
	myclickById("playmusic",function(){
		if(player.paused==true){
			player.play();
			//修改播放按钮
			document.getElementById("playmusic").firstElementChild.classList="findmusic icon-zanting";
		}
		else if(player.paused==false){
			player.pause();
			//修改播放按钮
			document.getElementById("playmusic").firstElementChild.classList="findmusic icon-bofang";
		}
	});
	

	//上一首
	myclickById("nextmusic",function(){
		if(i<=0)i=musicList.length-1;
		else i--;
		
		musicURL.src=("../music/"+musicList[i]+".mp3");
		player.load();
		player.play();
		//修改播放按钮
		document.getElementById("playmusic").firstElementChild.classList="findmusic icon-zanting";
		//封面回正
		round=0;
	});

	//下一首
	myclickById("beforemusic",function(){
		if(i>=musicList.length-1)i=0;
		else i++;
		
		musicURL.src=("../music/"+musicList[i]+".mp3");
		player.load();
		player.play();
		//修改播放按钮
		document.getElementById("playmusic").firstElementChild.classList="findmusic icon-zanting";
		//封面回正
		round=0;
	});

	//音量增加
	myclickById("volumeup",function(){
		player.volume+=0.1;
	});
	//音量减少
	myclickById("volumedown",function(){
		player.volume-=0.1;
	});
	
	
	//后退5秒
	myclickById("backward",function(){
		player.currentTime-=5;
	});
	
	//前进5秒
	myclickById("forward",function(){
		player.currentTime+=5;
	});
	
	//获取播放列表
	var playerlistText=document.getElementById("playermusiclistText");
	playerlistText.style.height=((musicList.length)*25+"px");
	for(var j=0;j<musicList.length;j++)
	{	
		var tr=document.createElement("tr");
		tr.innerHTML=((musicList[j].substring(musicList[j].lastIndexOf("-")+1,musicList[j].length))+"\n");
		playerlistText.appendChild(tr);
	}
	
	// 显示/隐藏播放列表
	myclickById("playerMusicList",function(){
		if(playerlistText.parentElement.style.display!="block"){
			playerlistText.parentElement.style.display="block";
		}
		else
		{
			playerlistText.parentElement.style.display="none";
		}
		
	})
	
	//歌曲封面旋转
	var round=0;
	var musicplayerPictureBox=document.getElementById("player-picture").parentElement;
	function pictureRotate(){
		if(player.paused==false){
			if(round>=359)
			round=0;
			else{
				musicplayerPictureBox.style.transform=("rotate("+round+"deg)");
				round+=0.1;
			}
		}	
	}
	
	window.onload=function(){
	  setInterval("regetMusic()",100);
	  setInterval("pictureRotate()",5);
	}