function ocultarTodo() {
    document.querySelector('.main').style.display = 'none';
    document.getElementById('info-nosotros').style.display = 'none';
    document.getElementById('info-planesAFuturo').style.display = 'none';
    document.getElementById('info-sorpresa').style.display = 'none';

    document.querySelector('.header').style.display = 'none';
}

function mostrarInicio() {
    ocultarTodo();
    document.querySelector('.main').style.display = 'block';
    document.querySelector('.header').style.display = 'block';
    window.scrollTo(0, 0);
}

function mostrarNosotros() {
    ocultarTodo();
    document.getElementById('info-nosotros').style.display = 'block';
    actualizarContador();

    const intervaloContador = setInterval(actualizarContador, 1000);

    window.scrollTo(0, 0);

    const infoNosotros = document.getElementById('info-nosotros');
    const observer = new MutationObserver(function(mutations) {
        if (infoNosotros.style.display === 'none') {
            clearInterval(intervaloContador);
        }
    });

    observer.observe(infoNosotros, { attributes: true });
}

function mostrarPAF() {
    ocultarTodo();
    document.getElementById('info-planesAFuturo').style.display = 'block';
    window.scrollTo(0, 0);
}

function mostrarSorpresa() {
    ocultarTodo();
    document.getElementById('info-sorpresa').style.display = 'block';
    window.scrollTo(0, 0);
}

function mostrarMensaje() {
    document.getElementById('mensaje-sorpresa').style.display = 'block';
}

const fechaInicio = new Date('2022-11-02T00:00:00');

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora.getTime() - fechaInicio.getTime();

    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    const tiempoJuntos = document.getElementById('tiempo-juntos');
    tiempoJuntos.innerHTML = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}


let audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Something%20-%20Remastered%202009%20-%20The%20Beatles.mp3?v=1742536693262', 
        name: 'Something - Remastered 2009 - The Beatles', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_020045.jpg?v=1743025655767' 
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Solo%20T%C3%BA%20-%20Los%20Retros.mp3?v=1742536522473', 
        name: 'Solo Tú - Los Retros', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015852.jpg?v=1743025440802' 
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/La%20Gloria%20Eres%20Tu%20-%20Luis%20Miguel.mp3?v=1742535930372', 
        name: 'La Gloria Eres Tú - Luis Miguel', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015958.jpg?v=1743025567415' 
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Paranoid%20-%20Kanye%20West.mp3?v=1742536209675', 
        name: 'Paranoid - Kanye West', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_020026.jpg?v=1743025618469'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Hoy%20El%20Aire%20Huele%20a%20Ti%20-%20Luis%20Miguel.mp3?v=1742536407315', 
        name: 'Hoy El Aire Huele a Ti - Luis Miguel', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015934.jpg?v=1743025546639'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/ALMA%20DINAMITA%20-%20WOS.mp3?v=1742536457332', 
        name: 'ALMA DINAMITA - WOS', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015907.jpg?v=1743025476704'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Wouldnt Leave - Kanye West.mp3?v=1742536350445', 
        name: 'Wouldnt Leave - Kanye West', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015924.jpg?v=1743025516935'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/No.%201%20Party%20Anthem%20-%20Arctic%20Monkeys.mp3?v=1742536093085', 
        name: 'No. 1 Party Anthem - Arctic Monkeys', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_020011.jpg?v=1743025602587'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/EARFQUAKE%20-%20Tyler.mp3?v=1742536268546', 
        name: 'EARFQUAKE - Tyler', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015915.jpg?v=1743025493371'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E5%BD%BC%E5%A5%B3%E3%81%AB%E8%A8%80%E3%81%A3%E3%81%A6%20(Diz%20A%20Ela)%20-%20Lisa%20Ono.mp3?v=1742536377339', 
        name: '彼女に言って (Diz A Ela) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250327_152028.jpg?v=1743106864163'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Dark%20Red%20-%20Steve%20Lacy.mp3?v=1743107064063', 
        name: 'Dark Red - Steve Lacy', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_020036.jpg?v=1743025639279'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E9%81%A0%E3%81%8F%E9%9B%A2%E3%82%8C%E3%81%A6%E3%82%82%20(Contigo%20En%20La%20Distancia)%20-%20Lisa%20Ono.mp3?v=1743219145924', 
        name: '遠く離れても (Contigo En La Distancia) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183602.jpg?v=1743219603996'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/No%20S%C3%A9%20T%C3%BA%20-%20Luis%20Miguel.mp3?v=1743219292959', 
        name: 'No Sé Tú - Luis Miguel', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183701.jpg?v=1743219719412'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Ghost%20Town%20-%20Kanye%20West.mp3?v=1742536303001', 
        name: 'Ghost Town - Kanye West', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015924.jpg?v=1743025516935'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Chaosmyth%20-%20ONE%20OK%20ROCK.mp3?v=1743285154768', 
        name: 'Chaosmyth - ONE OK ROCK', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_163516.jpg?v=1743285173770'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E3%83%99%E3%82%B5%E3%83%A1%E3%83%BB%E3%83%A0%E3%83%BC%E3%83%81%E3%83%A7%20(B%C3%A9same%20Mucho)%20-%20Lisa%20Ono.mp3?v=1743219179740', 
        name: 'ベサメ・ムーチョ (Bésame Mucho) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183602.jpg?v=1743219603996'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Someone%20To%20Spend%20Time%20With%20-%20Los%20Retros.mp3?v=1743219277107', 
        name: 'Someone To Spend Time With - Los Retros', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183643.jpg?v=1743219689683'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/My%20Kind%20of%20Woman%20-%20Mac%20DeMarco.mp3?v=1743279259330', 
        name: 'My Kind of Woman - Mac DeMarco', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_145813.jpg?v=1743279380665'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Ojos%20Color%20Sol%20(feat.%20Silvio%20Rodr%C3%ADguez)%20-%20Calle%2013.mp3?v=1743279282082', 
        name: 'Ojos Color Sol (feat. Silvio Rodríguez) - Calle 13', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_150949.jpg?v=1743279399677'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Like%20You%20Do%20-%20Joji.mp3?v=1743281966312', 
        name: 'Like You Do - Joji', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155103.jpg?v=1743282137893'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Bound%202%20-%20Kanye%20West.mp3?v=1743281932036', 
        name: 'Bound 2 - Kanye West', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155028.jpg?v=1743282123237'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Amor%20M%C3%ADo%20-%20Frank%20Sark.mp3?v=1743281998092', 
        name: 'Amor Mío - Frank Sark', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155124.jpg?v=1743282164856'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/EARFQUAKE%20-%20Tyler.mp3?v=1742536268546', 
        name: 'EARFQUAKE - Tyler', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015915.jpg?v=1743025493371'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/For%20the%20First%20Time%20-%20Mac%20DeMarco.mp3?v=1743281981114', 
        name: 'For the First Time - Mac DeMarco', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155114.jpg?v=1743282151362'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Soundtrack%20for%20Your%20Backseat%20-%20sundiver%20ca.mp3?v=1743281913059', 
        name: 'Soundtrack for Your Backseat - sundiver ca', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155014.jpg?v=1743282111084'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Dontmakemefallinlove%20-%20Cuco.mp3?v=1743281817003', 
        name: 'Dontmakemefallinlove - Cuco', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154913.jpg?v=1743282031254'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E3%83%94%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%AB%E3%83%8D%E3%83%A9%20(Piel%20Canela)%20-%20Lisa%20Ono.mp3?v=1743219459306', 
        name: 'ピエル・カネラ (Piel Canela) - Lisa Onoピエル・カネラ (Piel Canela) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183612.jpg?v=1743219625343'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/You%20Are%20So%20Beautiful%20-%20Joe%20Cocker.mp3?v=1743219485327', 
        name: 'You Are So Beautiful - Joe Cocker', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183624.jpg?v=1743219646542'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Violent%20Crimes%20-%20Kanye%20West.mp3?v=1742536172146', 
        name: 'Violent Crimes - Kanye West', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250321_015924.jpg?v=1743025516935'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/When Youre Smiling - Louis Armstrong.mp3?v=1743219249702', 
        name: 'When Youre Smiling - Louis Armstrong', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183633.jpg?v=1743219666286'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Love%20Like%20You%20(feat.%20Rebecca%20Sugar)%20-%20End%20Credits%20-%20Steven%20Universe.mp3?v=1743219529659', 
        name: 'Love Like You (feat. Rebecca Sugar) - End Credits - Steven Universe', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183722.jpg?v=1743219775652'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Melting%20-%20Kali%20Uchis.mp3?v=1743281834137', 
        name: 'Melting - Kali Uchis', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154923.jpg?v=1743282047506'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E3%83%86%E3%83%BB%E3%82%AD%E3%82%A8%E3%83%AD%E3%83%BB%E3%83%87%E3%82%A3%E3%83%92%E3%82%B9%E3%83%86%20(Te%20Quiero%20Dijiste)%20-%20Lisa%20Ono.mp3?v=1743219224131', 
        name: 'テ・キエロ・ディヒステ (Te Quiero Dijiste) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183612.jpg?v=1743219625343'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Muerte%20En%20Hawaii%20-%20Calle%2013.mp3?v=1743279300842', 
        name: 'Muerte En Hawaii - Calle 13', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_151010.jpg?v=1743279420632'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Brillas%20-%20Le%C3%B3n%20Larregui.mp3?v=1743279317445', 
        name: 'Brillas - León Larregui', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_145744.jpg?v=1743279367322'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Ojos%20de%20Girasol%20-%20Darviin.mp3?v=1743281789600', 
        name: 'Ojos de Girasol - Darviin', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154841.jpg?v=1743287593608'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Sweet%20Honey%20-%20Los%20Retros.mp3?v=1743281881100', 
        name: 'Sweet Honey - Los Retros', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_155000.jpg?v=1743282096660'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/No%20Other%20Heart%20-%20Mac%20DeMarco.mp3?v=1743281895855', 
        name: 'No Other Heart - Mac DeMarco', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_174147.jpg?v=1743288150512'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/(They%20Long%20To%20Be)%20Close%20To%20You%20-%20Carpenters.mp3?v=1743219548421', 
        name: '(They Long To Be) Close To You - Carpenters', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_215757.jpg?v=1743219859641'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Morena%20-%20Darviin.mp3?v=1743281802913', 
        name: 'Morena - Darviin', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154858.jpg?v=1743282015573'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/%E3%83%95%E3%83%AC%E3%83%8D%E3%82%B7%E3%83%BC%20(Frenes%C3%AD)%20-%20Lisa%20Ono.mp3?v=1743219202558', 
        name: 'フレネシー (Frenesí) - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183612.jpg?v=1743219625343'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Amor%20-%20Alta%20Elegancia.mp3?v=1743219361145', 
        name: 'Amor - Alta Elegancia', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183741.jpg?v=1743219835925'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Garota%20de%20Ipanema%20-%202006%20Version%20-%20Lisa%20Ono.mp3?v=1743219316101', 
        name: 'Garota de Ipanema - 2006 Version - Lisa Ono', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250328_183733.jpg?v=1743219811463'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Lover%20Is%20a%20Day%20-%20Cuco.mp3?v=1743281853782', 
        name: 'Lover Is a Day - Cuco', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154941.jpg?v=1743282063294'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Amtrak%20-%20Los%20Retros.mp3?v=1743281867829', 
        name: 'Amtrak - Los Retros', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/IMG_20250329_154950.jpg?v=1743282077955'
    },
    { 
        src: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/A%20new%20one%20for%20all%2C%20All%20for%20the%20new%20one%20-%20ONE%20OK%20ROCK.mp3?v=1748122536909', 
        name: 'A new one for all, All for the new one - ONE OK ROCK', 
        image: 'https://cdn.glitch.global/70136650-6737-4d41-9ed6-3e4eb0e57f6b/Cover%20of%20A%20new%20one%20for%20all%2C%20All%20for%20the%20new%20one%20by%20ONE%20OK%20ROCK.jpg?v=1748122547990'
    }
];

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

