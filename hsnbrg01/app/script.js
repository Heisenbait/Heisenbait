let audio = new Audio();
let isPlaying = false;

document.querySelectorAll('.track').forEach(track => {
  track.addEventListener('click', () => {
    const src = track.getAttribute('data-src');
    if (src) {
      audio.src = src;
      audio.play();
      isPlaying = true;
    }
  });
});


function playSong(songSrc, songName, songImage) {
    audio.src = songSrc;
    audio.play();
    document.getElementById('songName').textContent = songName;
    document.getElementById('songImage').src = songImage;
    isPlaying = true;
    updatePlayPauseButton();
    updateSongDuration();
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const playPauseButton = document.querySelector('.control-btn:nth-child(2)');
    if (isPlaying) {
        playPauseButton.textContent = '❚❚';
    } else {
        playPauseButton.textContent = '▶';
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex].src, songs[currentSongIndex].name, songs[currentSongIndex].image);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex].src, songs[currentSongIndex].name, songs[currentSongIndex].image);
}

audio.ontimeupdate = function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress').style.width = progress + '%';
    updateCurrentTime();
};

audio.onended = function() {
    nextSong();
};

function updateCurrentTime() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    document.getElementById('current-time').textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    document.getElementById('total-time').textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
}

document.querySelector('.progress-bar').addEventListener('click', function(event) {
    const progressBarWidth = this.offsetWidth;
    const clickPosition = event.offsetX;
    const newTime = (clickPosition / progressBarWidth) * audio.duration;
    
    audio.currentTime = newTime;
});

function updateSongDuration() {
    audio.onloadedmetadata = function() {
        updateCurrentTime();
    }
}

function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    playSong(randomSong.src, randomSong.name, randomSong.image);
}





function mostrarInicio() {
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('info-MSC').style.display = 'none';
    document.querySelector('.header').style.display = 'block';
    window.scrollTo(0, 0);
}


function mostrarMSC() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('info-MSC').style.display = 'block';
    document.querySelector('.header').style.display = 'none';
    window.scrollTo(0, 0);
}


    document.addEventListener('DOMContentLoaded', () => {
        mostrarInicio();
});






document.querySelectorAll('.track').forEach(track => {
  track.addEventListener('click', () => {
    alert(`Reproduciendo: ${track.querySelector('.title').innerText}`);
  });
});
