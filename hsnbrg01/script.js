document.addEventListener('DOMContentLoaded', () => {
  const inicioBtn = document.getElementById('inicioBtn');
  const mscBtn = document.getElementById('mscBtn');

  const inicio = document.getElementById('inicio');
  const infoMSC = document.getElementById('info-MSC');
  const header = document.querySelector('.header');

  // Mostrar inicio al cargar
  mostrarInicio();

  // Botones navegación
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
  }

  // Reproductor
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
    // Repite con tus otras canciones
  ];

  const audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;

  const songNameEl = document.getElementById('songName');
  const songImageEl = document.getElementById('songImage');
  const progressEl = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const trackListEl = document.getElementById('trackList');

  function playSong(song) {
    audio.src = song.src;
    audio.play();
    isPlaying = true;
    songNameEl.textContent = song.name;
    songImageEl.src = song.image;
    updatePlayPauseButton();
  }

  function updatePlayPauseButton() {
    playPauseBtn.textContent = isPlaying ? '❚❚' : '▶';
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

  // Tiempo y progreso
  audio.ontimeupdate = () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressEl.style.width = `${progress}%`;

      currentTimeEl.textContent = formatTime(audio.currentTime);
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  };

  audio.onended = () => {
    nextSong();
  };

  function formatTime(sec) {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' + s : s}`;
  }

  document.querySelector('.progress-bar')?.addEventListener('click', function (event) {
    const width = this.offsetWidth;
    const offset = event.offsetX;
    const time = (offset / width) * audio.duration;
    audio.currentTime = time;
  });

  // Crear lista de canciones dinámicamente
  songs.forEach((song, index) => {
    const trackEl = document.createElement('div');
    trackEl.classList.add('track');
    trackEl.setAttribute('data-index', index);
    trackEl.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="title">${song.name}</div>
      <span class="time">2 hours ago</span>
    `;
    trackEl.addEventListener('click', () => {
      currentSongIndex = index;
      playSong(song);
    });
    trackListEl.appendChild(trackEl);
  });

  // Exponer funciones globales
  window.togglePlayPause = togglePlayPause;
  window.nextSong = nextSong;
  window.prevSong = prevSong;
  window.playRandomSong = playRandomSong;
});

  const randomBtn = document.querySelector('.random-btn');
  if (randomBtn) {
    randomBtn.addEventListener('click', playRandomSong);
  }
});
