const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const taxi = {
  x: 150,
  y: 500,
  width: 60,
  height: 100,
  speed: 5,
};

let xp = 0;
let fuel = 100;
let cash = 0;

const passengers = [];
const obstacles = [];

const shortLeft = new Audio("assets/shortleft.mp3");
const bgMusic = new Audio("assets/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;
bgMusic.play();

function drawTaxi() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(taxi.x, taxi.y, taxi.width, taxi.height);
}

function drawPassenger(p) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(o) {
  ctx.fillStyle = "gray";
  ctx.fillRect(o.x, o.y, o.width, o.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTaxi();

  passengers.forEach((p, i) => {
    p.y += 2;
    drawPassenger(p);
    if (
      p.y + 10 > taxi.y &&
      p.y - 10 < taxi.y + taxi.height &&
      p.x > taxi.x && p.x < taxi.x + taxi.width
    ) {
      shortLeft.play();
      xp += 10;
      fuel -= 5;
      cash += 20;
      passengers.splice(i, 1);
    }
  });

  obstacles.forEach((o, i) => {
    o.y += 3;
    drawObstacle(o);
    if (
      o.y < taxi.y + taxi.height &&
      o.y + o.height > taxi.y &&
      o.x < taxi.x + taxi.width &&
      o.x + o.width > taxi.x
    ) {
      alert("💥 Crash! Game over.");
      resetGame();
    }
  });

  document.getElementById("xp").innerText = xp;
  document.getElementById("fuel").innerText = fuel;
  document.getElementById("cash").innerText = cash;

  if (fuel <= 0) {
    alert("⛽ Out of fuel! Game over.");
    resetGame();
  }

  requestAnimationFrame(update);
}

function resetGame() {
  xp = 0;
  fuel = 100;
  cash = 0;
  passengers.length = 0;
  obstacles.length = 0;
}

function spawnPassenger() {
  passengers.push({ x: Math.random() * (canvas.width - 20) + 10, y: -10 });
}

function spawnObstacle() {
  obstacles.push({
    x: Math.random() * (canvas.width - 50),
    y: -20,
    width: 50,
    height: 30,
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") taxi.x -= taxi.speed;
  if (e.key === "ArrowRight") taxi.x += taxi.speed;
});

setInterval(spawnPassenger, 2000);
setInterval(spawnObstacle, 3000);

update();
