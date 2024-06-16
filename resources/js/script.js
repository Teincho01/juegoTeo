const palabras = [
    "peaton", "ciclista", "semaforo", "peatonal", "cruce",
    "precaucion", "conductor", "seguridad", "velocidad", "cinturon",
    "acera", "transito", "señal", "visibilidad", "respeto"
];
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let errores = 0;
const maxErrores = 10;
let primerJuego = true;

const mostrarPalabra = document.getElementById('mostrar-palabra');
const letrasContenedor = document.getElementById('letras');
const mensaje = document.getElementById('mensaje');
const mensajePalabra = document.getElementById('mensajePalabra');
const mensajeApoyo = document.getElementById('mensajeApoyo');
const botonReiniciar = document.getElementById('boton-reiniciar');
const botonVolver = document.getElementById('boton-volver')
const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

function mostrarPalabraEnPantalla() {
    const display = palabraSeleccionada.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : '_').join(' ');
    mostrarPalabra.textContent = display;
}

function mostrarLetras() {
    letrasContenedor.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letra = String.fromCharCode(65 + i).toLowerCase();
        const letraElemento = document.createElement('span');
        letraElemento.textContent = letra;
        letraElemento.classList.add('letra');
        letraElemento.addEventListener('click', () => adivinarLetra(letra));
        if (letrasAdivinadas.includes(letra)) {
            letraElemento.classList.add('oculto');
        }
        letrasContenedor.appendChild(letraElemento);
    }
}

function mostrarMensajeFinal(resultado) {
    switch (resultado) {
        case 'ganaste':
            mensaje.textContent = '¡Felicidades! ¡Adivinaste la palabra!';
            break;
        case 'perdiste':
            mensaje.textContent = `¡Juego Terminado! La palabra era: ${palabraSeleccionada}`;
            break;
    }
    mostrarMensajeApoyo();
}

function mostrarMensajeApoyo() {
    let mensajeApoyoTexto = "";
    switch (palabraSeleccionada) {
        case "peaton":
            mensajeApoyoTexto += "Los peatones son usuarios vulnerables de la vía. Respeta los pasos de peatones y asegúrate de cruzar con seguridad.";
            break;
        case "ciclista":
            mensajeApoyoTexto += "Respeta a los ciclistas en la carretera. Mantén una distancia segura al adelantar y sé consciente de su presencia.";
            break;
        case "semaforo":
            mensajeApoyoTexto += "Respeta las luces del semáforo. El semáforo en rojo significa detención obligatoria.";
            break;
        case "peatonal":
            mensajeApoyoTexto += "Utiliza las zonas peatonales para cruzar la calle. No atravieses por lugares no autorizados.";
            break;
        case "cruce":
            mensajeApoyoTexto += "Ten precaución al cruzar intersecciones. Asegúrate de que los conductores te vean antes de cruzar.";
            break;
        case "precaucion":
            mensajeApoyoTexto += "Mantén una actitud de precaución en todo momento al transitar por la vía pública. La seguridad vial es responsabilidad de todos.";
            break;
        case "conductor":
            mensajeApoyoTexto += "Como conductor, respeta los límites de velocidad y las normas de tráfico. Tu responsabilidad garantiza la seguridad de todos los usuarios.";
            break;
        case "seguridad":
            mensajeApoyoTexto += "La seguridad vial es fundamental para prevenir accidentes. Conducir de manera segura salva vidas.";
            break;
        case "velocidad":
            mensajeApoyoTexto += "Respeta los límites de velocidad. Conducir a una velocidad adecuada reduce el riesgo de accidentes graves.";
            break;
        case "cinturon":
            mensajeApoyoTexto += "Siempre usa el cinturón de seguridad cuando viajes en un vehículo. Es tu mejor protección en caso de colisión.";
            break;
        case "acera":
            mensajeApoyoTexto += "Utiliza las aceras para caminar de manera segura. Evita transitar por el borde de la calzada.";
            break;
        case "transito":
            mensajeApoyoTexto += "Respeta las normas de tránsito en todo momento. Son fundamentales para la convivencia vial.";
            break;
        case "señal":
            mensajeApoyoTexto += "Presta atención a las señales de tráfico. Te proporcionan información importante sobre las condiciones de la vía.";
            break;
        case "visibilidad":
            mensajeApoyoTexto += "Asegúrate de ser visible para otros usuarios de la vía. Usa prendas reflectantes si caminas de noche.";
            break;
        case "respeto":
            mensajeApoyoTexto += "El respeto mutuo entre todos los usuarios de la vía es clave para la seguridad vial.";
            break;
        default:
            mensajeApoyoTexto += "¡Aprende más sobre seguridad vial para una convivencia más segura!";
            break;
    }

    mensajeApoyo.textContent = mensajeApoyoTexto;
}

