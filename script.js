const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];

const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"];

for (let i = 0; i < 150; i++) {
  confettiPieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 150,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10,
  });
}

let angle = 0;

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angle += 0.01;

  confettiPieces.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += Math.cos(angle + p.d) + 2;
    p.x += Math.sin(angle);

    if (p.y > canvas.height) {
      confettiPieces[i].y = -10;
      confettiPieces[i].x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

drawConfetti();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
