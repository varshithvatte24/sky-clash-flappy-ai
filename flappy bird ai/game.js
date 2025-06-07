const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const GRAVITY = 0.6;
const FLAP = -10;
const PIPE_WIDTH = 80;
const PIPE_SPEED = 2;
let PIPE_GAP;

let frame = 0;
let pipes = [];
let gameOver = false;

const popup = document.getElementById("gameOverPopup");
const finalScores = document.getElementById("finalScores");
const winnerMessage = document.getElementById("winnerMessage");

const bgImg = new Image();
bgImg.src = "1.gif";

const humanImg = new Image();
const aiImg = new Image();
humanImg.src = "human.png";
aiImg.src = "ai.png";

let highScore = localStorage.getItem("highScore") || 0;
highScore = parseInt(highScore);

class Bird {
  constructor(x, image, scale = 0.05) {
    this.x = x;
    this.y = canvas.height / 2;
    this.radius = Math.min(canvas.width, canvas.height) * scale;
    this.velocity = 0;
    this.score = 0;
    this.image = image;
    this.dead = false;
  }

  flap() {
    this.velocity = FLAP;
  }

  update() {
    this.velocity += GRAVITY;
    this.y += this.velocity;

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dead = true;
    }
  }

  draw() {
    ctx.globalAlpha = 0.85;
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.globalAlpha = 1;
  }
}

function createPipe() {
  const minHeight = 50;
  PIPE_GAP = canvas.height * 0.4;
  const top = Math.random() * (canvas.height - PIPE_GAP - 2 * minHeight) + minHeight;
  pipes.push({
    x: canvas.width,
    top,
    bottom: top + PIPE_GAP,
    scoredBy: new Set(),
  });
}

function updatePipes(bird1, bird2) {
  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i];
    pipe.x -= PIPE_SPEED;

    [bird1, bird2].forEach((bird) => {
      if (
        bird.x + bird.radius > pipe.x &&
        bird.x - bird.radius < pipe.x + PIPE_WIDTH &&
        (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)
      ) {
        bird.dead = true;
      }

      if (!bird.dead && pipe.x + PIPE_WIDTH < bird.x && !pipe.scoredBy.has(bird)) {
        bird.score++;
        pipe.scoredBy.add(bird);
      }
    });

    if (pipe.x + PIPE_WIDTH < 0) pipes.splice(i, 1);
  }

  if (frame % 150 === 0) createPipe();
}

function drawPipes() {
  for (let pipe of pipes) {
    ctx.fillStyle = "#228B22";
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, PIPE_WIDTH, canvas.height - pipe.bottom);
  }
}

const human = new Bird(canvas.width * 0.3, humanImg, 0.05);
const ai = new Bird(canvas.width * 0.15, aiImg, 0.075);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (gameOver) restartGame();
    else human.flap();
  }
});

canvas.addEventListener("click", () => {
  if (gameOver) restartGame();
  else human.flap();
});

function aiLogic(bird) {
  for (let pipe of pipes) {
    if (pipe.x + PIPE_WIDTH > bird.x) {
      if (bird.y > pipe.bottom - 40) bird.flap();
      break;
    }
  }
}

function endGame() {
  gameOver = true;

  // Only update highScore based on human score
  if (human.score > highScore) {
    highScore = human.score;
    localStorage.setItem("highScore", highScore);
  }

  finalScores.innerHTML = `
    <div style="font-size: 22px; margin-bottom: 10px;">💀 You Died!</div>
    Human Score: <b>${human.score}</b><br/>
    AI Score: <b>${ai.score}</b><br/>
    High Score: <b>${highScore}</b>
  `;

  winnerMessage.innerHTML = "";

  popup.classList.remove("hidden");
}

function restartGame() {
  frame = 0;
  pipes = [];
  gameOver = false;
  popup.classList.add("hidden");

  human.y = canvas.height / 2;
  human.velocity = 0;
  human.score = 0;
  human.dead = false;

  ai.y = canvas.height / 2;
  ai.velocity = 0;
  ai.score = 0;
  ai.dead = false;

  createPipe();
  gameLoop();
}

function gameLoop() {
  if (gameOver) return;

  frame++;
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  updatePipes(human, ai);
  drawPipes();

  human.update();
  aiLogic(ai);
  ai.update();

  // ❗ Only end the game when the HUMAN dies
  if (human.dead) {
    endGame();
    return;
  }

  human.draw();
  ai.draw();

  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText("Your score : " + human.score, 10, 30);
  ctx.fillText("High score : " + highScore, 10, 90);

  requestAnimationFrame(gameLoop);
}

let imagesLoaded = 0;
function tryStartGame() {
  imagesLoaded++;
  if (imagesLoaded === 3) {
    createPipe();
    gameLoop();
  }
}

humanImg.onload = tryStartGame;
aiImg.onload = tryStartGame;
bgImg.onload = tryStartGame;
