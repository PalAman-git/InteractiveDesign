const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const Array = [
  "#042940",
  "#005C53",
  "#9FC131",
  "#DBF227",
  "#D6D58E",
];
//function to ensure that the canvas goes to the original size when ever we run it
window.addEventListener("resize", () => {
 
});


const c = canvas.getContext("2d");
let maxRadius = 40;
let minRadius = 2;

//using the object oreinted javascript for creating multiple circles
function Circle(x, y, dy, dx, radius) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.dx = dx;
  this.radius = radius;
  this.minRadius = radius;
  this.color = Array[Math.floor(Math.random()*Array.length)];

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = RandomColor();
    // c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = () => {
    if (
      this.radius + this.x + this.dx >= canvas.width ||
      this.dx + this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    } else {
      this.x += this.dx;
    }
    if (
      this.radius + this.y + this.dy >= canvas.height ||
      this.dy + this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
    } else {
      this.y += this.dy;
    }
    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius <= maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }

    //drawing after updating
    this.draw();
  };
}

//mouse position
let mouse = {
  x: undefined,
  y: undefined,
};
// function to add interactivity
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

//creating 100 circles and storing them in the array
let CircleArray = [];

for (let i = 0; i < 1000; i++) {
  let radius = (Math.random() * 50)+ 1;

  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  //giving random velocity
  dx = 2 * (Math.random() * -0.5);
  dy = 2 * (Math.random() * -0.5);
  y = Math.random() * (innerHeight - 2 * radius) + radius;
  CircleArray.push(new Circle(x, y, dy, dx, radius));
}

//for animation
function animate() {
  c.fillStyle = "white";
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < CircleArray.length; i++) {
    CircleArray[i].update();
  }
  window.requestAnimationFrame(animate);
}
animate();
