let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    let nombreNormalizado = nombre.toLowerCase();
    if (amigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botón de eliminar 
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("delete-btn");
        
        // Evento para eliminar el amigo
        btnEliminar.addEventListener("click", () => eliminarAmigo(index));

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar del array
    actualizarLista(); // Actualizar la lista en pantalla
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 amigos para hacer el sorteo.");
        return;
    }

    let shuffled = [...amigos];

    // Asegurar que nadie se autoasigne
    do {
        shuffled.sort(() => Math.random() - 0.5);
    } while (shuffled.some((amigo, index) => amigo === amigos[index]));

    let asignaciones = {};
    for (let i = 0; i < amigos.length; i++) {
        asignaciones[amigos[i]] = shuffled[i];
    }

    mostrarResultado(asignaciones);
}

function mostrarResultado(resultado) {
    let participantes = Object.keys(resultado);
    let elegido = participantes[Math.floor(Math.random() * participantes.length)];
    let suAmigoSecreto = resultado[elegido];

    document.getElementById("mensaje").textContent = `Tu amigo secreto es: "${suAmigoSecreto}"`;
    document.getElementById("modal").style.display = "block";

    // Eliminar al amigo secreto de la lista
    amigos = amigos.filter(amigo => amigo !== suAmigoSecreto);

    actualizarLista();
}

document.getElementById("cerrarModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

function reiniciarJuego() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    alert("El juego ha sido reiniciado.");
}
