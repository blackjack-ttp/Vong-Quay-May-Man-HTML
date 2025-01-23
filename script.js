// Cấu hình vòng quay
const segments = [
  { name: "Hẹn bé lần sau!", probability: 20 },
  { name: "Nhân 2 số lượng kẹo", probability: 5 },
  { name: "Hẹn bé lần sau!", probability: 20 },
  { name: "Chia 2 số lượng kẹo", probability: 5 },
  { name: "Hẹn bé lần sau!", probability: 20 },
  { name: "Thêm 4 viên kẹo", probability: 5 },
  { name: "Hẹn bé lần sau!", probability: 20 },
  { name: "Trừ 3 viên kẹo", probability: 5 },
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const radius = canvas.width / 2;
let spinAngle = 0;

// Lấy thẻ âm thanh
const spinSound = document.getElementById('spinSound');


// Vẽ vòng quay với các phần đều nhau
function drawWheel() {
  const segmentAngle = (2 * Math.PI) / segments.length;
  let currentAngle = 0;

  segments.forEach((segment) => {
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, currentAngle, currentAngle + segmentAngle);
    ctx.closePath();
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Vẽ text
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(currentAngle + segmentAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000000";
    ctx.font = "16px Arial";
    ctx.fillText(segment.name, radius - 20, 5);
    ctx.restore();

    currentAngle += segmentAngle;
  });
}

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

// Hiển thị popup kết quả
function showPopup(result) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px 30px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #333";
  popup.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.3)";
  popup.style.fontSize = "18px";
  popup.style.fontWeight = "bold";
  popup.style.textAlign = "center";
  popup.innerText = `Bạn đã trúng: ${result.name}!`;

  const closeButton = document.createElement("button");
  closeButton.innerText = "Đóng";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "10px 20px";
  closeButton.style.backgroundColor = "#ff5722";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", () => popup.remove());

  popup.appendChild(closeButton);
  document.body.appendChild(popup);
}

// Quay vòng
document.getElementById("spinButton").addEventListener("click", () => {
  const randomDegree = Math.random() * 360;
  const randomSegment = weightedRandom();
  const stopAngle =
    360 -
    randomDegree +
    segments.indexOf(randomSegment) * (360 / segments.length);
  const spins = 5 * 360;

  spinAngle += spins + stopAngle;

  // Phát âm thanh
  spinSound.currentTime = 0; // Đặt lại thời gian phát về 0
  spinSound.play();          // Bắt đầu phát âm thanh


  canvas.style.transform = `rotate(${spinAngle}deg)`;

  setTimeout(() => {
    spinSound.pause();      // Dừng âm thanh
    showPopup(randomSegment);
  }, 4000);
});

// Tạo mảng weighted
function weightedRandom() {
  const weightedArray = [];
  segments.forEach((segment) => {
    for (let i = 0; i < segment.probability; i++) {
      weightedArray.push(segment);
    }
  });
  return weightedArray[Math.floor(Math.random() * weightedArray.length)];
}

drawWheel();
