const WIDTH = 1000,
    HEIGHT = 500,
    bgColor = '#5883D1',
    ballRadius = 20,
    racketWidth = 30,
    racketHeight = 150;

const leftScorText = document.getElementById('left'),
    rightScoreText = document.getElementById('right');

const svg = SVG().addTo('#game').size(WIDTH, HEIGHT);

const bgRect = svg.rect(WIDTH, HEIGHT).fill(bgColor);
const line = svg.line(500, 0, 500, 500).stroke({
    color: 'white',
    width: 5,
    dasharray: '30',
});
const ball = svg
    .circle()
    .radius(ballRadius)
    .cx(WIDTH / 2)
    .cy(HEIGHT / 2)
    .fill('white')
    .stroke({
        width: 2,
    });
const left = svg
    .rect(racketWidth, racketHeight)
    .fill('white')
    .stroke({
        color: 'white',
        width: 2,
    })
    .move(racketWidth, HEIGHT / 2 - racketHeight / 2);
const right = svg
    .rect(racketWidth, racketHeight)
    .fill('white')
    .stroke({
        color: 'white',
        width: 2,
    })
    .move(WIDTH - racketWidth * 2, HEIGHT / 2 - racketHeight / 2);
let changeX = 2;
let changeY = 2;
let changeLeftY = 0;
let changeRightY = 0;
let rightScore = 0;
let leftScore = 0;
function moveBall() {
    let x = ball.cx();
    let y = ball.cy();

    if (x + ballRadius >= WIDTH) {
        leftScore += 1;
        leftScorText.innerHTML = leftScore;
        changeX = -2;
    }
    if (x <= ballRadius) {
        rightScore += 1;
        rightScoreText.innerHTML = rightScore;
        changeX = +2;
    }

    if (x + ballRadius >= WIDTH || x <= ballRadius) {
        x = WIDTH / 2;
        y = HEIGHT / 2;
    }
    if (y + ballRadius >= HEIGHT || y <= ballRadius) {
        changeY *= -1;
    }

    x += changeX;
    y += changeY;

    if (
        x + ballRadius > right.x() &&
        y + ballRadius > right.y() &&
        y + ballRadius < right.y() + racketHeight
    ) {
        changeX *= -1;
        x = right.x() - ballRadius;
    }
    if (
        x - ballRadius < left.x() + racketWidth &&
        y + ballRadius > left.y() &&
        y + ballRadius < left.y() + racketHeight
    ) {
        changeX *= -1;
        x = left.x() + ballRadius + racketWidth;
    }

    if (right.y() <= 0) {
        right.y(0);
    }
    if (right.y() >= HEIGHT - racketHeight) {
        right.y(HEIGHT - racketHeight);
    }

    if (left.y() <= 0) {
        left.y(0);
    }
    if (left.y() >= HEIGHT - racketHeight) {
        left.y(HEIGHT - racketHeight);
    }

    ball.cx(x);
    ball.cy(y);
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'w') {
        changeLeftY -= 5;
        left.dy(changeLeftY);
    }
    if (e.key == 's') {
        changeLeftY += 5;
        left.dy(changeLeftY);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        changeRightY -= 5;
        right.dy(changeRightY);
    }
    if (e.key == 'ArrowDown') {
        changeRightY += 5;
        right.dy(changeRightY);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key == 'w') {
        changeLeftY = 0;
    }
    if (e.key == 's') {
        changeLeftY = 0;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowUp') {
        changeRightY = 0;
    }
    if (e.key == 'ArrowDown') {
        changeRightY = 0;
    }
});

document.getElementById('newGame').addEventListener('click', reset);

function reset() {
    leftScore = 0;
    rightScore = 0;
    leftScorText.innerHTML = leftScore;
    rightScoreText.innerHTML = rightScore;

    left.move(racketWidth, HEIGHT / 2 - racketHeight / 2);
    right.move(WIDTH - racketWidth * 2, HEIGHT / 2 - racketHeight / 2);

    ball.x(WIDTH / 2);
    ball.y(HEIGHT / 2);

    timer = 120;
}

let timer = 120;

let timerInterval = setInterval(() => {
    timer -= 1;
    let minute = Math.floor(timer / 60);
    let sec = timer % 60;
    document.getElementById('minute').innerHTML = minute;
    document.getElementById('seconds').innerHTML = sec;
    if (timer == 0) {
        if (leftScore > rightScore) {
            alert('Left Win');
        }
        else if (leftScore<rightScore) {
            alert('Right Win');
        }
        else{
            alert('draw')
        }
        clearInterval(timerInterval);
    }
}, 1000);
let interval = setInterval(moveBall, 8);
