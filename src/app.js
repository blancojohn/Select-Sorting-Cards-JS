/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let palos = ["♦", "♥", "♠", "♣"];
let cartasDesordenadas = [];
console.log("Cuantas cartas quiere:", cartasDesordenadas);
let botónDraw = document.querySelector("#draw");

/* captura el valor pasado por el input */
function generaInputCartas() {
  cartasDesordenadas = [];
  let inputNumber = document.querySelector("#input-number");
  let inputNumberValue = inputNumber.value;
  console.log("Input pasado", inputNumberValue, "cartas");

  for (let i = 1; i <= inputNumberValue; i++) {
    cartasDesordenadas.push(generarCartas());
  }

  console.log("cartas repartidas:", cartasDesordenadas);
  return cartasDesordenadas;
}

let drawDesactivado = function() {
  this.disabled = true;
};
botónDraw.addEventListener("click", drawDesactivado, false);

/* Dibuja las cartas */
function generarCartas() {
  let mostrarCartas = document.querySelector("#mostrar-cartas");
  let carta = document.createElement("div");
  carta.classList.add("card");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let paloSuperior = document.createElement("div");
  paloSuperior.classList.add("position-absolute", "top-0", "start-0");
  let palosRandom = Math.floor(Math.random() * palos.length);
  let palo = palos[palosRandom];
  paloSuperior.innerHTML = palo;

  let numberCentral = document.createElement("div");
  let numberRandom = Math.floor(Math.random() * numbers.length);
  let number = numbers[numberRandom];
  numberCentral.innerHTML = changeValiu(number);

  let paloInferior = document.createElement("div");
  paloInferior.classList.add("position-absolute", "bottom-0", "end-0");
  paloInferior.innerHTML = palo;

  mostrarCartas.appendChild(carta);
  carta.appendChild(cardBody);
  cardBody.appendChild(paloSuperior);
  cardBody.appendChild(numberCentral);
  cardBody.appendChild(paloInferior);

  let objetoCarta = {
    palo: palo,
    number: number
  };

  if (palo == "♦" || palo == "♥") {
    paloSuperior.style.color = "red";
    paloInferior.style.color = "red";
    numberCentral.style.color = "red";
  } else {
    paloSuperior.style.color = "black";
    paloInferior.style.color = "black";
    numberCentral.style.color = "black";
  }
  return objetoCarta;
}

botónDraw.addEventListener("click", generaInputCartas);

let botonSort = document.querySelector("#sort");
console.log("BOTÓN", botonSort);

function selectionSort() {
  const len =
    cartasDesordenadas.length; /* len es la longitud de cartas a recorrer en el primer ciclo for */
  console.log("Cantidad de cartas a ordenar:", len);

  let cartasOrdenadas = document.querySelector("#cartas-ordenadas");
  console.log("DIV", cartasOrdenadas);
  for (let i = 0; i < len - 1; i++) {
    /* Inicia for desde el primer elemento porque necesito un punto de partida */
    let min = i; /* almacena el valor de la posición 0 para comenzar comparación en el segundo for*/
    for (let j = i + 1; j < len; j++) {
      /* J inicia el for cada vez que la posición sea menor a las posiciones en len e inicia el ciclo en la siguiente posición por cada vuelta del for y evita comparar consigo mismo para compararse con el resto del array hasta la última posición */ /* este for encuentra el elemento menor */
      if (cartasDesordenadas[j].number < cartasDesordenadas[min].number) {
        /* Condiciona y accede a los valores del objeto carta por el atributo number para comparar en que posición está el atributo con valor menor */
        min = j; /* min va a valer lo que esté en la posición j de menor a mayor */
      }
    }
    if (min !== i) {
      /* condiciona para ejecutar el intercambio con los valores por atributo por posción actual de i. Porque en el primer for i es la longitud del array con el atributo number desordenado
    En la primera condición se compara las posiciones por valor de atributo para ordenar de menor a mayor y se almacenan
    en min */
      const temp = cartasDesordenadas[i];
      cartasDesordenadas[i] = cartasDesordenadas[min];
      cartasDesordenadas[min] = temp;
    }
    let contenedor = document.createElement("div");
    contenedor.classList.add("d-flex");

    for (let x = 0; x < len; x++) {
      let cartaEnOrden = document.createElement("div");
      cartaEnOrden.classList.add("card");

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let paloSuperior = document.createElement("div");
      paloSuperior.classList.add("position-absolute", "top-0", "start-0");
      paloSuperior.innerHTML = cartasDesordenadas[x].palo;

      let numberCentral = document.createElement("div");
      numberCentral.innerHTML = changeValiu(cartasDesordenadas[x].number);

      let paloInferior = document.createElement("div");
      paloInferior.classList.add("position-absolute", "bottom-0", "end-0");
      paloInferior.innerHTML = cartasDesordenadas[x].palo;

      cartasOrdenadas.appendChild(contenedor);
      contenedor.appendChild(cartaEnOrden);
      cartaEnOrden.appendChild(cardBody);
      cardBody.appendChild(paloSuperior);
      cardBody.appendChild(numberCentral);
      cardBody.appendChild(paloInferior);

      if (
        cartasDesordenadas[x].palo == "♦" ||
        cartasDesordenadas[x].palo == "♥"
      ) {
        paloSuperior.style.color = "red";
        paloInferior.style.color = "red";
        numberCentral.style.color = "red";
      } else {
        paloSuperior.style.color = "black";
        paloInferior.style.color = "black";
        numberCentral.style.color = "black";
      }
    }
  }
  console.log("cartas ordenadas:", cartasDesordenadas);
}

botonSort.addEventListener("click", selectionSort);

function changeValiu(value) {
  switch (value) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";

    default:
      return value;
  }
}
