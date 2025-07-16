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
      image: "archivos/Cover of Eazy by The Game, Kanye West (1).jpg",
      duration: "3:54"
    },
    {
      src: "archivos/Master Of Puppets - Metallica.mp3",
      name: "Master Of Puppets",
      image: "archivos/Cover of Master Of Puppets by Metallica.jpg",
      duration: "8:35"
    },
    {
      src: "archivos/Juicy - 2005 Remaster - The Notorious B.I.G..mp3",
      name: "Juicy - 2005 Remaster",
      image: "archivos/Cover of Juicy - 2005 Remaster by The Notorious B.I.G..jpg",
      duration: "4:16"
    },
    {
      src: "archivos/Homecoming - Kanye West.mp3",
      name: "Homecoming",
      image: "archivos/Cover of Homecoming by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Everything I Am - Kanye West.mp3",
      name: "Everything I Am",
      image: "archivos/Cover of Everything I Am by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/GONE, GONE _ THANK YOU - Tyler.mp3",
      name: "GONE, GONE _ THANK YOU",
      image: "archivos/Cover of GONE, GONE _ THANK YOU - Tyler.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Time Moves Slow - BADBADNOTGOOD.mp3",
      name: "Time Moves Slow",
      image: "archivos/Cover of Time Moves Slow by BADBADNOTGOOD.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/All Caps - Madvillain.mp3",
      name: "All Caps",
      image: "archivos/Cover of All Caps by Madvillain.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/20191009 I Like Her - Mac DeMarco.mp3",
      name: "20191009 I Like Her",
      image: "archivos/Cover of 20191012 Fooled by Love by Mac DeMarco.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Soundtrack for Your Backseat - sundiver ca.mp3",
      name: "Soundtrack for Your Backseat",
      image: "archivos/Cover of Soundtrack for Your Backseat by sundiver ca.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Devil In A New Dress - Kanye West.mp3",
      name: "Devil In A New Dress",
      image: "archivos/Cover of Devil In A New Dress by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Somethin' Stupid - Frank Sinatra.mp3",
      name: "Somethin' Stupid",
      image: "archivos/Cover of Somethin' Stupid by Frank Sinatra.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Garota De Ipanema - Antônio Carlos Jobim.mp3",
      name: "Garota de Ipanema",
      image: "archivos/Cover of Garota De Ipanema by Antônio Carlos Jobim.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Lover Is a Day - Cuco.mp3",
      name: "Lover Is a Day",
      image: "archivos/Lover Is a Day by Cuco.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Hey Mama - Kanye West.mp3",
      name: "Hey Mama",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Touch The Sky - Kanye West.mp3",
      name: "Touch The Sky",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/On Sight- Kanye West.mp3",
      name: "On Sight",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Bound 2 - Kanye West.mp3",
      name: "Bound 2",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Big Poppa - 2005 Remaster - The Notorious B.I.G..mp3",
      name: "Big Poppa - 2005 Remaster",
      image: "archivos/Cover of Juicy - 2005 Remaster by The Notorious B.I.G..jpg",
      duration: "2:39"
    },
    {
      src: "archivos/You Know How We Do It - Ice Cube.mp3",
      name: "You Know How We Do It",
      image: "archivos/Cover of You Know How We Do It by Ice Cube.jpg",
      duration: "3:52"
    },
    {
      src: "archivos/Like You Do - Joji.mp3",
      name: "Like You Do",
      image: "archivos/Cover of Like You Do by Joji.jpg",
      duration: "4:00"
    },
    {
      src: "archivos/American Boy - Estelle.mp3",
      name: "American Boy",
      image: "archivos/Cover of American Boy by Estelle, Kanye West.jpg",
      duration: "4:44"
    },
    {
      src: "archivos/505 - Arctic Monkeys.mp3",
      name: "505",
      image: "archivos/Cover of 505 by Arctic Monkeys.jpg",
      duration: "4:13"
    },
    {
      src: "archivos/Can't Tell Me Nothing - Kanye West.mp3",
      name: "Can't Tell Me Nothing",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "4:31"
    },
    {
      src: "archivos/Champion - Kanye West.mp3",
      name: "Champion",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "2:47"
    },
    {
      src: "archivos/Flashing Lights - Kanye West.mp3",
      name: "Flashing Lights",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:57"
    },
    {
      src: "archivos/Violent Crimes - Kanye West.mp3",
      name: "Violent Crimes",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "3:35"
    },
    {
      src: "archivos/Small Worlds - Mac Miller.mp3",
      name: "Small Worlds",
      image: "archivos/Cover of Small Worlds by Mac Miller.jpg",
      duration: "4:31"
    },
    {
      src: "archivos/I Wonder - Kanye West.mp3",
      name: "I Wonder",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "4:03"
    },
    {
      src: "archivos/Rhymes Like Dimes - MF DOOM.mp3",
      name: "Rhymes Like Dimes",
      image: "archivos/Cover of Gas Drawls by MF DOOM.jpg",
      duration: "4:18"
    },
    {
      src: "archivos/Rapp Snitch Knishes - MF DOOM.mp3",
      name: "Rapp Snitch Knishes",
      image: "archivos/Cover of One Beer by MF DOOM.jpg",
      duration: "2:52"
    },
    {
      src: "archivos/Runaway - Kanye West.mp3",
      name: "Runaway",
      image: "archivos/Cover of Runaway by Kanye West, Pusha T.jpg",
      duration: "9:07"
    },
    {
      src: "archivos/One Beer - MF DOOM.mp3",
      name: "One Beer",
      image: "archivos/Cover of One Beer by MF DOOM.jpg",
      duration: "4:18"
    },
    {
      src: "archivos/PRIDE. - Kendrick Lamar.mp3",
      name: "PRIDE.",
      image: "archivos/Cover of PRIDE. by Kendrick Lamar.jpg",
      duration: "4:35"
    },
    {
      src: "archivos/Ghost Town - Kanye West.mp3",
      name: "Ghost Town",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "4:31"
    },
    {
      src: "archivos/Gas Drawls - MF DOOM.mp3",
      name: "Gas Drawls",
      image: "archivos/Cover of Gas Drawls by MF DOOM.jpg",
      duration: "3:43"
    },
    {
      src: "archivos/20191012 Fooled By Love - Mac DeMarco.mp3",
      name: "20191012 Fooled By Love",
      image: "archivos/Cover of 20191012 Fooled By Love by Mac DeMarco.jpg",
      duration: "3:17"
    },
    {
      src: "archivos/Moonlight on the River - Mac DeMarco.mp3",
      name: "Moonlight on the River",
      image: "archivos/Cover of For the First Time by Mac DeMarco.jpg",
      duration: "7:02"
    },
    {
      src: "archivos/For the First Time - Mac DeMarco.mp3",
      name: "For the First Time",
      image: "archivos/Cover of For the First Time by Mac DeMarco.jpg",
      duration: "3:02"
    },
    {
      src: "archivos/My Kind of Woman - Mac DeMarco.mp3",
      name: "My Kind of Woman",
      image: "archivos/Cover of My Kind of Woman by Mac DeMarco.jpg",
      duration: "3:10"
    },
    {
      src: "archivos/Amtrak - Los Retros.mp3",
      name: "Amtrak",
      image: "archivos/Cover of Amtrak by Los Retros.jpg",
      duration: "2:56"
    },
    {
      src: "archivos/サマー・サンバ - Lisa Ono.mp3",
      name: "サマー・サンバ",
      image: "archivos/Cover of サマー・サンバ by Lisa Ono.jpg",
      duration: "2:14"
    },
    {
      src: "archivos/Garota de Ipanema - 2006 Version - Lisa Ono.mp3",
      name: "Garota de Ipanema",
      image: "archivos/Cover of Garota de Ipanema - 2006 Version by Lisa Ono.jpg",
      duration: "4:39"
    },
    {
      src: "archivos/Friends - Los Retros.mp3",
      name: "Friends",
      image: "archivos/Cover of Friends by Los Retros.jpg",
      duration: "2:39"
    },
    {
      src: "archivos/Someone To Spend Time With - Los Retros.mp3",
      name: "Someone To Spend Time With",
      image: "archivos/Cover of Someone To Spend Time With by Los Retros.jpg",
      duration: "2:53"
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

  function createTrackList() {
    trackListEl.innerHTML = '';

    songs.forEach((song, index) => {
      const trackEl = document.createElement('div');
      trackEl.className = 'track';
      trackEl.dataset.index = index;
      trackEl.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="title">${song.name}</div>
        <span class="time">${song.duration || '0:00'}</span> <!-- Usa duración pre-generada -->
      `;
      trackEl.addEventListener('click', () => {
        currentSongIndex = index;
        playSong(song);
      });
      trackListEl.appendChild(trackEl);
    });
  }

function initPlayer() {
    if (audioInitialized) return;
    audioInitialized = true;
    songs.forEach(song => {
      const img = new Image();
      img.src = song.image;
    });
    createTrackList();
    playPauseBtn.addEventListener('click', togglePlayPause);
    randomBtn.addEventListener('click', playRandomSong);
  }

  function playSong(song) {
    const img = new Image();
    img.src = song.image;
    img.onload = () => {
      songImageEl.src = song.image;
      songNameEl.textContent = song.name;
      audio.src = song.src;
      audio.play()
        .then(() => {
          isPlaying = true;
          updatePlayPauseButton();
        })
        .catch(err => console.error("Error al reproducir:", err));
    };
    img.onerror = () => {
      console.warn("Error al cargar imagen:", song.image);
      songNameEl.textContent = song.name;
      audio.src = song.src;
      audio.play()
        .then(() => {
          isPlaying = true;
          updatePlayPauseButton();
        })
        .catch(err => console.error("Error al reproducir:", err));
    };
  }

  function updatePlayPauseButton() {
    playPauseBtn.textContent = isPlaying ? '❚❚' : '▶';
  }

  function togglePlayPause() {
    if (!audio.src || (audio.paused && audio.currentTime === 0)) {
      currentSongIndex = 0;
      playSong(songs[currentSongIndex]);
    } else {
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

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }

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

  window.nextSong = nextSong;
  window.prevSong = prevSong;
  window.togglePlayPause = togglePlayPause;
});
