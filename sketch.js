<script src="p5.min.js"></script>
<script src="sketch.js" defer></script>
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
// Variables de estado del juego
let preguntas;
let imagenes = [];
let indicePregunta = 0;
let puntaje = 0;
let estado = "quiz";  // "quiz" mientras se muestran preguntas, "resultado" para la pantalla final

// Ajustes de interfaz
let margenX = 0.1;                 // margen lateral como fracción del ancho (10%)
let margenY = 0.1;                 // margen superior como fracción del alto (10%)
let proporcionAreaPregunta = 0.4;  // proporción de la altura reservada para el texto de la pregunta (40%)

// Pre-cargar las imágenes de resultados en el arreglo 'imagenes'
function preload() {
  // Cargar 21 imágenes: carta0.jpg, ..., carta20.jpg desde la carpeta assets
  for (let i = 0; i <= 20; i++) {
    imagenes[i] = loadImage(`assets/carta${i}.jpg`);
  }
}

function setup() {
  // Crear un canvas que ocupe toda la ventana del navegador
  createCanvas(windowWidth, windowHeight);

  // Definir las preguntas del quiz (15 preguntas)
  // Cada pregunta tiene: texto, arreglo de opciones, y arreglo de valores (puntaje por elegir cada opción)
  preguntas = [
    {
      texto: "Pregunta 1: ¿Ejemplo de texto de la pregunta 1?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0,         1,          0,          0         ]  // solo "Opción B" suma 1 punto
    },
    {
      texto: "Pregunta 2: ¿Ejemplo de texto de la pregunta 2?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [1,         0,          0,          0         ]  // solo "Opción A" suma 1 punto
    },
    {
      texto: "Pregunta 3: ¿Ejemplo de texto de la pregunta 3?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 0, 1]  // "Opción D" suma 1 punto
    },
    {
      texto: "Pregunta 4: ¿Ejemplo de texto de la pregunta 4?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [1, 0, 0, 0]  // "Opción A" suma 1 punto
    },
    {
      texto: "Pregunta 5: ¿Ejemplo de texto de la pregunta 5?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 1, 0, 0]  // "Opción B" suma 1 punto
    },
    {
      texto: "Pregunta 6: ¿Ejemplo de texto de la pregunta 6?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 1, 0]  // "Opción C" suma 1 punto
    },
    {
      texto: "Pregunta 7: ¿Ejemplo de texto de la pregunta 7?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 0, 1]  // "Opción D" suma 1 punto
    },
    {
      texto: "Pregunta 8: ¿Ejemplo de texto de la pregunta 8?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [1, 0, 0, 0]  // "Opción A" suma 1 punto
    },
    {
      texto: "Pregunta 9: ¿Ejemplo de texto de la pregunta 9?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 1, 0, 0]  // "Opción B" suma 1 punto
    },
    {
      texto: "Pregunta 10: ¿Ejemplo de texto de la pregunta 10?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 1, 0]  // "Opción C" suma 1 punto
    },
    {
      texto: "Pregunta 11: ¿Ejemplo de texto de la pregunta 11?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 0, 1]  // "Opción D" suma 1 punto
    },
    {
      texto: "Pregunta 12: ¿Ejemplo de texto de la pregunta 12?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [1, 0, 0, 0]  // "Opción A" suma 1 punto
    },
    {
      texto: "Pregunta 13: ¿Ejemplo de texto de la pregunta 13?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 1, 0, 0]  // "Opción B" suma 1 punto
    },
    {
      texto: "Pregunta 14: ¿Ejemplo de texto de la pregunta 14?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0, 0, 1, 0]  // "Opción C" suma 1 punto
    },
    {
      texto: "Pregunta 15: ¿Ejemplo de texto de la pregunta 15?",
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      valores:  [0,         0,          1,          0         ]  // solo "Opción C" suma 1 punto
    }
  ];

  // (Puedes editar el arreglo 'preguntas' para poner tus propias preguntas, opciones y valores)

  textAlign(LEFT, TOP);   // Alineación de texto: izquierda y arriba para dibujar texto cómodamente
  rectMode(CORNER);       // Los rectángulos se dibujarán desde la esquina superior izquierda (modo por defecto)
}

