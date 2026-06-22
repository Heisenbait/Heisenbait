document.addEventListener('DOMContentLoaded', () => {

  const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mostrarBusqueda();
});

function mostrarBusqueda() {
  if (infoMSC.style.display !== 'block') {
    console.log("La búsqueda solo está disponible en MSCQMG");
    return;
  }

  const navbar = document.querySelector('.navbar');
  const searchBtn = document.getElementById('searchBtn');
  
  if (navbar.classList.contains('search-active')) {
    navbar.classList.remove('search-active');
    searchBtn.style.opacity = '1';
    searchBtn.style.pointerEvents = 'auto';
    searchBtn.style.transform = 'scale(1)';
    
    const existingInput = document.querySelector('.search-input');
    if (existingInput) {
      existingInput.remove();
    }
    
    restoreTrackList();
  } else {
    navbar.classList.add('search-active');
    
    if (!document.querySelector('.search-input')) {
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.className = 'search-input';
      searchInput.placeholder = 'Buscar...';
      navbar.appendChild(searchInput);
      
      setTimeout(() => {
        searchInput.focus();
      }, 100);
      
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const searchTerm = searchInput.value.trim().toLowerCase();
          if (searchTerm) {
            filterTracks(searchTerm);
          }
        }
        
        if (e.key === 'Escape') {
          mostrarBusqueda();
        }
      });
      
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        if (searchTerm === '') {
          restoreTrackList();
        } else {
          filterTracks(searchTerm);
        }
      });
    }
  }
}

    setTimeout(() => {
      document.addEventListener('click', cerrarBusquedaAlTocarFuera);
      document.addEventListener('touchstart', cerrarBusquedaAlTocarFuera);
    }, 100);

function cerrarBusquedaAlTocarFuera(e) {
  const navbar = document.querySelector('.navbar');
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.getElementById('searchBtn');
  
  const clickedLink = e.target.closest('a');
  if (clickedLink && (clickedLink.id === 'inicioBtn' || clickedLink.id === 'mscBtn' || clickedLink.id === 'icfrdBtn')) {
    return;
  }
  
  if (!navbar.contains(e.target) && e.target !== searchBtn && !searchBtn.contains(e.target)) {
    cerrarBusqueda();
  }
}

function cerrarBusqueda() {
  const navbar = document.querySelector('.navbar');
  const searchInput = document.querySelector('.search-input');
  
  navbar.classList.remove('search-active');
  
  document.removeEventListener('click', cerrarBusquedaAlTocarFuera);
  document.removeEventListener('touchstart', cerrarBusquedaAlTocarFuera);
  
  if (searchInput) {
    searchInput.remove();
  }
  
  restoreTrackList();
}

let originalTracks = [];

function filterTracks(searchTerm) {
  const filteredSongs = songs.filter(song => 
    song.name.toLowerCase().includes(searchTerm) || 
    song.text.toLowerCase().includes(searchTerm)
  );
  
  updateTrackList(filteredSongs);
}

