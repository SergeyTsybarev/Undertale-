const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; //Время до рестарта

// Мячик
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 2,
  dx: 2,
  dy: -2,
  visible: true
};

// Платформа
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true
};

// Кирпичики
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

// Создание кирпичиков
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Отрисовка мяча на холсте
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? '#47A76A' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Отрисовка платформы на холсте
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ?  '#34C924' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Ведение Счёта
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Счёт: ${score}`, canvas.width - 100, 30);
}

// Отрисовка кирпичей на холсте
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#3BB08F' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Передвижение платформы по холсту
function movePaddle() {
  paddle.x += paddle.dx;

  // Стенки
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
    }
}

// Движение мяча по холсту
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Столкновение со стенками холста (Левая и правая стены)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  // Столкновение со стенками (Верх и низ)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Столкновение с платформой
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Столкновение с кирпичиком
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // Проверка левой стороны
          ball.x + ball.size < brick.x + brick.w && // Проверка правой стороны
          ball.y + ball.size > brick.y && // Проверка верха
          ball.y - ball.size < brick.y + brick.h // Проверка низа
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  //касание нижней линии= проигрыш
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Очки
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickColumnCount) === 0) {

      ball.visible = false;
      paddle.visible = false;

      //Рестарт
      setTimeout(function () {
          showAllBricks();
          score = 0;
          paddle.x = canvas.width / 2 - 40;
          paddle.y = canvas.height - 20;
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
          ball.visible = true;
          paddle.visible = true;
      },delay)
  }
}

// Отображение всех кирпичей
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}

// Отрисовка
function draw() {
  // очищение холста
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Апдейт отрисовки
function update() {
  movePaddle();
  moveBall();

  // Отрисовка
  draw();

  requestAnimationFrame(update);
}

update();

// Управление клавишами
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Обработчики действий клавиш
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
