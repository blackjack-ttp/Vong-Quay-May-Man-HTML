// Cấu hình vòng quay
const segments = [
  { name: "Hẹn bé lần sau!", probability: 21 },
  { name: "Nhân 2 số lượng kẹo", probability: 2 },
  { name: "Thêm 1 viên kẹo", probability: 20 },
  { name: "Thêm 5 viên kẹ", probability: 5 },
  { name: "Hẹn bé lần sau!", probability: 21 },
  { name: "Thêm 4 viên kẹo", probability: 5 },
  { name: "Thêm 2 viên kẹo", probability: 21 },
  { name: "Trừ 3 viên kẹo", probability: 5 },
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const radius = canvas.width / 2;
let spinAngle = 0;

// Lấy thẻ âm thanh
const spinSound = document.getElementById('spinSound');

// Vẽ vòng quay với các phần đều nhau
function drawWheel() {
  const segmentAngle = (2 * Math.PI) / segments.length;
  let currentAngle = 0;
  const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];

  segments.forEach((segment, index) => {
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, currentAngle, currentAngle + segmentAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vẽ text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(currentAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "23px Arial";
      ctx.fillText(segment.name, radius - 20, 5);
      ctx.restore();

      currentAngle += segmentAngle;
  });
}

// Tạo hiệu ứng confetti
const confettiCanvas = document.getElementById('confetti');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

function startConfetti() {
  const confetti = [];
  const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#E91E63'];

  for (let i = 0; i < 100; i++) {
      confetti.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * confettiCanvas.height - confettiCanvas.height,
          r: Math.random() * 4 + 2,
          d: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 20 - 10
      });
  }

  const interval = setInterval(() => {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      confetti.forEach(particle => {
          particle.y += particle.d;
          particle.tilt += 0.05;
          confettiCtx.beginPath();
          confettiCtx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
          confettiCtx.fillStyle = particle.color;
          confettiCtx.fill();
      });

      if (confetti.every(p => p.y > confettiCanvas.height)) {
          clearInterval(interval);
      }
  }, 30);
}

// Tạo hiệu ứng pháo hoa
function startFireworks() {
  const fireworksCanvas = document.createElement('canvas');
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  fireworksCanvas.style.position = 'fixed';
  fireworksCanvas.style.top = 0;
  fireworksCanvas.style.left = 0;
  fireworksCanvas.style.zIndex = 9999;
  document.body.appendChild(fireworksCanvas);

  const ctx = fireworksCanvas.getContext('2d');
  const particles = [];
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];

  function createParticle() {
      const x = Math.random() * fireworksCanvas.width;
      const y = Math.random() * fireworksCanvas.height / 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 4 + 1;
      const speedX = Math.random() * 4 - 2;
      const speedY = Math.random() * 4 - 2;
      particles.push({ x, y, color, size, speedX, speedY });
  }

  function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.size -= 0.1;
          if (p.size <= 0) {
              particles.splice(i, 1);
          }
      }
  }

  function drawParticles() {
      ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
      });
  }

  function loop() {
      createParticle();
      updateParticles();
      drawParticles();
      if (particles.length > 0) {
          requestAnimationFrame(loop);
      } else {
          document.body.removeChild(fireworksCanvas);
      }
  }

  loop();
}

// Hiển thị popup kết quả
function showPopup(result) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.backgroundColor = '#ffc107';
  popup.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
  popup.style.borderRadius = '10px';
  popup.style.textAlign = 'center';
  popup.style.fontSize = '20px';
  popup.style.fontFamily = 'Arial, sans-serif';
  popup.innerHTML = `<strong>We have a winner!</strong><br><br><span>${result}</span>`;

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.marginLeft = '10px';
  closeButton.style.marginTop = '10px';
  closeButton.style.padding = '10px 20px';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.backgroundColor = '#333';
  closeButton.style.color = '#fff';
  closeButton.style.cursor = 'pointer';

  closeButton.addEventListener('click', () => {
      document.body.removeChild(popup);
  });

  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

// Quay vòng
canvas.addEventListener('click', () => {
  const randomDegree = Math.random() * 360; // Góc quay ngẫu nhiên
  const spins = 10 * 360; // Số vòng quay
  spinAngle += spins + randomDegree; // Tính tổng góc quay


  // Phát âm thanh
  spinSound.currentTime = 0; // Đặt lại thời gian phát về 0
  spinSound.play();          // Bắt đầu phát âm thanh

  canvas.style.transform = `rotate(${spinAngle}deg)`; // Áp dụng góc quay

  setTimeout(() => {
      const resultSegment = getSegmentAtAngle(spinAngle % 360); // Xác định kết quả
      showPopup(resultSegment.name); // Hiển thị popup kết quả
      // startFireworks(); // Hiệu ứng pháo hoa
      spinSound.pause();      // Dừng âm thanh
  }, 5000);
});

function getSegmentAtAngle(angle) {
  const segmentAngle = 360 / segments.length; // Góc mỗi phân đoạn
  const adjustedAngle = (angle + segmentAngle / 1) % 360; // Điều chỉnh góc
  const correctedAngle = (360 - adjustedAngle + segmentAngle) % 360; // Đảm bảo mũi tên chỉ đúng vị trí
  const segmentIndex = Math.floor(correctedAngle / segmentAngle);
  return segments[segmentIndex];
}

function weightedRandom() {
  const weightedArray = [];
  segments.forEach(segment => {
      for (let i = 0; i < segment.probability; i++) {
          weightedArray.push(segment);
      }
  });
  return weightedArray[Math.floor(Math.random() * weightedArray.length)];
}


drawWheel();
startConfetti(); // Gọi hiệu ứng confetti