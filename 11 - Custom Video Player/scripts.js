/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreenButton');

/* Functions */
function togglePlay(){
    const method = video.paused ? 'play' :'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime+= parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name]=this.value
}

function rangeMouseDown(){
    this.addEventListener('mousemove',handleRangeUpdate)
}

function rangeMouseUp(){
    this.removeEventListener('mousemove',handleRangeUpdate)
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

function scrubMouseDown(){
    this.addEventListener('mousemove',scrub)
}

function scrubMouseUp(){
    this.removeEventListener('mousemove',scrub)
}

function toggleFullscreen(){
    if(document.fullscreen){
        document.webkitExitFullscreen();
    } else {
        player.webkitRequestFullscreen();
    }
}

/* Event Listeners */
toggle.addEventListener("click",togglePlay);

video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgress);

skipButtons.forEach(button => button.addEventListener("click",skip))

ranges.forEach(slider => {
    slider.addEventListener('mousedown',rangeMouseDown);
    slider.addEventListener('mouseup',rangeMouseUp);
})

progress.addEventListener('mousedown', scrubMouseDown);
progress.addEventListener('mouseup', scrubMouseUp);
progress.addEventListener('click',scrub)

fullscreen.addEventListener('click',toggleFullscreen)

