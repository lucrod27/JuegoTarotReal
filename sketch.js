let preguntas = [
  "¿Cómo te describirías?",
  "¿Qué haces ante una decisión importante?",
  "Tu mayor motivación es...",
  "Al enfrentar un problema, ¿cómo reaccionas?",
  "En tus relaciones, te consideras...",
  "Tu filosofía de vida se acerca más a:",
  "¿Qué valoras más?",
  "Frente a algo desconocido, ¿cómo reaccionas?",
  "Tu principal fortaleza es...",
  "¿Cómo manejas las sorpresas de la vida?",
  "Tu actitud hacia la espiritualidad es...",
  "Si algo no sale como esperabas...",
  "Tus amigos te describen como...",
  "Cuando planificas el futuro...",
  "Para ti, el éxito es..."
];

let opciones = [
  ["Espontáneo/a (0)", "Práctico/a (1)", "Sabio/a (2)"],
  ["Actúo sin pensar (0)", "Lo pienso un poco (1)", "Analizo todo (2)"],
  ["Explorar (0)", "Metas (1)", "Comprender (2)"],
  ["Reacciono (0)", "Pido ayuda (1)", "Reflexiono (2)"],
  ["Idealista (0)", "Comprometido/a (1)", "Independiente (2)"],
  ["Vivir el momento (0)", "Todo tiene un orden (1)", "Aprender (2)"],
  ["Libertad (0)", "Justicia (1)", "Sabiduría (2)"],
  ["Emoción (0)", "Curiosidad (1)", "Observar (2)"],
  ["Energía (0)", "Determinación (1)", "Paciencia (2)"],
  ["Me encantan (0)", "Me adapto (1)", "Busco el sentido (2)"],
  ["No me importa (0)", "Creo algo (1)", "Siempre busco crecer (2)"],
  ["Sigo adelante (0)", "Aprendo y reintento (1)", "Analizo (2)"],
  ["Divertido/a (0)", "Confiable (1)", "Sabio/a (2)"],
  ["No planifico (0)", "Planifico flexible (1)", "Planifico todo (2)"],
  ["Aventuras (0)", "Metas (1)", "Sabiduría (2)"]
];

let significados = Array.from({length: 21}, (_, i) => `Este es el significado número ${i}.`);

let cartaImagenes = [];
let preguntaActual = 0;
let puntaje = 0;
let juegoTerminado = false;
let seleccion = -1;

function preload() {
  for (let i = 0; i < 21; i++) {
    cartaImagenes[i] = loadImage("assets/carta" + i + ".jpg");
  }
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(250);

  if (!juegoTerminado) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarPregunta() {
  fill(0);
  textSize(24);
  text("Pregunta " + (preguntaActual + 1) + " de 15", width / 2, 40);

  textSize(20);
  text(preguntas[preguntaActual], width / 2, 100);

  for (let i = 0; i < 3; i++) {
    let y = 180 + i * 80;
    fill(i === seleccion ? "#aaf" : "#ddd");
    rect(width / 2 - 150, y, 300, 60, 10);
    fill(0);
    text(opciones[preguntaActual][i], width / 2, y + 30);
  }

  if (seleccion !== -1) {
    fill("#4CAF50");
    rect(width / 2 - 100, 480, 200, 50, 10);
    fill(255);
    text("Siguiente", width / 2, 505);
  }
}

function mostrarResultado() {
  fill(0);
  textSize(26);
  text("Tu carta es:", width / 2, 40);

  let index = constrain(puntaje, 0, 20);
  let img = cartaImagenes[index];
  imageMode(CENTER);
  image(img, width / 2, 250, 300, 400);

  fill(0);
  textSize(18);
  textAlign(CENTER);
  text(significados[index], width / 2, 500, 600);

  fill("#2196F3");
  rect(width / 2 - 100, 540, 200, 40, 10);
  fill(255);
  text("Volver a empezar", width / 2, 560);
}

function mousePressed() {
  if (!juegoTerminado) {
    for (let i = 0; i < 3; i++) {
      let y = 180 + i * 80;
      if (
        mouseX > width / 2 - 150 &&
        mouseX < width / 2 + 150 &&
        mouseY > y &&
        mouseY < y + 60
      ) {
        seleccion = i;
      }
    }

    if (
      seleccion !== -1 &&
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > 480 &&
      mouseY < 530
    ) {
      puntaje += seleccion;
      seleccion = -1;
      preguntaActual++;
      if (preguntaActual >= preguntas.length) {
        juegoTerminado = true;
      }
    }
  } else {
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > 540 &&
      mouseY < 580
    ) {
      preguntaActual = 0;
      puntaje = 0;
      seleccion = -1;
      juegoTerminado = false;
    }
  }
}
