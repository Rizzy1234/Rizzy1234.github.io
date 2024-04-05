// set up canvas
const para1 = document.querySelector(".player1");
const para2 = document.querySelector(".player2");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size, exist) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exist = exist;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.size + this.x >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.size + this.y >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
  }collision() {
    for (let k = 0; k < balls.length; k++) {
      if (!(this === balls[k])) {
        const dx = this.x - balls[k].x;
        const dy = this.y - balls[k].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[k].size) {
          balls[k].color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
        }
      }
    }
  }
}const balls = [];

while (balls.length < 20) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-1, 10),
    random(-1, 10),
    randomRGB(),
    size,
    true
  );balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exist === true) {
      balls[i].draw();
      balls[i].update();
      balls[i].collision();
    }
  }

  requestAnimationFrame(loop);
}

loop();