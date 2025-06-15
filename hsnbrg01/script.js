document.addEventListener('DOMContentLoaded', () => {

  const inicioBtn = document.getElementById('inicioBtn');
  const mscBtn = document.getElementById('mscBtn');
  const inicio = document.getElementById('inicio');
  const infoMSC = document.getElementById('info-MSC');
  const header = document.querySelector('.header');

  mostrarInicio();

  inicioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarInicio();
  });

  mscBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarMSC();
  });

  function mostrarInicio() {
    inicio.style.display = 'block';
    infoMSC.style.display = 'none';
    header.style.display = 'block';
    window.scrollTo(0, 0);
  }

  function mostrarMSC() {
    inicio.style.display = 'none';
    infoMSC.style.display = 'block';
    header.style.display = 'none';
    window.scrollTo(0, 0);
    initPlayer();
  }

  const songs = [
    {
      src: "archivos/Eazy - The Game, Kanye West.mp3",
      name: "Eazy",
      image: "archivos/Cover of Eazy by The Game, Kanye West (1).jpg"
    },
    {
      src: "archivos/Master Of Puppets - Metallica.mp3",
      name: "Master Of Puppets",
      image: "archivos/Cover of Master Of Puppets by Metallica.jpg"
    },
    {
      src: "archivos/Juicy - 2005 Remaster - The Notorious B.I.G..mp3",
      name: "Juicy - 2005 Remaster",
      image: "archivos/Cover of Juicy - 2005 Remaster by The Notorious B.I.G..jpg"
    }
  ];

  const audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
  let audioInitialized = false;

  const songNameEl = document.getElementById('songName');
  const songImageEl = document.getElementById('songImage');
  const progressEl = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const trackListEl = document.querySelector('.track-list');
  const randomBtn = document.querySelector('.random-btn');

  function initPlayer() {
    if (audioInitialized) return;
    audioInitialized = true;

    songs.forEach((song, index) => {
      const trackEl = document.createElement('div');
      trackEl.className = 'track';
      trackEl.dataset.index = index;
      trackEl.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="title">${song.name}</div>
        <span class="time">2:00</span>
      `;
      trackEl.addEventListener('click', () => {
        currentSongIndex = index;
        playSong(song);
      });
      trackListEl.appendChild(trackEl);
    });

    playPauseBtn.addEventListener('click', togglePlayPause);
    randomBtn.addEventListener('click', playRandomSong);
  }

  function playSong(song) {
    audio.src = song.src;
    audio.play()
      .then(() => {
        isPlaying = true;
        songNameEl.textContent = song.name;
        songImageEl.src = song.image;
        updatePlayPauseButton();
      })
      .catch(error => console.error("Error al reproducir:", error));
  }

  function togglePlayPause() {
  if (!audio.src || (audio.paused && audio.currentTime === 0)) {
    currentSongIndex = 0;
    playSong(songs[currentSongIndex]);
  } 
  else {
    isPlaying ? audio.pause() : audio.play();
    isPlaying = !isPlaying;
  }
  updatePlayPauseButton();
}

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
  }

  function playRandomSong() {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playSong(songs[currentSongIndex]);
  }

  // Barra de progreso
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressEl.style.width = `${progress}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', nextSong);

  document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const width = e.currentTarget.offsetWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }

  // Funciones globales
  window.nextSong = nextSong;
  window.prevSong = prevSong;
  window.togglePlayPause = togglePlayPause;
});