function adivinarLetra(letra) {
    if (!letrasAdivinadas.includes(letra)) {
        letrasAdivinadas.push(letra);
        if (!palabraSeleccionada.includes(letra)) {
            errores++;
            dibujarAhorcado();
            if (errores === maxErrores) {
                mostrarMensajeFinal('perdiste');
                deshabilitarLetras();
            }
        } else if (palabraSeleccionada.split('').every(letra => letrasAdivinadas.includes(letra))) {
            mostrarMensajeFinal('ganaste');
            deshabilitarLetras();
        }
        mostrarPalabraEnPantalla();
        mostrarLetras();
    }
}

function deshabilitarLetras() {
    const letrasElementos = document.querySelectorAll('.letra');
    letrasElementos.forEach(letraElemento => {
        letraElemento.classList.add('letra-usada');
        letraElemento.style.pointerEvents = 'none'; 
    });
}
function reiniciarJuego() {
    if (primerJuego){
        botonReiniciar.textContent = 'Reiniciar Juego';
        primerJuego = false
    }
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    letrasAdivinadas = [];
    errores = 0;
    mensaje.textContent = '';
    mensajePalabra.textContent = '';
    mensajeApoyo.textContent = '';
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    mostrarPalabraEnPantalla();
    mostrarLetras();
}

function dibujarAhorcado() {
    switch (errores) {
        case 1:
            // base
            contexto.beginPath();
            contexto.moveTo(10, 190);
            contexto.lineTo(190, 190);
            contexto.stroke();
            break;
        case 2:
            // poste vertical
            contexto.beginPath();
            contexto.moveTo(50, 190);
            contexto.lineTo(50, 10);
            contexto.stroke();
            break;
        case 3:
            // poste horizontal
            contexto.beginPath();
            contexto.moveTo(50, 10);
            contexto.lineTo(150, 10);
            contexto.stroke();
            break;
        case 4:
            // cuerda
            contexto.beginPath();
            contexto.moveTo(150, 10);
            contexto.lineTo(150, 30);
            contexto.stroke();
            break;
        case 5:
            // cabeza
            contexto.beginPath();
            contexto.arc(150, 40, 10, 0, Math.PI * 2);
            contexto.stroke();
            break;
        case 6:
            // tronco
            contexto.beginPath();
            contexto.moveTo(150, 50);
            contexto.lineTo(150, 100);
            contexto.stroke();
            break;
        case 7:
            // brazo izquierdo
            contexto.beginPath();
            contexto.moveTo(150, 60);
            contexto.lineTo(130, 80);
            contexto.stroke();
            break;
        case 8:
            // brazo derecho
            contexto.beginPath();
            contexto.moveTo(150, 60);
            contexto.lineTo(170, 80);
            contexto.stroke();
            break;
        case 9:
            // pierna izquierda
            contexto.beginPath();
            contexto.moveTo(150, 100);
            contexto.lineTo(130, 130);
            contexto.stroke();
            break;
        case 10:
            // pierna derecha
            contexto.beginPath();
            contexto.moveTo(150, 100);
            contexto.lineTo(170, 130);
            contexto.stroke();
            break;
    }
}
botonVolver.addEventListener('click', () => {
    window.history.back();

});
botonReiniciar.addEventListener('click', reiniciarJuego);
