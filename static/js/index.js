AOS.init({ once: true, duration: 900 });

// Burger menu
const burger = document.getElementById('burger');
burger?.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('hidden');
  nav.classList.toggle('flex');
  nav.classList.toggle('flex-col');
  nav.classList.toggle('gap-4');
  nav.classList.toggle('mt-4');
});

// Interactive circles
const container = document.querySelector('.hero-graphics');
const circles = Array.from(document.querySelectorAll('.interactive-circle'));

const positions = circles.map(() => ({
  x: Math.random() * container.clientWidth,
  y: Math.random() * container.clientHeight
}));

const velocities = circles.map(() => ({
  x: (Math.random() - 0.5) * 2,
  y: (Math.random() - 0.5) * 2
}));

const httpsPositions = [
  {x:0.1, y:0.3}, {x:0.1, y:0.4}, {x:0.1, y:0.5}, // H
  {x:0.2, y:0.3}, {x:0.2, y:0.4}, {x:0.2, y:0.5}, // H
  {x:0.3, y:0.3}, {x:0.3, y:0.4}, {x:0.3, y:0.5}, // T
  {x:0.4, y:0.3}, {x:0.4, y:0.4}, {x:0.4, y:0.5}, // P
  {x:0.5, y:0.3}, {x:0.5, y:0.4}, {x:0.5, y:0.5}  // S
];

let showWord = false;
const wordDuration = 2000;

function animate() {
  circles.forEach((circle, i) => {
    if (showWord) {
      const target = httpsPositions[i % httpsPositions.length];
      positions[i].x += (target.x * container.clientWidth - positions[i].x) * 0.1;
      positions[i].y += (target.y * container.clientHeight - positions[i].y) * 0.1;
    } else {
      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;
      if (positions[i].x < 0 || positions[i].x > container.clientWidth - 50) velocities[i].x *= -1;
      if (positions[i].y < 0 || positions[i].y > container.clientHeight - 50) velocities[i].y *= -1;
    }
    circle.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
  });
  requestAnimationFrame(animate);
}

animate();

// Показ HTTPS каждые 10 секунд
setInterval(() => {
  showWord = true;
  setTimeout(() => { showWord = false; }, wordDuration);
}, 10000);
