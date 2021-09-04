const video = document.querySelector('video');
const progressrange = document.querySelector('.progress-range')
const progressbar = document.querySelector(".progress-bar");
const playbtn = document.getElementById('play-btn');
const volumeicon = document.getElementById('volume-icon');

const volumerange = document.querySelector(".volume-range");
const volumebar = document.querySelector(".volume-bar");

const currenttime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

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


// Progress Bar //
function updateprogress(){
  progressbar.style.width = `${(video.currentTime / video.duration) * 100}%`;
}


// Volume Controls //



// Change Playback Speed  //



// Fullscree //


//event listeners
playbtn.addEventListener('click' , playandpause);
video.addEventListener('click' , playandpause);
video.addEventListener('ended' , videoended);
video.addEventListener('timeupdate' , updateprogress);
video.addEventListener('canplay' , updateprogress);