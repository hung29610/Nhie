document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('mainContent');
  const lineElement = document.getElementById('line');
  const finalBlock = document.getElementById('final');
  const msgYes = document.getElementById('msgYes');
  const bgMusic = document.getElementById('bgMusic');
  const btnNo = document.getElementById('btnNo');

  const lines = [
  "Mình biết làm cái này thì cũng hơi trẩu thật , nhưng.."
  "..nếu không làm cái này thì nhắn qua những dòng tin nhắn thì nó quá bình thường"
  "Nên mình đã làm cái này để dành cho cậu. Xem nha:"
  "Nhi nè,",
  "Mình suy nghĩ rất nhiều mới dám nhắn tin này.",
  "Thật ra, từ lâu rồi mình đã có cảm tình với cậu.",
  "Mỗi lần nói chuyện với Nhi, mình đều thấy rất vui.",
  "Cảm giác đó ngày càng rõ ràng hơn theo thời gian.",
  "Mình không biết Nhi có cảm nhận được không nữa.",
  "Nhưng hôm nay, mình muốn nói ra thật lòng mình.",
  "Hùng thích Nhi 💗"
];

  let currentLine = 0;

  startButton.addEventListener('click', () => {
    intro.classList.remove('active');
    mainContent.classList.add('active');
    playBackgroundMusic();
    showLine(lines[currentLine]);
  });

  function playBackgroundMusic() {
    bgMusic.play().catch((error) => {
      console.error('Lỗi phát nhạc:', error);
    });
  }

  function showLine(text) {
    lineElement.innerHTML = '';
    let charIndex = 0;
    const p = document.createElement('p');
    p.style.margin = '12px 0';
    lineElement.appendChild(p);

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        p.innerHTML += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => fadeOutCurrentLine(() => {
          currentLine++;
          if (currentLine < lines.length) {
            showLine(lines[currentLine]);
          } else {
            lineElement.style.display = 'none';
            finalBlock.classList.add('active');
          }
        }), 850);
      }
    }, 70);
  }

  function fadeOutCurrentLine(callback) {
    lineElement.classList.add('fade-out');
    setTimeout(() => {
      lineElement.classList.remove('fade-out');
      lineElement.innerHTML = '';
      callback();
    }, 1000);
  }

  document.getElementById('btnYes').addEventListener('click', () => {
    finalBlock.classList.remove('active');
    msgYes.classList.add('active');
    bgMusic.pause();
    bgMusic.currentTime = 0;
  });

  btnNo.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${Math.random() * maxX}px`;
    btnNo.style.top = `${Math.random() * maxY}px`;
  });

  btnNo.addEventListener('click', () => {
    alert('Thôi mà, bấm lại nút "Đồng ý" nhaaa~');
  });
});
