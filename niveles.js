
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "login.html";
}

const niveles = [
    {
        numero: 1,
        titulo: "Fundamentos de programación",
        descripcion: "Aprende variables, algoritmos y conceptos básicos.",
        dificultad: "Principiante"
    },
    {
        numero: 2,
        titulo: "HTML y CSS",
        descripcion: "Conoce la estructura y el diseño de páginas web.",
        dificultad: "Fácil"
    },
    {
        numero: 3,
        titulo: "JavaScript",
        descripcion: "Domina variables, funciones y eventos.",
        dificultad: "Intermedio"
    },
    {
        numero: 4,
        titulo: "Lógica de programación",
        descripcion: "Resuelve problemas con condiciones y ciclos.",
        dificultad: "Difícil"
    },
    {
        numero: 5,
        titulo: "Programación orientada a objetos",
        descripcion: "Aprende clases, objetos, métodos y propiedades.",
        dificultad: "Experto"
    }
];

const nivelActual = Number(localStorage.getItem("nivelActual")) || 1;
const nivelesCompletados = Number(localStorage.getItem("nivelesCompletados")) || 0;

const listaNiveles = document.getElementById("listaNiveles");

niveles.forEach(nivel => {

    const completado = nivel.numero <= nivelesCompletados;
    const disponible = nivel.numero <= nivelActual;

    const tarjeta = document.createElement("article");

    tarjeta.className = `nivel-card ${
        disponible ? "disponible" : "bloqueado"
    }`;

    let estado = "🔒 Bloqueado";

    if (completado) {
        estado = "✅ Completado";
    } else if (disponible) {
        estado = "🔓 Disponible";
    }

    tarjeta.innerHTML = `
        <div class="nivel-superior">
            <span class="numero-nivel">NIVEL ${nivel.numero}</span>
            <span class="estado">${estado}</span>
        </div>

        <h2>${nivel.titulo}</h2>

        <p>${nivel.descripcion}</p>

        <span class="dificultad">${nivel.dificultad}</span>

        <button
            class="btn-nivel"
            ${!disponible ? "disabled" : ""}
            data-nivel="${nivel.numero}">
            ${completado ? "REPETIR NIVEL" : disponible ? "JUGAR AHORA" : "BLOQUEADO"}
        </button>
    `;

    listaNiveles.appendChild(tarjeta);

});

const porcentaje = Math.round((nivelesCompletados / niveles.length) * 100);

document.getElementById("porcentaje").textContent = porcentaje + "%";

document.getElementById("barraProgreso").style.width = porcentaje + "%";

listaNiveles.addEventListener("click", function(event) {

    const boton = event.target.closest(".btn-nivel");

    if (!boton || boton.disabled) return;

    const numero = boton.dataset.nivel;

    window.location.href = `juego.html?nivel=${numero}`;

});

document.getElementById("cerrarSesion").addEventListener("click", function() {

    localStorage.removeItem("usuarioActivo");

    window.location.href = "login.html";

});
