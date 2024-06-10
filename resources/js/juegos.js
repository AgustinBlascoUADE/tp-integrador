const HTML_JUEGOS = [
    "juegos/horcado.html",
    "juegos/memotest.html",
    "juegos/signal-match.html",
    "juegos/trivia.html",
    "juegos/wordle-seguridad-vial.html"
]

const anchorAleatorio = document.getElementById("juego-aleatorio")

anchorAleatorio.addEventListener("click", () => {
    let palabraParaAdivinar = HTML_JUEGOS[Math.floor(Math.random() * HTML_JUEGOS.length)]
    anchorAleatorio.setAttribute("href", palabraParaAdivinar)
})