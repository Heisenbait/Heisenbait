function mostrarInicio(event) {
    if (event) event.preventDefault();
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('info-MSC').style.display = 'none';
    document.querySelector('.header').style.display = 'block';
    window.scrollTo(0, 0);
}

function mostrarMSC(event) {
    if (event) event.preventDefault();
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('info-MSC').style.display = 'block';
    document.querySelector('.header').style.display = 'none';
    window.scrollTo(0, 0);
}

    document.addEventListener('DOMContentLoaded', () => {
            mostrarInicio();
});


    









let audio = new Audio();
let isPlaying = false;

document.querySelectorAll('.track').forEach(track => {
  track.addEventListener('click', () => {
    const src = track.getAttribute('data-src');
    const name = track.querySelector('.title').innerText;
    const image = document.querySelector('.album-cover img').src;

    playSong(src, name, image);
    alert(`Reproduciendo: ${name}`);
  });
});

const songs = [
  {
    src: "archivos/Eazy - The Game, Kanye West.mp3",
    name: "Eazy",
    image: "archivos/Cover of Eazy by The Game, Kanye West.jpg"
  },
  {
    src: "archivos/Master Of Puppets - Metallica.mp3",
    name: "Master Of Puppets",
    image: "archivos/Cover of Master Of Puppets by Metallica.jpg"
  },
  {
    src: "rutadecancion1.mp3",
    name: "Juicy - 2005 Remaster",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion4",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion5",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion6",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion7",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion8",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion9",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion10",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion11",
    image: "archivos/buster_portada.jpg"
  },

  {
    src: "rutadecancion1.mp3",
    name: "cancion12",
    image: "archivos/buster_portada.jpg"
  },
  
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

function playSong(songSrc, songName, songImage) {
  audio.src = songSrc;
  audio.play();
  isPlaying = true;
  updatePlayPauseButton();

  const nameEl = document.getElementById("songName");
  const imageEl = document.getElementById("songImage");

  if (nameEl) nameEl.textContent = songName;
  if (imageEl) imageEl.src = songImage;

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
  if (playPauseButton) {
    playPauseButton.textContent = isPlaying ? '❚❚' : '▶';
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  const song = songs[currentSongIndex];
  playSong(song.src, song.name, song.image);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  const song = songs[currentSongIndex];
  playSong(song.src, song.name, song.image);
}

function playRandomSong() {
  currentSongIndex = Math.floor(Math.random() * songs.length);
  const song = songs[currentSongIndex];
  playSong(song.src, song.name, song.image);
}

document.querySelectorAll('.track').forEach((track, index) => {
  track.addEventListener('click', () => {
    const song = songs[index];
    if (song) {
      currentSongIndex = index;
      playSong(song.src, song.name, song.image);
      alert(`Reproduciendo: ${song.name}`);
    }
  });
});

audio.ontimeupdate = function() {
  const progressEl = document.getElementById('progress');
  if (audio.duration && progressEl) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressEl.style.width = progress + '%';
  }
  updateCurrentTime();
};

audio.onended = function() {
  nextSong();
};

function updateCurrentTime() {
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const duration = audio.duration || 0;
  const current = audio.currentTime;

  const format = (sec) => {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' + s : s}`;
  };

  if (currentTimeEl && totalTimeEl) {
    currentTimeEl.textContent = format(current);
    totalTimeEl.textContent = format(duration);
  }
}

document.querySelector('.progress-bar')?.addEventListener('click', function(event) {
  const width = this.offsetWidth;
  const offset = event.offsetX;
  const time = (offset / width) * audio.duration;
  audio.currentTime = time;
});

  const randomBtn = document.querySelector('.random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', playRandomSong);
  }
});
