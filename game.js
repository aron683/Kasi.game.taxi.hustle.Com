const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Basic intro
ctx.fillStyle = "#fff";
ctx.font = "26px sans-serif";
ctx.fillText("🚕 Kasi Hustle: Taxi Wars", 50, 100);

// Sound
const bgMusic = new Audio("assets/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.6;
bgMusic.play();
