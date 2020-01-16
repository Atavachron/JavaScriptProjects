const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakebutton = document.querySelector(".shake");
const MOVE_AMT = 50;

//Setting up canvas
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMT;

const width = canvas.width;
const height = canvas.height;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

//Placing the dot on the screen a random point
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//Draw Function
//takes an options object as an argument
function draw({ key }) {
  hue = hue + 1;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);

  switch (key) {
    case "ArrowUp":
      y = y - MOVE_AMT;
      break;
    case "ArrowDown":
      y = y + MOVE_AMT;
      break;
    case "ArrowLeft":
      x = x - MOVE_AMT;
      break;
    case "ArrowRight":
      x = x + MOVE_AMT;
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

//Function to handle the keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault(); //prevents arrow keys from scrolling the page by default
    draw({ key: e.key });
  }
}

//Key listeners
window.addEventListener("keydown", handleKey);
