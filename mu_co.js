var musicList = [{
    src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
    title: 'IF YOU',
    author: 'Big Bang'
},{
    src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    title: '玫瑰',
    author: '贰佰'
}];

window.onload = function(){
  //流水线方式
  var cover = document.querySelector('.cover');
  var backBtn = document.querySelector('.musicbox .back');
  var playBtn = document.querySelector('.musicbox .play');
  var forwardBtn = document.querySelector('.musicbox .forward');
  var titleNode = document.querySelector('.musicbox .title');
  var authorNode = document.querySelector('.musicbox .author');
  var timeNode = document.querySelector('.musicbox .time');
  var progressBarNode = document.querySelector('.musicbox .bar');
  var progressNowNode = document.querySelector('.musicbox .progress-now');
  var musicListContainer = document.querySelector('.musicbox .list');
  var timer;

  //第一步:加载音乐
  var music = new Audio();
  music.autoplay = true;
  var musicIndex = 0;
  loadMusic(musicList[musicIndex]);

  function loadMusic(songObj){
    music.src = songObj.src;
    titleNode.innerText = songObj.title;
    authorNode.innerText = songObj.author;
  }
  
  //第二步：实现播放/暂停功能，同时切换图标
  playBtn.onclick = function(){
      var icon = this.querySelector('.fa');
      if(icon.classList.contains('fa-play')){
          music.play();
      }else{
          music.pause();
      }
      icon.classList.toggle('fa-play');
      icon.classList.toggle('fa-pause');
  }

  //第三步： 实现上一曲和下一曲功能
  //如果有三首曲，0，1，2表示，用取余数实现
  function loadNextMusic(){
    musicIndex++;
    musicIndex = musicIndex % musicList.length;
    loadMusic(musicList[musicIndex]);
  }

  function loadLastMusic(){
      musicIndex--;
      //考虑0变为-1的情况
      musicIndex = (musicIndex + musicList.length) % musicList.length;
      loadMusic(musicList[musicIndex]);
  }

  //绑定事件
  //  backBtn.onclick = loadLastMusic(); ??报错 不晓得为什么。。。。。
  forwardBtn.onclick = function(){
      loadNextMusic();
  }

  backBtn.onclick = function(){
      loadLastMusic();
  }

  //当音乐播放完成时自动切换下一首
  //为什么使用addEventListener?因为不只绑定一个事件
  music.addEventListener('ended',function(){
      loadNextMusic();
  });

  //实现时间轴，时间一秒跳一次
  function updateProgress(){
    var percent = (music.currentTime / music.duration) * 100 + '%';
    progressNowNode.style.width = percent;

    var minutes = parseInt(music.currentTime / 60);
    var seconds = parseInt(music.currentTime % 60) + '';
    seconds = seconds.length == 2 ? seconds : '0' + seconds;
    timeNode.innerText = minutes + ':' + seconds;
  } 

  music.onplaying = function(){
      timer = setInterval(function(){
          updateProgress()
      },1000)
      console.log('play');
  }

  music.onpause = function(){
      console.log('pause');
      clearInterval(timer);
  }

  music.addEventListener('ended',function(){
      clearInterval(timer);
  });

  //实现进度条控制音乐播放进度
  progressBarNode.onclick = function(e) {
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    music.currentTime = percent * music.duration
    progressNowNode.style.width = percent * 100 + "%"
  }
}