function draw() {
  background(255);  // Limpiar fondo a blanco en cada fotograma

  // Ajustar tamaño de texto según ancho (mínimo 16px para legibilidad)
  textSize(max(16, width / 30));
  textLeading(textSize() * 1.2);  // interlineado del texto

  // Calcular márgenes en píxeles basados en las fracciones definidas
  let marginXPix = width * margenX;
  let marginYPix = height * margenY;

  if (estado === "quiz") {
    // *** Pantalla de Pregunta en curso ***
    fill(0);
    textStyle(BOLD);
    // Determinar área para la pregunta (alto máximo para el texto de la pregunta)
    let areaPreguntaH = height * proporcionAreaPregunta;
    // Dibujar el texto de la pregunta dentro de un recuadro imaginario de ancho 80% del canvas y alto areaPreguntaH
    text(preguntas[indicePregunta].texto, marginXPix, marginYPix, width * 0.8, areaPreguntaH);

    // Posición inicial para las opciones (un poco debajo del área de texto de la pregunta)
    let opcionesStartY = marginYPix + areaPreguntaH + 20;
    textStyle(NORMAL);

    // Dibujar cada opción como un botón rectangular
    let opc = preguntas[indicePregunta].opciones;
    for (let i = 0; i < opc.length; i++) {
      // Dimensiones y posición de cada botón de opción
      let btnW = width * 0.8;
      let btnH = max(40, width * 0.08);  // altura mínima 40px, o 8% del ancho (lo que sea mayor)
      let btnX = marginXPix;
      let btnY = opcionesStartY + i * (btnH + 15);  // separadas 15px verticalmente

      // Color de fondo del botón: resaltar si el mouse está encima (hover)
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        fill(180);  // gris más oscuro al pasar el cursor
      } else {
        fill(220);  // gris claro base
      }
      stroke(0);
      strokeWeight(1);
      rect(btnX, btnY, btnW, btnH, 5);  // dibujar el rectángulo del botón con esquinas redondeadas

      // Dibujar el texto de la opción dentro del botón
      fill(0);
      textAlign(LEFT, TOP);
      text(opc[i], btnX + 10, btnY + 10, btnW - 20, btnH - 20);
    }

  } else if (estado === "resultado") {
    // *** Pantalla de Resultado Final ***

    // Determinar el índice de imagen según el puntaje (clamp entre 0 y 20)
    let indiceImagen = puntaje;
    if (indiceImagen > 20) indiceImagen = 20;
    if (indiceImagen < 0) indiceImagen = 0;

    // Mostrar la imagen de resultado escalada al tamaño del canvas
    let img = imagenes[indiceImagen];
    if (img) {
      // Calcular escala para ajustar la imagen a la ventana sin distorsión
      let imgW = img.width;
      let imgH = img.height;
      let escala = min(width / imgW, height / imgH);
      let nuevoW = imgW * escala;
      let nuevoH = imgH * escala;
      image(img, width/2 - nuevoW/2, height/2 - nuevoH/2, nuevoW, nuevoH);
    }

    // Texto de resultado sobre la imagen
    fill(0);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    textSize(max(18, width / 25));
    text("Resultado del test:", width / 2, marginYPix);
    textSize(max(16, width / 30));
    text("Puntaje obtenido: " + puntaje, width / 2, marginYPix + 30);

    // Botón "Reiniciar" para volver a jugar
    let btnW = 120;
    let btnH = 40;
    let btnX = width / 2 - btnW / 2;
    let btnY = height - btnH - 30;
    fill(200);
    stroke(0);
    rect(btnX, btnY, btnW, btnH, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textSize(16);
    text("Reiniciar", btnX + btnW/2, btnY + btnH/2);
  }
}

function mousePressed() {
  if (estado === "quiz") {
    // Detectar selección de una opción durante la fase de preguntas
    let marginXPix = width * margenX;
    let marginYPix = height * margenY;
    let areaPreguntaH = height * proporcionAreaPregunta;
    let opcionesStartY = marginYPix + areaPreguntaH + 20;
    let opc = preguntas[indicePregunta].opciones;
    let btnW = width * 0.8;
    let btnH = max(40, width * 0.08);
    for (let i = 0; i < opc.length; i++) {
      let btnX = marginXPix;
      let btnY = opcionesStartY + i * (btnH + 15);
      if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        // Opción i seleccionada
        puntaje += preguntas[indicePregunta].valores[i] || 0;  // sumar puntaje (0 o 1 por defecto)
        indicePregunta++;
        // Si hemos llegado más allá de la última pregunta, mostrar resultado
        if (indicePregunta >= preguntas.length) {
          estado = "resultado";
        }
        break;  // salir del bucle una vez encontrada la opción cliqueada
      }
    }

  } else if (estado === "resultado") {
    // Detectar clic en el botón Reiniciar durante la pantalla de resultado
    let btnW = 120;
    let btnH = 40;
    let btnX = width / 2 - btnW / 2;
    let btnY = height - btnH - 30;
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      // Reiniciar el juego
      puntaje = 0;
      indicePregunta = 0;
      estado = "quiz";
    }
  }
}

function windowResized() {
  // Ajustar el canvas si cambia el tamaño de la ventana (ej. rotación de pantalla móvil)
  resizeCanvas(windowWidth, windowHeight);
}
