(function () {
    "use strict";

    const get = (target) => document.querySelector(target);

    const $canvas = get("canvas");
    const ctx = $canvas.getContext("2d");

    const $score = get(".score");
    const $highScore = get(".highscore");
    const $play = get(".js-play");

    const colorSet = {
        board: "rgb(20, 105, 38)",
        snakeHead: "rgba(229, 65, 120, 0.9292)",
        snakeBody: "rgba(153, 206, 244, 0.498)",
        food: "rgb(66, 187, 103)",
    };

    let start = 0;
    let option = {
        highScore: localStorage.getItem("score") || 0,
        gameEnd: true,
        direction: 2,
        snake: [
            { x: 10, y: 10, direction: 2 },
            { x: 10, y: 20, direction: 2 },
            { x: 10, y: 30, direction: 2 },
        ],
        food: { x: 0, y: 0 },
        score: 0,
    };

    const init = () => {
        document.onkeydown = (e) => {
            if (!/Arrow/gi.test(e.key)) return;

            e.preventDefault();
            const direction = getDirection(e.key);

            if (!isDirectionCorrect(direction)) return;

            option.direction = direction;
        };

        $score.textContent = `점수 : ${0}점`;
        $highScore.textContent = `최고점수 : ${option.highScore}점`;

        $play.onclick = () => {
            if (option.gameEnd) {
                option = {
                    highScore: localStorage.getItem("score") || 0,
                    gameEnd: false,
                    direction: 2,
                    snake: [
                        { x: 10, y: 10, direction: 2 },
                        { x: 10, y: 20, direction: 2 },
                        { x: 10, y: 30, direction: 2 },
                    ],
                    food: { x: 0, y: 0 },
                    score: 0,
                };
                randomFood();
                window.requestAnimationFrame(play);
            }
        };
    };

    const buildBoard = () => {
        ctx.fillStyle = colorSet.board;
        ctx.fillRect(0, 0, 300, 300);
    };

    const buildSnake = (ctx, x, y, head = false) => {
        ctx.fillStyle = head ? colorSet.snakeHead : colorSet.snakeBody;
        ctx.fillRect(x, y, 10, 10);
    };

    const buildFood = (ctx, x, y) => {
        ctx.beginPath();
        ctx.fillStyle = colorSet.food;
        ctx.arc(x + 5, y + 5, 5, 0, 2 * Math.PI);
        ctx.fill();
    };

    const setSnake = () => {
        for (let i = option.snake.length - 1; i >= 0; i--) {
            buildSnake(ctx, option.snake[i].x, option.snake[i].y, i === 0);
        }
    };

    const setDirection = (number, value) => {
        while (value < 0) {
            value += number;
        }
        return value % number;
    };

    // 스네이크의 몸을 늘려줍니다
    const setBody = () => {
        const tail = option.snake[option.snake.length - 1];
        const direction = tail.direction;
        let x = tail.x;
        let y = tail.y;

        // 마지막 꼬리칸의 방향을 확인하고 꼬리를 추가
        switch (direction) {
            // down
            case 1:
                y = setDirection(300, y - 10);
                break;
            // up
            case -1:
                y = setDirection(300, y + 10);
                break;
            // left
            case -2:
                x = setDirection(300, x + 10);
                break;
            // right
            case 2:
                x = setDirection(300, x - 10);
                break;
        }
        option.snake.push({ x, y, direction });
    };

    // 먹이를 먹었을 때
    const getFood = () => {
        const snakeX = option.snake[0].x;
        const snakeY = option.snake[0].y;
        const foodX = option.food.x;
        const foodY = option.food.y;
        if (snakeX == foodX && snakeY == foodY) {
            option.score++;
            $score.textContent = `점수 : ${option.score}점`;
            setBody();
            randomFood();
        }
    };

    const randomFood = () => {
        let x = Math.floor(Math.random() * 25) * 10;
        let y = Math.floor(Math.random() * 25) * 10;

        // 지렁이의 먹이가 지렁이 생성 위치에 생기지 않도록
        while (option.snake.some((part) => part.x === x && part.y === y)) {
            x = Math.floor(Math.random() * 25) * 10;
            y = Math.floor(Math.random() * 25) * 10;
        }
        // 먹이 생성
        option.food = { x, y };
    };

    const getDirection = (key) => {
        let direction = 0;
        switch (key) {
            case "ArrowDown":
                direction = 1;
                break;
            case "ArrowUp":
                direction = -1;
                break;
            case "ArrowLeft":
                direction = -2;
                break;
            case "ArrowRight":
                direction = 2;
                break;
        }

        return direction;
    };

    // 스네이크가 진행 방향의 반대방향으로 가지 못하도록 체크
    const isDirectionCorrect = (direction) => {
        return option.direction === option.snake[0].direction && option.direction !== -direction;
    };

    const playSnake = () => {
        let x = option.snake[0].x;
        let y = option.snake[0].y;

        switch (option.direction) {
            // down
            case 1:
                y = setDirection(300, y + 10);
                break;
            // up
            case -1:
                y = setDirection(300, y - 10);
                break;
            // left
            case -2:
                x = setDirection(300, x - 10);
                break;
            // right
            case 2:
                x = setDirection(300, x + 10);
                break;
        }
        const snake = [{ x, y, direction: option.direction }];
        const snakeLength = option.snake.length;
        for (let i = 1; i < snakeLength; i++) {
            snake.push({ ...option.snake[i - 1] });
        }

        option.snake = snake;
    };

    const isGameOver = () => {
        const x = option.snake[0].x;
        const y = option.snake[0].y;

        switch (option.direction) {
            // down
            case 1:
                return isRangeOut(300, y + 10);
            // up
            case -1:
                return isRangeOut(300, y - 10);
            // left
            case -2:
                return isRangeOut(300, x - 10);
            // right
            case 2:
                return isRangeOut(300, x + 10);
        }

        for (let i = 1; i < option.snake.length; i++) {
            if (option.snake[i].x === x && option.snake[i].y === y) return true;
        }

        return false;
    };

    const isRangeOut = (range, value) => {
        if (value < 0 || value === range) return true;

        return false;
    };

    const setHighScore = () => {
        if (option.score > option.highScore) localStorage.setItem("score", option.score);
    };

    const play = (timestamp) => {
        start++;
        if (option.gameEnd) {
            return;
        }

        // 100 씩 동작하도록
        if (timestamp - start > 1000 / 10) {
            if (isGameOver()) {
                option.gameEnd = true;
                setHighScore();
                alert("게임 오버");

                return;
            }

            playSnake();
            buildBoard();
            buildFood(ctx, option.food.x, option.food.y);
            getFood();
            setSnake();
            start = timestamp;
        }

        window.requestAnimationFrame(play);
    };

    init();
})();
