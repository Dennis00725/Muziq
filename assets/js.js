const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector(".prev"),
  nextBtn = wrapper.querySelector(".next"),
  mainAudio = wrapper.querySelector(".main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar"); //making elements a part of UI to interact

let musicIndex = Math.floor(Math.random() * allMusic.length + 1); // round down to 1 coz of index0, more humanly manner
isMusicPaused = true; // music is initially paused
window.addEventListener("load", () => {
  //after loading the entire page
  loadMusic(musicIndex); // starts music track
});
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name; //retrieves the track name and subtracting the friendliness
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `/assets/images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `/assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}
function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add("rotate");
  playPauseBtn.innerHTML = `<i class="bx bx-pause"></i>`;
  mainAudio.play();
}
function pauseMusic() {
  wrapper.classList.remove("paused");
  musicImg.classList.remove("rotate");
  playPauseBtn.innerHTML = `<i class="bx bx-play" ></i>`;
  mainAudio.pause();
}
function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex); // lly to if statement
  loadMusic(musicIndex);
  playMusic(); // to loop back circularly to the last track if in the 1st
}
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic(); //vice-versa
}
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused"); // checks music is playing or paused
  isMusicPlay ? pauseMusic() : playMusic();
});
prevBtn.addEventListener("click", () => {
  prevMusic();
});
nextBtn.addEventListener("click", () => {
  nextMusic();
});
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = wrapper.querySelector(".current-time");
  musicDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}.${currentSec}`;
}); // updating progress-bar

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.clickedOffsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});
mainAudio.addEventListener("ended", () => {
  nextMusic();
});
