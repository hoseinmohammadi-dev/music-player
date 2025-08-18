const content = document.querySelector("#audio-player")
const playImage = document.querySelector("#info-img");
const musicName = document.querySelector("#music-name");
const musicArtist = document.querySelector("#music-artist");

const audio = document.querySelector("#main-audio")
const playBtn = document.querySelector("#play-pause")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const reapet = document.querySelector('#reapet')
const likeBtn = document.querySelector('#like')
const likeBtns = document.querySelectorAll('.like-btn')


const progressBar = document.querySelector("#progress-bar")
const progressDetail = document.querySelector("#progress-detail")

const volumeSlider = document.querySelector("#setting-music input");
const volumeBtn = document.querySelector("#setting-music img");

const allFigures = document.querySelectorAll("#play-list figure, #play-list2 figure, #play-list3 figure , #top-for-your > div > div");



let index = 1;
////mini fix info music start////
window.addEventListener('load', () => {
    loadData(index)
})

function loadData(indexValue) {
    musicName.innerHTML = songArray[indexValue - 1].name;
    musicArtist.innerHTML = songArray[indexValue - 1].artist;
    playImage.src = songArray[indexValue - 1].img;
    audio.src = songArray[indexValue - 1].audio;
}
////mini fix info music end////


//////play pause start///////
playBtn.addEventListener('click', () => {
    const isMusicPaused = content.classList.contains("paused");

    if (isMusicPaused) {
        pauseSong();
    } else {
        playSong();
    }

})

function playSong() {
    content.classList.add("paused");
    playBtn.src = "icon/svgexport-33.svg";
    audio.play();
}
function pauseSong() {
    content.classList.remove("paused");
    playBtn.src = "icon/svgexport-49.svg";
    audio.pause();
}
//////play pause end///////


/////prev and next start////
nextBtn.addEventListener('click', () => {
    nextSong();
})

prevBtn.addEventListener('click', () => {
    prevSong();
})


function nextSong() {
    index++;
    if (index > songArray.length) {
        index = 1;
    } else {
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong() {
    index--;
    if (index <= 0) {
        index = songArray.length;
    } else {
        index = index;
    }
    loadData(index);
    playSong();
}
/////prev and next end////

////// time bar start//////
audio.addEventListener('timeupdate', (e) => {
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;

    let barWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = barWidth + '%';
})


progressDetail.addEventListener('click', (e) => {
    let progressValue = progressDetail.clientWidth;
    let clickedOffsetX = e.offsetX;
    let musicDuration = audio.duration;

    audio.currentTime = (clickedOffsetX / progressValue) * musicDuration;
});
////// time bar end//////


////final time start///
audio.addEventListener('loadeddata', () => {
    let finalTimeData = document.querySelector("#final-time");
    let audioDuration = audio.duration;

    let finalMinutes = Math.floor(audioDuration / 60);
    let finalseconds = Math.floor(audioDuration % 60);
    if (finalseconds < 10) {
        finalseconds = '0' + finalseconds;
    }
    finalTimeData.textContent = finalMinutes + ':' + finalseconds;
})
////final time end///


//////current time start////
audio.addEventListener('timeupdate', () => {
    let currentTimeData = document.querySelector('#duration-time');
    let currentTime = audio.currentTime;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentseconds = Math.floor(currentTime % 60);
    if (currentseconds < 10) {
        currentseconds = '0' + currentseconds
    }

    currentTimeData.textContent = currentMinutes + ':' + currentseconds;
})
//////current time end////


////reapet btn start///

let flag = 1

reapet.addEventListener('click', () => {
    if (flag % 2) {
        reapet.src = 'icon/svgexport-0111.svg'
    } else {
        reapet.src = 'icon/svgexport-31.svg'
    }
    flag++
})

audio.addEventListener('ended', () => {
    if (flag % 2) {
        index++;
        if (index >= songArray.length) {
            index = 0;
        }
        loadData(index);
        playSong();
    } else {
        playBtn.src = 'icon/svgexport-49.svg'

        setTimeout(() => {
            progressBar.style.width = 0 + '%';
        }, 400);
    }
});
////reapet btn end///


////like start ////
likeBtn.addEventListener("click", () => {
    if (likeBtn.dataset.liked === "true") {
        likeBtn.src = "icon/svgexport-36.svg";
        likeBtn.dataset.liked = "false";
    } else {
        likeBtn.src = "icon/svgexport-12.svg";
        likeBtn.dataset.liked = "true";
    }
});
////like end ////

////like2 start ////
likeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.dataset.liked === "true") {
            btn.src = "icon/svgexport-36.svg";
            btn.dataset.liked = "false";
        } else {
            btn.src = "icon/svgexport-12.svg";
            btn.dataset.liked = "true";
        }
    });
});
////like2 end ////

///volumeSlider start////
volumeSlider.addEventListener('input', () => {

    let volumeValue = volumeSlider.value / 100;
    audio.volume = volumeValue;
})
///volumeSlider end////


////play by click start///
allFigures.forEach((fig, i) => {
    fig.addEventListener("click", (e) => {
        if(e.target.classList.contains("like-btn")) return;
        index = i + 1;
        loadData(index);
        playSong();
    });
});
////play by click end///


