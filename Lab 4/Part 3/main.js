// Setting up the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate a random number
function getRandomNumber(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

// Function to generate a random color
function getRandomRGB() {
  return `rgb(${getRandomNumber(0, 255)},${getRandomNumber(0, 255)},${getRandomNumber(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  detectCollision() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = getRandomRGB();
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 10) {
  const size = getRandomNumber(10, 20);
  const ball = new Ball(
    getRandomNumber(0 + size, width - size),
    getRandomNumber(0 + size, height - size),
    getRandomNumber(-7, 7),
    getRandomNumber(-7, 7),
    getRandomRGB(),
    size
  );

  balls.push(ball);
}

function animationLoop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.detectCollision();
  }
  
  requestAnimationFrame(animationLoop);
}

animationLoop();
