function ocultarTodo() {
    document.querySelector('.main').style.display = 'none';
    document.getElementById('info-nosotros').style.display = 'none';
    document.getElementById('info-contactanos').style.display = 'none';

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
    window.scrollTo(0, 0);

    const infoNosotros = document.getElementById('info-nosotros');
    const observer = new MutationObserver(function(mutations) {
        if (infoNosotros.style.display === 'none') {
        }
    });

    observer.observe(infoNosotros, { attributes: true });
}

function mostrarContactanos() {
    ocultarTodo();
    document.getElementById('info-contactanos').style.display = 'block';
    window.scrollTo(0, 0);
}
