const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let muse = {
  x: 0,
  y: 0,
};

class particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;

    this.radius = 2;
  }

  lines() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = "gray";
    ctx.stroke();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "gray";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x >= canvas.width) {
      this.vx *= -1;
    }

    if (this.y <= 0 || this.y >= canvas.height) {
      this.vy *= -1;
    }

    const dx = muse.x - this.x;
    const dy = muse.y - this.y;

    const des = Math.hypot(dx, dy);

    if (des < 150) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(muse.x, muse.y);
      ctx.strokeStyle = "gray";
      ctx.stroke();
    }

    this.draw();
    this.lines();
  }
}

const particles = [];

for (let i = 0; i < 300; i++) {
  particles.push(
    new particle(Math.random() * canvas.width, Math.random() * canvas.height),
  );
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  cparticals();
  requestAnimationFrame(animation);
}
animation();

// window.addEventListener("mousemove", (e) => {
//   muse.x = e.clientX;
//   muse.y = e.clientY;
// });

function cparticals() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;

      const des = Math.hypot(dx, dy);

      if (des < 60) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "gray";
        ctx.stroke();
      }
    }
  }
}
