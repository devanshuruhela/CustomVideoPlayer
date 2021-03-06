const player = document.querySelector('.player')
const video = document.querySelector('video');
const progressrange = document.querySelector('.progress-range')
const progressbar = document.querySelector(".progress-bar");
const playbtn = document.getElementById('play-btn');
const volumeicon = document.getElementById('volume-icon');

const volumerange = document.querySelector(".volume-range");
const volumebar = document.querySelector(".volume-bar");

const currenttime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const speed = document.querySelector('.player-speed');

const fullscreen = document.querySelector('.fullscreen');




// Play & Pause //

function videoended()
{
      playbtn.classList.remove("fa-pause");
      playbtn.classList.add("fa-play");
      playbtn.setAttribute("title", "Play");
}
function playandpause()
{
  if(video.paused)
  {
    playbtn.classList.add('fa-pause');
    playbtn.classList.remove('fa-play');
    playbtn.setAttribute('title' , 'Pause')
    video.play();
  }
  else{
    video.pause();
    videoended();
  }
}

// Displaying time 
function displaytime(time)
{
  const minute = Math.floor(time/60);
  let second = Math.floor(time%60);
  second = second >9 ? second:`0${second}`;
  return `${minute}:${second}`;
}
// Progress Bar //
function updateprogress(){
  progressbar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currenttime.textContent = `${displaytime(video.currentTime)}/`;
  duration.textContent = `${displaytime(video.duration)}`
}
function changeprogressbar(event)
{
  const newtime = event.offsetX / progressrange.offsetWidth;
  progressbar.style.width = `${newtime * 100}%`;
  video.currentTime = newtime * video.duration;
  
}


// Volume Controls //
let lastvolume = 1;
let volumeclass ='';
function setvolume(event)
{
  let volume = event.offsetX / volumerange.offsetWidth;
  if(volume<0.1)
  {
    volume=0;
  }
  if(volume>0.9)
  {
    volume=1;
  }
  volumebar.style.width = `${volume * 100}%`
  video.volume = volume;
  //setting valume icons
  volumeicon.className = '';
  if (volume > 0.6)
  {
    volumeicon.classList.add('fas' , 'fa-volume-up');
    volumeclass = 'fa-volume-up'
  }
  if (volume < 0.6 && volume>0) {
      volumeicon.classList.add("fas", "fa-volume-down");
     volumeclass = 'fa-volume-down'
    }
  if (volume === 0 ) {
        volumeicon.classList.add("fas", "fa-volume-mute");
        volumeclass = 'fa-volume-mute'
      }
      lastvolume = volume;
}

function mute()
{
   volumeicon.className = "";
  if (video.volume>0.1)
  {
    lastvolume= video.volume;
    video.volume =0 ;
    volumebar.style.width = 0;
    volumeicon.classList.add('fas' , 'fa-volume-mute');
    volumeicon.setAttribute('title' , 'Unmute')
  }
  else{
    video.volume = lastvolume;
    volumebar.style.width = `${lastvolume * 100}%`;
    volumeicon.classList.add('fas' , 'fa-volume-up');
    volumeicon.setAttribute('title' , 'Mute')
  }
}
// Change Playback Speed  //
function changespeed()
{
  video.playbackRate = speed.value;
}


// Fullscree //


/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen(elem) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let full = false;
function togglefullscreen()
{
  if(!full)
  {
    openFullscreen(player);
  }
  else{
    closeFullscreen(player);
  }
  full =!full;
}

//event listeners
playbtn.addEventListener('click' , playandpause);
video.addEventListener('click' , playandpause);
video.addEventListener('ended' , videoended);
video.addEventListener('timeupdate' , updateprogress);
video.addEventListener('canplay' , updateprogress);
progressrange.addEventListener('click' , changeprogressbar);

volumerange.addEventListener('click' , setvolume);
volumeicon.addEventListener('click' , mute);

speed.addEventListener('change' , changespeed);

fullscreen.addEventListener('click' , togglefullscreen);