function updateTrackList(filteredSongs) {
  trackListEl.innerHTML = '';

  if (filteredSongs.length === 0) {
    trackListEl.innerHTML = '<div class="no-results">No se encontraron canciones</div>';
    return;
  }

  filteredSongs.forEach((song, index) => {
    const trackEl = document.createElement('div');
    trackEl.className = 'track';
    trackEl.dataset.index = songs.findIndex(s => s.src === song.src);
    trackEl.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="title-container">
        <div class="title">${song.name}</div>
        <div class="song-text">${song.text}</div>
      </div>
      <span class="time">${song.duration || '0:00'}</span>
    `;

    trackEl.addEventListener('click', () => {
      const originalIndex = songs.findIndex(s => s.src === song.src);
      currentSongIndex = originalIndex;
      playSong(song);
    });
    trackListEl.appendChild(trackEl);
  });
}

function restoreTrackList() {
  createTrackList();
}








  
  const inicioBtn = document.getElementById('inicioBtn');
  const mscBtn = document.getElementById('mscBtn');
  const inicio = document.getElementById('inicio');
  const infoMSC = document.getElementById('info-MSC');
  const icfrdBtn = document.getElementById('icfrdBtn');
  const infoICFRD = document.getElementById('info-ICFRD');
  const header = document.querySelector('.header');
  const volumeSlider = document.getElementById('volumeSlider');

   volumeSlider.addEventListener('input', () => {
     audio.volume = volumeSlider.value;
  });

  const albumImage = document.querySelector('.album-cover img');

albumImage.addEventListener('mousemove', (e) => {
  const { offsetX, offsetY, target } = e;
  const { offsetWidth, offsetHeight } = target;
  const rotateX = ((offsetY / offsetHeight) - 0.5) * 10;
  const rotateY = ((offsetX / offsetWidth) - 0.5) * 10;

albumImage.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

albumImage.addEventListener('mouseleave', () => {
  albumImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

  mostrarInicio();

  inicioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarInicio();
  });

  mscBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarMSC();
  });

  icfrdBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarICFRD();
  });


   function mostrarInicio() {

   if (document.querySelector('.navbar').classList.contains('search-active')) {
     cerrarBusqueda();
  }
     
    inicio.style.display = 'block';
    infoMSC.style.display = 'none';
    infoICFRD.style.display = 'none';
    header.style.display = 'block';
    window.scrollTo(0, 0);

   const searchBtn = document.getElementById('searchBtn');
    searchBtn.style.opacity = '0.5';
    searchBtn.style.pointerEvents = 'none';
  }

   function mostrarMSC() {

   if (document.querySelector('.navbar').classList.contains('search-active')) {
     cerrarBusqueda();
  }
     
    inicio.style.display = 'none';
    infoMSC.style.display = 'block';
    infoICFRD.style.display = 'none';
    header.style.display = 'none';
    window.scrollTo(0, 0);
    initPlayer();
    
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.style.opacity = '1';
    searchBtn.style.pointerEvents = 'auto';
}

   function mostrarICFRD() {

   if (document.querySelector('.navbar').classList.contains('search-active')) {
     cerrarBusqueda();
  }
     
    inicio.style.display = 'none';
    infoMSC.style.display = 'none';
    infoICFRD.style.display = 'block';
    header.style.display = 'none';
    window.scrollTo(0, 0);

   const searchBtn = document.getElementById('searchBtn');
    searchBtn.style.opacity = '0.5';
    searchBtn.style.pointerEvents = 'none';
}

  function toggleShuffle() {
    isShuffleOn = !isShuffleOn;
    randomBtn.classList.toggle('active', isShuffleOn);

    if (isShuffleOn) {
      generateShuffleQueue();
      playRandomSong();
    }
  }

  function generateShuffleQueue() {
  shuffleQueue = songs.map((_, index) => index);

  for (let i = shuffleQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleQueue[i], shuffleQueue[j]] = [shuffleQueue[j], shuffleQueue[i]];
  }

  shuffleIndex = 0;
  }

  const songs = [
    {
      src: "archivos/How Deep Is Your Love - Bee Gees.mp3",
      name: "How Deep Is Your Love",
      image: "archivos/Cover of How Deep Is Your Love by Bee Gees.jpg",
      duration: "3:59",
      text: "Bee Gees"
    },
    {
      src: "archivos/Street Lights - Kanye West, Ty Dolla $ign (ft. Freddie Gibbs)  B.B.P.B..mp3",
      name: "Street Lights (ft. Freddie Gibbs)",
      image: "archivos/BBPB cover.png",
      duration: "4:55",
      text: "Kanye West, Ty Dolla $ign, Freddie Gibbs"
    },
    {
      src: "archivos/Amazing - Kanye West & Ant Clemons.mp3",
      name: "Amazing",
      image: "archivos/BBPB cover.png",
      duration: "3:14",
      text: "Kanye West, Ant Clemons"
    },
    {
      src: "archivos/When I See It - Kanye West.mp3",
      name: "When I See It",
      image: "archivos/Cover of When I See It.jpg",
      duration: "1:45",
      text: "Kanye West"
    },
    {
      src: "archivos/MY HOOD - Kanye West.mp3",
      name: "MY HOOD",
      image: "archivos/Bully-edit.jpeg",
      duration: "2:36",
      text: "Kanye West"
    },
    {
      src: "archivos/Passanger - Kanye West.mp3",
      name: "Passanger",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:45",
      text: "Kanye West"
    },
    {
      src: "archivos/Building - Kanye West.mp3",
      name: "Building",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:08",
      text: "Kanye West, JAY-Z"
    },
    {
      src: "archivos/In God's Country - Kanye West.mp3",
      name: "In God's Country",
      image: "archivos/Cover of Donda with childs.jpg",
      duration: "3:05",
      text: "Kanye West, Justin Bieber"
    },
    {
      src: "archivos/BELIEVER - ¥$, Kanye West & Ty Dolla $ign.mp3",
      name: "BELIEVER",
      image: "archivos/BBPB cover.png",
      duration: "3:13",
      text: "¥$, Kanye West & Ty Dolla $ign"
    },
    {
      src: "archivos/Kanye West - GUN TO MY HEAD V3.mp3",
      name: "GUN TO MY HEAD",
      image: "archivos/BBPB cover.png",
      duration: "5:40",
      text: "Kanye West, Ty Dolla $ign, Kid Cudi"
    },
    {
      src: "archivos/Kanye West, Ty Dolla $ign- After Lyfe.mp3",
      name: "AFTER LIFE",
      image: "archivos/BBPB cover.png",
      duration: "2:48",
      text: "Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Kanye West, Ty Dolla $ign - MY SOUL.mp3",
      name: "FIGHTING FIRES",
      image: "archivos/BBPB cover.png",
      duration: "5:10",
      text: "Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Playboi Carti, A$AP Nast - Take A Soul",
      name: "Take A Soul",
      image: "archivos/carti_photo.jpg",
      duration: "2:59",
      text: "Playboi Carti, A$AP Nast"
    },
    {
      src: "archivos/PUPPET - Tyler.mp3",
      name: "PUPPET",
      image: "archivos/Cover of GONE GONE THANK YOU by Tyler.jpg",
      duration: "2:59",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/Jukebox Joints - A$AP Rocky.mp3",
      name: "Jukebox Joints",
      image: "archivos/Cover of Jukebox Joints by A$AP Rocky, Joe Fox, Kanye West.jpg",
      duration: "5:23",
      text: "A$AP Rocky, Joe Fox, Kanye West"
    },
    {
      src: "archivos/Heaven and Hell - Kanye West.mp3",
      name: "Heaven and Hell",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "2:25",
      text: "Kanye West"
    },
    {
      src: "archivos/Lord I Need You - Kanye West.mp3",
      name: "Lord I Need You",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "2:42",
      text: "Kanye West"
    },
    {
      src: "archivos/Come to Life - Kanye West.mp3",
      name: "Come to Life",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "5:10",
      text: "Kanye West"
    },
    {
      src: "archivos/Can't Stop - Red Hot Chili Peppers.mp3",
      name: "Can't Stop",
      image: "archivos/Cover of Can't Stop by Red Hot Chili Peppers.jpg",
      duration: "4:29",
      text: "Red Hot Chili Peppers"
    },
    {
      src: "archivos/COUSINS - Ye.mp3",
      name: "COUSINS",
      image: "archivos/Cover of COUSINS by Ye.jpg",
      duration: "2:31",
      text: "Ye"
    },
    {
      src: "archivos/Estamos Bien - Bad Bunny.mp3",
      name: "Estamos Bien",
      image: "archivos/Cover of Estamos Bien by Bad Bunny.jpg",
      duration: "3:28",
      text: "Bad Bunny"
    },
    {
      src: "archivos/Street Lights - Kanye West.mp3",
      name: "Street Lights",
      image: "archivos/Cover of Paranoid by Kanye West, Mr Hudson.jpg",
      duration: "3:09",
      text: "Kanye West"
    },
    {
      src: "archivos/Diamonds From Sierra Leone - Remix - Kanye West.mp3",
      name: "Diamonds From Sierra Leone - Remix",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:53",
      text: "Kanye West, JAY-Z"
    },
    {
      src: "archivos/Crack Music - Kanye West.mp3",
      name: "Crack Music",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "4:30",
      text: "Kanye West, The Game"
    },
    {
      src: "archivos/Remote Control - Kanye West.mp3",
      name: "Remote Control",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "3:18",
      text: "Kanye West"
    },
    {
      src: "archivos/I Thought About Killing You - Kanye West.mp3",
      name: "I Thought About Killing You",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "4:34",
      text: "Kanye West"
    },
    {
      src: "archivos/Hold My Liquor - Kanye West.mp3",
      name: "Hold My Liquor",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "5:26",
      text: "Kanye West"
    },
    {
      src: "archivos/All Day - Kanye West.mp3",
      name: "All Day",
      image: "archivos/Cover of All Day by Kanye West.jpg",
      duration: "5:10",
      text: "Kanye West, Paul McCartney"
    },
    {
      src: "archivos/Love, Love, Love - Donny Hathaway.mp3",
      name: "Love, Love, Love",
      image: "archivos/Cover of Love, Love, Love by Donny Hathaway.jpg",
      duration: "3:24",
      text: "Donny Hathaway"
    },
    {
      src: "archivos/Rock with You - Single Version - Michael Jackson.mp3",
      name: "Rock with You",
      image: "archivos/Cover of Rock with You - Single Version by Michael Jackson.jpg",
      duration: "3:40",
      text: "Michael Jackson"
    },
    {
      src: "archivos/Accordion - Madvillain.mp3",
      name: "Accordion",
      image: "archivos/Cover of Accordion by MF DOOM.jpg",
      duration: "1:58",
      text: "Madvillain, MF DOOM"
    },
    {
      src: "archivos/Jail - Kanye West.mp3",
      name: "Jail",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "4:57",
      text: "Kanye West, JAY-Z"
    },
    {
      src: "archivos/Believe What I Say - Kanye West.mp3",
      name: "Believe What I Say",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "4:02",
      text: "Kanye West"
    },
    {
      src: "archivos/Saint Pablo - Kanye West.mp3",
      name: "Saint Pablo",
      image: "archivos/Cover of Father Stretch My Hands Pt. 1 by Kanye West.jpg",
      duration: "6:12",
      text: "Kanye West"
    },
    {
      src: "archivos/Something - Remastered 2009 - The Beatles.mp3",
      name: "Something - Remastered 2009",
      image: "archivos/Cover of Something - Remastered 2009 by The Beatles.jpg",
      duration: "3:03",
      text: "The Beatles"
    },
    {
      src: "archivos/Gone - Kanye West.mp3",
      name: "Gone",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "5:33",
      text: "Kanye West"
    },
    {
      src: "archivos/Breathe In Breathe Out - Kanye West.mp3",
      name: "Breathe In Breathe Out",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "4:06",
      text: "Kanye West"
    },
    {
      src: "archivos/Hurricane - Kanye West.mp3", 
      name: "Hurricane",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "4:03",
      text: "Kanye West, The Weeknd"
    },
    {
      src: "archivos/Everything We Need - Kanye West.mp3",
      name: "Everything We Need",
      image: "archivos/Cover of God Is by Kanye West.jpg",
      duration: "1:56",
      text: "Kanye West, Ty Dolla $ign, Ant Clemons"
    },
    {
      src: "archivos/On God - Kanye West.mp3",
      name: "On God",
      image: "archivos/Cover of God Is by Kanye West.jpg",
      duration: "2:16",
      text: "Kanye West"
    },
    {
      src: "archivos/RIVER - ¥$.mp3",
      name: "RIVER",
      image: "archivos/Cover of PROMOTION by ¥$, Kanye West, Ty Dolla $ign.jpg",
      duration: "4:07",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Waves - Kanye West.mp3",
      name: "Waves",
      image: "archivos/Cover of Father Stretch My Hands Pt. 1 by Kanye West.jpg",
      duration: "3:23",
      text: "Kanye West"
    },
    {
      src: "archivos/Wouldn't Leave - Kanye West.mp3",
      name: "Wouldn't Leave",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "3:25",
      text: "Kanye West"
    },
    {
      src: "archivos/NO HAGO TRAP - Milo j.mp3",
      name: "NO HAGO TRAP",
      image: "archivos/NO HAGO TRAP by Milo j.jpg",
      duration: "2:39",
      text: "Milo j"
    },
    {
      src: "archivos/LIFESTYLE - ¥$.mp3",
      name: "LIFESTYLE",
      image: "archivos/Cover of PROMOTION by ¥$, Kanye West, Ty Dolla $ign.jpg",
      duration: "3:23",
      text: "¥$, Ty Dolla $ign, Kanye West"
    },
    {
      src: "archivos/F L Y - Spectrum.mp3",
      name: "F L Y",
      image: "archivos/Cover of F L Y by Spectrum.jpg",
      duration: "3:30",
      text: "Spectrum"
    },
    {
      src: "archivos/Late - Kanye West.mp3",
      name: "Late",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:50",
      text: "Kanye West"
    },
    {
      src: "archivos/Wheels Fall Off (feat. Ye) - Ty Dolla $ign.mp3",
      name: "Wheels Fall Off (feat. Ye)",
      image: "archivos/Cover of Wheels Fall Off (feat. Ye) by Ty Dolla $ign, Yé.jpg",
      duration: "2:01",
      text: "¥$, Ty Dolla $ign, Kanye West"
    },
    {
      src: "archivos/TALKING - ¥$.mp3",
      name: "TALKING",
      image: "archivos/Cover of PAPERWORK by Kanye West, Ty Dolla $ign.jpg",
      duration: "3:05",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Closed On Sunday - Kanye West.mp3",
      name: "Closed On Sunday",
      image: "archivos/Cover of God Is by Kanye West.jpg",
      duration: "2:31",
      text: "Kanye West"
    },
    {
      src: "archivos/No Mistakes - Kanye West.mp3",
      name: "No Mistakes",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "2:03",
      text: "Kanye West"
    },
    {
      src: "archivos/Drop It Like It's Hot - Snoop Dogg.mp3",
      name: "Drop It Like It's Hot",
      image: "archivos/Cover of Drop It Like It's Hot by Snoop Dogg, Pharrell Williams.jpg",
      duration: "4:26",
      text: "Snoop Dogg, Pharrell Williams"
    },
    {
      src: "archivos/PROMOTION - ¥$.mp3",
      name: "PROMOTION",
      image: "archivos/Cover of PROMOTION by ¥$, Kanye West, Ty Dolla $ign.jpg",
      duration: "2:38",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Blood On The Leaves - Kanye West.mp3",
      name: "Blood On The Leaves",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "5:59",
      text: "Kanye West"
    },
    {
      src: "archivos/POWER - Kanye West.mp3",
      name: "POWER",
      image: "archivos/Cover of Runaway by Kanye West, Pusha T.jpg",
      duration: "4:52",
      text: "Kanye West"
    },
    {
      src: "archivos/All Mine - Kanye West.mp3",
      name: "All Mine",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "2:25",
      text: "Kanye West"
    },
    {
      src: "archivos/Why I Love You - JAY-Z.mp3",
      name: "Why I Love You",
      image: "archivos/Cover of Why I Love You by JAY-Z, Kanye West.jpg",
      duration: "3:20",
      text: "Kanye West, JAY-Z"
    },
    {
      src: "archivos/Good Life - Kanye West.mp3",
      name: "Good Life",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:27",
      text: "Kanye West, Pusha T"
    },
    {
      src: "archivos/School Spirit - Kanye West.mp3",
      name: "School Spirit",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "3:02",
      text: "Kanye West"
    },
    {
      src: "archivos/Spaceship - Kanye West.mp3",
      name: "Spaceship",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "5:24",
      text: "Kanye West"
    },
    {
      src: "archivos/Follow God - Kanye West.mp3",
      name: "Follow God",
      image: "archivos/Cover of God Is by Kanye West.jpg",
      duration: "1:44",
      text: "Kanye West"
    },
    {
      src: "archivos/Black Skinhead - Kanye West.mp3",
      name: "Black Skinhead",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "3:08",
      text: "Kanye West"
    },
    {
      src: "archivos/IFHY (feat. Pharrell) - Tyler.mp3",
      name: "IFHY",
      image: "archivos/Cover of IFHY (feat. Pharrell) by Tyler.jpg",
      duration: "5:19",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/We Don't Care - Kanye West.mp3",
      name: "We Don't Care",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "3:59",
      text: "Kanye West"
    },
    {
      src: "archivos/Hypnotize - 2014 Remaster - The Notorious B.I.G..mp3",
      name: "Hypnotize",
      image: "archivos/Cover of Hypnotize - 2014 Remaster by The Notorious B.I.G..jpg",
      duration: "3:49",
      text: "The Notorious B.I.G."
    },
    {
      src: "archivos/Creep - Radiohead.mp3",
      name: "Creep",
      image: "archivos/Cover of Creep by Radiohead.jpg",
      duration: "3:58",
      text: "Radiohead"
    },
    {
      src: "archivos/Last Day On Earth - Los Retros.mp3",
      name: "Last Day On Earth",
      image: "archivos/Cover of Last Day On Earth by Los Retros.jpg",
      duration: "3:42",
      text: "Los Retros"
    },
    {
      src: "archivos/Borderline - Tame Impala.mp3",
      name: "Borderline",
      image: "archivos/Cover of Borderline by Tame Impala.jpg",
      duration: "3:57",
      text: "Tame Impala"
    },
    {
      src: "archivos/Celebration - Kanye West.mp3",
      name: "Celebration",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:18",
      text: "Kanye West"
    },
    {
      src: "archivos/Addiction - Kanye West.mp3",
      name: "Addiction",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "4:27",
      text: "Kanye West"
    },
    {
      src: "archivos/Heard 'Em Say - Kanye West.mp3",
      name: "Heard 'Em Say",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:23",
      text: "Kanye West, Adam Levine"
    },
    {
      src: "archivos/California Love - Original Version - 2Pac.mp3",
      name: "California Love",
      image: "archivos/Cover of California Love - Original Version by 2Pac, Roger, Dr. Dre.jpg",
      duration: "4:44",
      text: "2Pac"
    },
    {
      src: "archivos/No. 1 Party Anthem - Arctic Monkeys.mp3",
      name: "No. 1 Party Anthem",
      image: "archivos/Cover of No. 1 Party Anthem by Arctic Monkeys.jpg",
      duration: "4:03",
      text: "Artic Monkeys"
    },
    {
      src: "archivos/Imagine - Remastered 2010 - John Lennon.mp3",
      name: "Imagine",
      image: "archivos/Cover of Imagine - Remastered 2010 by John Lennon.jpg",
      duration: "3:07",
      text: "John Lennon"
    },
    {
      src: "archivos/Beanie - Chezile.mp3",
      name: "Beanie",
      image: "archivos/Cover of Beanie by Chezile.jpg",
      duration: "2:12",
      text: "Chezile"
    },
    {
      src: "archivos/Noid - Tyler.mp3",
      name: "Noid",
      image: "archivos/Cover of St. Chroma (feat. Daniel Caesar) by Tyler.jpg",
      duration: "4:44",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/St. Chroma (feat. Daniel Caesar) - Tyler.mp3",
      name: "St. Chroma",
      image: "archivos/Cover of St. Chroma (feat. Daniel Caesar) by Tyler.jpg",
      duration: "3:17",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/Slow Jamz - Twista.mp3",
      name: "Slow Jamz",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "3:32",
      text: "Kanye West, Jamie Foxx"
    },
    {
      src: "archivos/Roses - Kanye West.mp3",
      name: "Roses",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "4:05",
      text: "Kanye West"
    },
    {
      src: "archivos/1 Thing - Amerie.mp3",
      name: "1 Thing",
      image: "archivos/Cover of 1 Thing by Amerie.jpg",
      duration: "3:58",
      text: "Amerie"
    },
    {
      src: "archivos/We Major - Kanye West.mp3",
      name: "We Major",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "7:28",
      text: "We Major"
    },
    {
      src: "archivos/4_44 - JAY-Z.mp3",
      name: "4:44",
      image: "archivos/Cover of 4_44 by JAY-Z.jpg",
      duration: "4:44",
      text: "JAY-Z"
    },
    {
      src: "archivos/SMUCKERS (feat. Lil Wayne & Kanye West) - Tyler.mp3",
      name: "SMUCKERS",
      image: "archivos/Cover of SMUCKERS (feat. Lil Wayne & Kanye West) by Tyler,  The Creator, Lil Wayne, Kanye West.jpg",
      duration: "5:34",
      text: "Tyler, Kanye West, Lil Wayne"
    },
    {
      src: "archivos/Feel The Love - KIDS SEE GHOSTS.mp3",
      name: "Feel The Love",
      image: "archivos/Cover of Feel The Love by KIDS SEE GHOSTS, Pusha T.jpg",
      duration: "2:45",
      text: "KID SEE GHOSTS"
    },
    {
      src: "archivos/Through The Wire - Kanye West.mp3",
      name: "Through The Wire",
      image: "archivos/Cover of Through The Wire by Kanye West.jpg",
      duration: "3:41",
      text: "Kanye West"
    },
    {
      src: "archivos/Gold Digger - Kanye West.mp3",
      name: "Gold Digger",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:27",
      text: "Gold Digger"
    },
    {
      src: "archivos/Paranoid - Kanye West.mp3",
      name: "Paranoid",
      image: "archivos/Cover of Paranoid by Kanye West, Mr Hudson.jpg",
      duration: "4:37",
      text: "Kanye West"
    },
    {
      src: "archivos/Lift Yourself - Kanye West.mp3",
      name: "Lift Yourself",
      image: "archivos/Cover of Lift Yourself by Kanye West.jpg",
      duration: "2:27",
      text: "Kanye West"
    },
    {
      src: "archivos/24 - Kanye West.mp3",
      name: "24",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "3:17",
      text: "Kanye West"
    },
    {
      src: "archivos/Famous - Kanye West.mp3",
      name: "Famous",
      image: "archivos/Cover of Father Stretch My Hands Pt. 1 by Kanye West.jpg",
      duration: "3:16",
      text: "Kanye West"
    },
    {
      src: "archivos/彼女に言って (Diz A Ela) - Lisa Ono.mp3",
      name: "彼女に言って",
      image: "archivos/Cover of サマー・サンバ by Lisa Ono.jpg",
      duration: "3:48",
      text: "Lisa Ono"
    },
    {
      src: "archivos/90210 (feat. Kacy Hill) - Travis Scott.mp3",
      name: "90210 (feat. Kacy Hill)",
      image: "archivos/Cover of 90210 (feat. Kacy Hill) by Travis Scott, Kacy Hill.jpg",
      duration: "5:39",
      text: "Travis Scott"
    },
    {
      src: "archivos/EARFQUAKE - Tyler.mp3",
      name: "EARFQUAKE",
      image: "archivos/Cover of GONE GONE THANK YOU by Tyler.jpg",
      duration: "3:10",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/Red and Gold - MF DOOM.mp3",
      name: "Red and Gold",
      image: "archivos/Cover of Gas Drawls by MF DOOM.jpg",
      duration: "4:42",
      text: "MF DOOM"
    },
    {
      src: "archivos/Feel The Fiyaaaah (with A$AP Rocky & feat. Takeoff) - Metro Boomin.mp3",
      name: "Feel The Fiyaaaah",
      image: "archivos/Cover of Feel The Fiyaaaah (with A$AP Rocky & feat. Takeoff) by Metro Boomin, A$AP Rocky, Takeoff.jpg",
      duration: "3:09",
      text: "Metro Boomin, A$AP Rocky"
    },
    {
      src: "archivos/This Is America - Childish Gambino.mp3",
      name: "This Is America",
      image: "archivos/Cover of This Is America by Childish Gambino.jpg",
      duration: "3:45",
      text: "Childish Gambino"
    },
    {
      src: "archivos/Hoy El Aire Huele a Ti - Luis Miguel.mp3",
      name: "Hoy El Aire Huele a Ti",
      image: "archivos/Cover of Hoy El Aire Huele a Ti by Luis Miguel.jpg",
      duration: "3:45",
      text: "Luis Miguel"
    },
    {
      src: "archivos/DNA. - Kendrick Lamar.mp3",
      name: "DNA.",
      image: "archivos/Cover of PRIDE. by Kendrick Lamar.jpg",
      duration: "3:05",
      text: "Kendrick Lamar"
    },
    {
      src: "archivos/Southern Nights - Glen Campbell.mp3",
      name: "Southern Nights",
      image: "archivos/Cover of Southern Nights by Glen Campbell.jpg",
      duration: "3:00",
      text: "Glen Campbell"
    },
    {
      src: "archivos/I Love It (& Lil Pump) - Kanye West.mp3",
      name: "I Love It (& Lil Pump)",
      image: "archivos/Cover of I Love It (& Lil Pump) by Kanye West, Lil Pump.jpg",
      duration: "2:07",
      text: "Kanye West, Lil Pump"
    },
    {
      src: "archivos/HYPNOTIC DATA - Slowed & Reverbed - ODECORE.mp3",
      name: "HYPNOTIC DATA",
      image: "archivos/Cover of HYPNOTIC DATA - Slowed & Reverbed by ODECORE, Odetari.jpg",
      duration: "2:38",
      text: "ODECORE"
    },
    {
      src: "archivos/MILLION DOLLAR BABY - Tommy Richman.mp3",
      name: "MILLION DOLLAR BABY",
      image: "archivos/Cover of MILLION DOLLAR BABY by Tommy Richman.jpg",
      duration: "2:35",
      text: "Tommy Richman"
    },
    {
      src: "archivos/Oro De Ley - Luis Miguel.mp3",
      name: "Oro De Ley",
      image: "archivos/Cover of Oro De Ley by Luis Miguel.jpg",
      duration: "3:58",
      text: "Luis Miguel"
    },
    {
      src: "archivos/HOT WIND BLOWS (feat. Lil Wayne) - Tyler.mp3",
      name: "HOT WIND BLOWS",
      image: "archivos/Cover of HOT WIND BLOWS (feat. Lil Wayne) by Tyler.jpg",
      duration: "2:35",
      text: "Tyler, The Creator, Lil Wayne"
    },
    {
      src: "archivos/More Than A Woman - Bee Gees.mp3",
      name: "More Than A Woman",
      image: "archivos/Cover of More Than A Woman by Bee Gees.jpg",
      duration: "3:17",
      text: "Bee Gees"
    },
    {
      src: "archivos/Live And Let Die - 2018 Remaster - Wings.mp3",
      name: "Live And Let Die",
      image: "archivos/Cover of Live And Let Die - 2018 Remaster by Wings.jpg",
      duration: "3:12",
      text: "Wings"
    },
    {
      src: "archivos/A Bird's Last Look - Macabre Plaza.mp3",
      name: "A Bird's Last Look",
      image: "archivos/Cover of A Bird's Last Look by Macabre Plaza.jpg",
      duration: "1:09",
      text: "Macabre Plaza"
    },
    {
      src: "archivos/Chamber Of Reflection - Mac DeMarco.mp3",
      name: "Chamber Of Reflection",
      image: "archivos/Cover of Chamber Of Reflection by Mac DeMarco.jpg",
      duration: "3:51",
      text: "Mac DeMarco" 
    },
    {
      src: "archivos/ARE WE STILL FRIENDS_ - Tyler.mp3",
      name: "ARE WE STILL FRIENDS?",
      image: "archivos/Cover of ARE WE STILL FRIENDS_ by Tyler,  The Creator.jpg",
      duration: "4:25",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/ALMA DINAMITA - WOS.mp3",
      name: "ALMA DINAMITA",
      image: "archivos/Cover of ALMA DINAMITA by WOS.jpg",
      duration: "2:53",
      text: "WOS"
    },
    {
      src: "archivos/Poison - Bell Biv DeVoe.mp3",
      name: "Poison",
      image: "archivos/Cover of Poison by Bell Biv DeVoe.jpg",
      duration: "4:19",
      text: "Bell Biv DeVoe"
    },
    {
      src: "archivos/Dark Red - Steve Lacy.mp3",
      name: "Dark Red",
      image: "archivos/Cover of Dark Red by Steve Lacy.jpg",
      duration: "2:53",
      text: "Steve Lacy"
    },
    {
      src: "archivos/All Falls Down - Kanye West.mp3",
      name: "All Falls Down",
      image: "archivos/Cover of All Falls Down by Kanye West.jpg",
      duration: "3:43",
      text: "All Falls Down"
    },
    {
      src: "archivos/19 Dias y 500 Noches - Joaquín Sabina.mp3",
      name: "19 Dias y 500 Noches",
      image: "archivos/Cover of 19 Dias y 500 Noches by Joaquín Sabina.jpg",
      duration: "4:43",
      text: "Joaquin Sabina"
    },
    {
      src: "archivos/Brillas - León Larregui.mp3",
      name: "Brillas",
      image: "archivos/Cover of Brillas by León Larregui.jpg",
      duration: "3:44",
      text: "León Larregui"
    },
    {
      src: "archivos/My Sweet Lord (2014 Remaster) - George Harrison.mp3",
      name: "My Sweet Lord",
      image: "archivos/Cover of My Sweet Lord (2014 Remaster) by George Harrison.jpg",
      duration: "4:41",
      text: "George Harrison"
    },
    {
      src: "archivos/Solo Tú - Los Retros.mp3",
      name: "Solo Tú",
      image: "archivos/Cover of Solo Tú by Los Retros.jpg",
      duration: "4:41",
      text: "Los Retros"
    },
    {
      src: "archivos/Bound - The Ponderosa Twins Plus One.mp3",
      name: "Bound",
      image: "archivos/Cover of Bound by The Ponderosa Twins Plus One.jpg",
      duration: "3:16",
      text: "The Ponderosa Twins Plus One"
    },
    {
      src: "archivos/Hell Of A Life - Kanye West.mp3",
      name: "Hell Of A Life",
      image: "archivos/Cover of Runaway by Kanye West, Pusha T.jpg",
      duration: "5:27",
      text: "Kanye West, Pusha T"
    },
    {
      src: "archivos/Infrunami - Steve Lacy.mp3",
      name: "Infrunami",
      image: "archivos/Cover of Infrunami by Steve Lacy.jpg",
      duration: "2:58",
      text: "Steve Lacy"
    },
    {
      src: "archivos/LOVE. FEAT. ZACARI. - Kendrick Lamar.mp3",
      name: "LOVE. FEAT. ZACARI.",
      image: "archivos/Cover of PRIDE. by Kendrick Lamar.jpg",
      duration: "3:33",
      text: "Kendrick Lamar"
    },
    {
      src: "archivos/Moon - Kanye West.mp3",
      name: "Moon",
      image: "archivos/Cover of Moon by Kanye West.jpg",
      duration: "2:36",
      text: "Kanye West"
    },
    {
      src: "archivos/Count Me Out - Kendrick Lamar.mp3",
      name: "Count Me Out",
      image: "archivos/Cover of Count Me Out by Kendrick Lamar.jpg",
      duration: "4:43",
      text: "Kendrick Lamar"
    },
    {
      src: "archivos/Facts (Charlie Heat Version) - Kanye West.mp3",
      name: "Facts",
      image: "archivos/Cover of Father Stretch My Hands Pt. 1 by Kanye West.jpg",
      duration: "3:20",
      text: "Kanye West"
    },
    {
      src: "archivos/BEST INTEREST - Tyler.mp3",
      name: "BEST INTEREST",
      image: "archivos/Cover of BEST INTEREST by Tyler,  The Creator.jpg",
      duration: "2:07",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/Dontmakemefallinlove - Cuco.mp3",
      name: "Dontmakemefallinlove",
      image: "archivos/Cover of Dontmakemefallinlove by Cuco.jpg",
      duration: "3:27",
      text: "Cuco"
    },
    {
      src: "archivos/Know Yourself - Drake.mp3",
      name: "Know Yourself",
      image: "archivos/Cover of Know Yourself by Drake.jpg",
      duration: "4:35",
      text: "Drake"
    },
    {
      src: "archivos/Estrelar - Marcos Valle.mp3",
      name: "Estrelar",
      image: "archivos/Cover of Estrelar by Marcos Valle.jpg",
      duration: "5:13",
      text: "Marcos Valle"
    },
    {
      src: "archivos/DUCKWORTH. - Kendrick Lamar.mp3",
      name: "DUCKWORTH.",
      image: "archivos/Cover of PRIDE. by Kendrick Lamar.jpg",
      duration: "4:08",
      text: "Kendrick Lamar"
    },
    {
      src: "archivos/Tristes Ojos - Ramona.mp3",
      name: "Tristes Ojos",
      image: "archivos/Cover of Tristes Ojos by Ramona.jpg",
      duration: "3:19",
      text: "Ramona"
    },
    {
      src: "archivos/Looking Out for You - Joy Again.mp3",
      name: "Looking Out for You",
      image: "archivos/Cover of Looking Out for You by Joy Again.jpg",
      duration: "2:59",
      text: "Joy Again"
    },
    {
      src: "archivos/Melting - Kali Uchis.mp3",
      name: "Melting",
      image: "archivos/Cover of Melting by Kali Uchis.jpg",
      duration: "3:28",
      text: "Kali Uchis"
    },
    {
      src: "archivos/Do Better - Cuco.mp3",
      name: "Do Better",
      image: "archivos/Cover of Do Better by Cuco.jpg",
      duration: "3:31",
      text: "Cuco"
    },
    {
      src: "archivos/BURN - Kanye West.mp3",
      name: "BURN",
      image: "archivos/Cover of PAPERWORK by Kanye West, Ty Dolla $ign.jpg",
      duration: "1:51",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Father Stretch My Hands Pt. 1 - Kanye West.mp3",
      name: "Father Stretch My Hands Pt. 1",
      image: "archivos/Cover of Father Stretch My Hands Pt. 1 by Kanye West.jpg",
      duration: "2:15",
      text: "Kanye West"
    },
    {
      src: "archivos/God Is - Kanye West.mp3",
      name: "God Is",
      image: "archivos/Cover of God Is by Kanye West.jpg",
      duration: "3:23",
      text: "Kanye West"
    },
    {
      src: "archivos/BACK TO ME - Kanye West.mp3",
      name: "BACK TO ME",
      image: "archivos/Cover of PAPERWORK by Kanye West, Ty Dolla $ign.jpg",
      duration: "4:55",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Hoe Cakes - MF DOOM.mp3",
      name: "Hoe Cakes",
      image: "archivos/Cover of Hoe Cakes by MF DOOM.jpg",
      duration: "3:54",
      text: "MF DOOM"
    },
    {
      src: "archivos/PAPERWORK - Kanye West.mp3",
      name: "PAPERWORK",
      image: "archivos/Cover of PAPERWORK by Kanye West, Ty Dolla $ign.jpg",
      duration: "2:25",
      text: "¥$, Kanye West, Ty Dolla $ign"
    },
    {
      src: "archivos/Sweet Honey - Los Retros.mp3",
      name: "Sweet Honey",
      image: "archivos/Cover of Sweet Honey by Los Retros.jpg",
      duration: "3:26",
      text: "Los Retros"
    },
    {
      src: "archivos/Me and Your Mama - Childish Gambino.mp3",
      name: "Me and Your Mama",
      image: "archivos/Cover of Me and Your Mama by Childish Gambino.jpg",
      duration: "6:20",
      text: "Childish Gambino"
    },
    {
      src: "archivos/No Other Heart - Mac DeMarco.mp3",
      name: "No Other Heart",
      image: "archivos/Cover of No Other Heart by Mac DeMarco.jpg",
      duration: "2:53",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/On the Level - Mac DeMarco.mp3",
      name: "On the Level",
      image: "archivos/Cover of For the First Time by Mac DeMarco.jpg",
      duration: "3:48",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/Homecoming - Kanye West.mp3",
      name: "Homecoming",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:23",
      text: "Kanye West"
    },
    {
      src: "archivos/Everything I Am - Kanye West.mp3",
      name: "Everything I Am",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:47",
      text: "Kanye West"
    },
    {
      src: "archivos/GONE, GONE _ THANK YOU - Tyler.mp3",
      name: "GONE, GONE | THANK YOU",
      image: "archivos/Cover of GONE GONE THANK YOU by Tyler.jpg",
      duration: "6:15",
      text: "Tyler, The Creator"
    },
    {
      src: "archivos/Time Moves Slow - BADBADNOTGOOD.mp3",
      name: "Time Moves Slow",
      image: "archivos/Cover of Time Moves Slow by BADBADNOTGOOD, Samuel T. Herring.jpg",
      duration: "4:33",
      text: "BADBADNOTGOOD, Samuel T. Herring"
    },
    {
      src: "archivos/All Caps - Madvillain.mp3",
      name: "All Caps",
      image: "archivos/Cover of All Caps by Madvillain, Madlib, MF DOOM.jpg",
      duration: "2:10",
      text: "Madvillain, Madlib, MF DOOM"
    },
    {
      src: "archivos/20191009 I Like Her - Mac DeMarco.mp3",
      name: "20191009 I Like Her",
      image: "archivos/Cover of 20191012 Fooled by Love by Mac DeMarco.jpg",
      duration: "2:16",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/Soundtrack for Your Backseat - sundiver ca.mp3",
      name: "Soundtrack for Your Backseat",
      image: "archivos/Cover of Soundtrack for Your Backseat by sundiver ca.jpg",
      duration: "2:42",
      text: "sundiver ca"
    },
    {
      src: "archivos/Devil In A New Dress - Kanye West.mp3",
      name: "Devil In A New Dress",
      image: "archivos/Cover of Devil In A New Dress by Kanye West, Rick Ross.jpg",
      duration: "5:51",
      text: "Kanye West, Rick Ross"
    },
    {
      src: "archivos/Somethin' Stupid - Frank Sinatra.mp3",
      name: "Somethin' Stupid",
      image: "archivos/Cover of Somethin' Stupid by Frank Sinatra, Nancy Sinatra.jpg",
      duration: "2:42",
      text: "Frank Sinatra, Nancy Sinatra"
    },
    {
      src: "archivos/Garota De Ipanema - Antônio Carlos Jobim.mp3",
      name: "Garota de Ipanema",
      image: "archivos/Cover of Garota De Ipanema by Antônio Carlos Jobim.jpg",
      duration: "4:02",
      text: "Antônio Carlos Jobim"
    },
    {
      src: "archivos/Lover Is a Day - Cuco.mp3",
      name: "Lover Is a Day",
      image: "archivos/Cover of Lover Is a Day by Cuco.jpg",
      duration: "7:36",
      text: "Cuco"
    },
    {
      src: "archivos/Hey Mama - Kanye West.mp3",
      name: "Hey Mama",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "5:05",
      text: "Kanye West"
    },
    {
      src: "archivos/Touch The Sky - Kanye West.mp3",
      name: "Touch The Sky",
      image: "archivos/Cover of Touch The Sky by Kanye West.jpg",
      duration: "3:56",
      text: "Kanye West"
    },
    {
      src: "archivos/On Sight - Kanye West.mp3",
      name: "On Sight",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "2:36",
      text: "Kanye West"
    },
    {
      src: "archivos/Bound 2 - Kanye West.mp3",
      name: "Bound 2",
      image: "archivos/Cover of Bound 2 by Kanye West.jpg",
      duration: "3:49",
      text: "Kanye West"
    },
    {
      src: "archivos/Big Poppa - 2005 Remaster - The Notorious B.I.G..mp3",
      name: "Big Poppa - 2005 Remaster",
      image: "archivos/Cover of Juicy - 2005 Remaster by The Notorious B.I.G..jpg",
      duration: "4:12",
      text: "Notorious B.I.G."
    },
    {
      src: "archivos/You Know How We Do It - Ice Cube.mp3",
      name: "You Know How We Do It",
      image: "archivos/Cover of You Know How We Do It by Ice Cube.jpg",
      duration: "3:52",
      text: "Ice Cube"
    },
    {
      src: "archivos/Like You Do - Joji.mp3",
      name: "Like You Do",
      image: "archivos/Cover of Like You Do by Joji.jpg",
      duration: "4:00",
      text: "Joji"
    },
    {
      src: "archivos/American Boy - Estelle.mp3",
      name: "American Boy",
      image: "archivos/Cover of American Boy by Estelle, Kanye West.jpg",
      duration: "4:44",
      text: "Estelle, Kanye West"
    },
    {
      src: "archivos/505 - Arctic Monkeys.mp3",
      name: "505",
      image: "archivos/Cover of 505 by Arctic Monkeys.jpg",
      duration: "4:13",
      text: "Arctic Monkeys"
    },
    {
      src: "archivos/Can't Tell Me Nothing - Kanye West.mp3",
      name: "Can't Tell Me Nothing",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "4:31",
      text: "Kanye West"
    },
    {
      src: "archivos/Champion - Kanye West.mp3",
      name: "Champion",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "2:47",
      text: "Kanye West"
    },
    {
      src: "archivos/Flashing Lights - Kanye West.mp3",
      name: "Flashing Lights",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "3:57",
      text: "Kanye West"
    },
    {
      src: "archivos/Violent Crimes - Kanye West.mp3",
      name: "Violent Crimes",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "3:35",
      text: "Kanye West, PARTYNEXTDOOR"
    },
    {
      src: "archivos/Small Worlds - Mac Miller.mp3",
      name: "Small Worlds",
      image: "archivos/Cover of Small Worlds by Mac Miller.jpg",
      duration: "4:31",
      text: "Mac Miller"
    },
    {
      src: "archivos/I Wonder - Kanye West.mp3",
      name: "I Wonder",
      image: "archivos/Cover of I Wonder by Kanye West.jpg",
      duration: "4:03",
      text: "Kanye West"
    },
    {
      src: "archivos/Rhymes Like Dimes - MF DOOM.mp3",
      name: "Rhymes Like Dimes",
      image: "archivos/Cover of Gas Drawls by MF DOOM.jpg",
      duration: "4:18",
      text: "Kanye West"
    },
    {
      src: "archivos/Rapp Snitch Knishes - MF DOOM.mp3",
      name: "Rapp Snitch Knishes",
      image: "archivos/Cover of One Beer by MF DOOM.jpg",
      duration: "2:52",
      text: "MF DOOM"
    },
    {
      src: "archivos/Runaway - Kanye West.mp3",
      name: "Runaway",
      image: "archivos/Cover of Runaway by Kanye West, Pusha T.jpg",
      duration: "9:07",
      text: "Kanye West, Pusha T"
    },
    {
      src: "archivos/One Beer - MF DOOM.mp3",
      name: "One Beer",
      image: "archivos/Cover of One Beer by MF DOOM.jpg",
      duration: "4:18",
      text: "MF DOOM"
    },
    {
      src: "archivos/PRIDE. - Kendrick Lamar.mp3",
      name: "PRIDE.",
      image: "archivos/Cover of PRIDE. by Kendrick Lamar.jpg",
      duration: "4:35",
      text: "Kendrick Lamar"
    },
    {
      src: "archivos/Ghost Town - Kanye West.mp3",
      name: "Ghost Town",
      image: "archivos/Ghost Town by Kanye West, PARTYNEXTDOOR.jpg",
      duration: "4:31",
      text: "Kanye West, PARTYNEXTDOOR"
    },
    {
      src: "archivos/Gas Drawls - MF DOOM.mp3",
      name: "Gas Drawls",
      image: "archivos/Cover of Gas Drawls by MF DOOM.jpg",
      duration: "3:43",
      text: "MF DOOM"
    },
    {
      src: "archivos/20191012 Fooled By Love - Mac DeMarco.mp3",
      name: "20191012 Fooled By Love",
      image: "archivos/Cover of 20191012 Fooled By Love by Mac DeMarco.jpg",
      duration: "3:17",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/Moonlight on the River - Mac DeMarco.mp3",
      name: "Moonlight on the River",
      image: "archivos/Cover of For the First Time by Mac DeMarco.jpg",
      duration: "7:02",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/For the First Time - Mac DeMarco.mp3",
      name: "For the First Time",
      image: "archivos/Cover of For the First Time by Mac DeMarco.jpg",
      duration: "3:02",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/My Kind of Woman - Mac DeMarco.mp3",
      name: "My Kind of Woman",
      image: "archivos/Cover of My Kind of Woman by Mac DeMarco.jpg",
      duration: "3:10",
      text: "Mac DeMarco"
    },
    {
      src: "archivos/Amtrak - Los Retros.mp3",
      name: "Amtrak",
      image: "archivos/Cover of Amtrak by Los Retros.jpg",
      duration: "2:56",
      text: "Los Retros"
    },
    {
      src: "archivos/サマー・サンバ - Lisa Ono.mp3",
      name: "サマー・サンバ",
      image: "archivos/Cover of サマー・サンバ by Lisa Ono.jpg",
      duration: "2:14",
      text: "Lisa Ono"
    },
    {
      src: "archivos/Garota de Ipanema - 2006 Version - Lisa Ono.mp3",
      name: "Garota de Ipanema",
      image: "archivos/Cover of Garota de Ipanema - 2006 Version by Lisa Ono.jpg",
      duration: "4:39",
      text: "Lisa Ono"
    },
    {
      src: "archivos/Friends - Los Retros.mp3",
      name: "Friends",
      image: "archivos/Cover of Friends by Los Retros.jpg",
      duration: "2:39",
      text: "Los Retros"
    },
    {
      src: "archivos/Someone To Spend Time With - Los Retros.mp3",
      name: "Someone To Spend Time With",
      image: "archivos/Cover of Someone To Spend Time With by Los Retros.jpg",
      duration: "2:53",
      text: "Los Retros"
    }
      
  ];

  const audio = new Audio();
  let currentSongIndex = 0;
  let isPlaying = false;
  let isShuffleOn = false;
  let shuffleQueue = [];
  let shuffleIndex = 0;
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
  <div class="title-container">
    <div class="title">${song.name}</div>
    <div class="song-text">${song.text}</div>
  </div>
  <span class="time">${song.duration || '0:00'}</span>
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
    randomBtn.addEventListener('click', toggleShuffle);
  }
  
function playSong(song) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = song.image;

  img.onload = () => {
  songImageEl.src = song.image;
  songNameEl.textContent = song.name;
  audio.src = song.src;

document.querySelectorAll('.track').forEach(track => {
  track.classList.remove('active');
});

const activeTrack = document.querySelector(`.track[data-index="${currentSongIndex}"]`);
if (activeTrack) {
  activeTrack.classList.add('active');
}

  const colorThief = new ColorThief();
  const [r, g, b] = colorThief.getColor(img);

  const darken = (value) => Math.max(0, value * 0.7);
  const rD = Math.floor(darken(r));
  const gD = Math.floor(darken(g));
  const bD = Math.floor(darken(b));

  const backgroundColor = `rgb(${rD}, ${gD}, ${bD})`;
  const darkerBg = `rgba(${rD}, ${gD}, ${bD}, 0.8)`;

  infoMSC.style.backgroundColor = backgroundColor;
  const spotify = document.querySelector('.spotify-layout');
  spotify.style.backgroundColor = darkerBg;
  infoMSC.style.transition = spotify.style.transition = "background-color 1s ease";

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
    if (isShuffleOn) {
      playRandomSong();
    } else {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      playSong(songs[currentSongIndex]);
    }
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
  }

  function playRandomSong() {
    if (shuffleQueue.length === 0 || shuffleIndex >= shuffleQueue.length) {
      generateShuffleQueue();
    }

    currentSongIndex = shuffleQueue[shuffleIndex];
    shuffleIndex++;
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

  
const progressBar = document.querySelector('.progress-bar');
let isProgressBarActive = false;

function handleProgressBarClick(e) {
  const rect = progressBar.getBoundingClientRect();
  const width = rect.width;
  
  let clickX;
  if (e.type === 'touchstart' || e.type === 'touchmove') {
    clickX = e.touches[0].clientX - rect.left;
  } else {
    clickX = e.offsetX;
  }
  
  clickX = Math.max(0, Math.min(clickX, width));
  
  const duration = audio.duration;
  if (duration && !isNaN(duration)) {
    audio.currentTime = (clickX / width) * duration;
  }
}

progressBar.addEventListener('click', handleProgressBarClick);
progressBar.addEventListener('mousedown', () => {
  isProgressBarActive = true;
  progressBar.style.height = '14px';
});

progressBar.addEventListener('touchstart', (e) => {
  isProgressBarActive = true;
  progressBar.style.height = '14px';
  handleProgressBarClick(e);
});

progressBar.addEventListener('touchmove', (e) => {
  if (isProgressBarActive) {
    handleProgressBarClick(e);
  }
});

document.addEventListener('mouseup', () => {
  if (isProgressBarActive) {
    isProgressBarActive = false;
    progressBar.style.height = '10px';
  }
});

document.addEventListener('touchend', () => {
  if (isProgressBarActive) {
    isProgressBarActive = false;
    progressBar.style.height = '10px';
  }
});

  
  window.nextSong = nextSong;
  window.prevSong = prevSong;
  window.togglePlayPause = togglePlayPause;
});
