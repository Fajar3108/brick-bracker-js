import { Player, Ball, Brick } from "./objects/index.js";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const healthText = document.querySelector('#health');
    const playBtn = document.querySelector('#playBtn');
    const gameOverPanel = document.querySelector('#gameOver');

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    const row = 7, col = 10, margin = 10;

    const player = new Player({canvas, context});
    const ball = new Ball({
        canvas,
        context, 
        x: player.x + (player.width / 2),
        y: player.y - 20,
    });
    let bricks = [];

    const keys = {
        KeyA: 0,
        KeyD: 0,    
    }

    const initBricks = () => {
        bricks = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                bricks.push(new Brick({ 
                    canvas, 
                    context, 
                    x: j * (canvas.width / col) + margin, 
                    y: i * 40 + margin, 
                    width: canvas.width / col - margin * 2, 
                    height: 30 
                }));
            }
        }
    }
    initBricks();

    let animID, lastFrameTime = Date.now(), dx = 1, dy = -1, health = 3;

    const init = () => {
        player.x = canvas.width / 2 - player.width / 2;
        ball.x = player.x + (player.width / 2);
        ball.y = player.y - 20;
        dx = 1;
        dy = -1;
        health = 3;
        healthText.innerHTML = `Health: ${health}`;
        gameOverPanel.classList.remove('active');
        initBricks();
    }
    const draw = () => {
        context.clearRect(0,0,canvas.width,canvas.height);
        player.draw();
        ball.draw();
        bricks.forEach((brick) => {
            brick.draw();
        });
        healthText.innerHTML = `Health: ${health}`;
    }
    const update = () => {
        animID = requestAnimationFrame(update);

        const delta = (Date.now() - lastFrameTime) / 1000;
        lastFrameTime = Date.now();

        if (keys.KeyA && player.x > 0) player.x -= player.speed * delta;
        if (keys.KeyD && player.x + player.width < canvas.width) player.x += player.speed * delta; 

        // Hit the brick
        let hit = -1;
        for (let i = 0; i < bricks.length; i++) {
            const brick = bricks[i];
            if (
                ((ball.y - ball.radius >= brick.y && ball.y - ball.radius <= brick.y + brick.height) || 
                (ball.y + ball.radius >= brick.y && ball.y + ball.radius <= brick.y + brick.height)) && 
                ((ball.x - ball.radius >= brick.x && ball.x - ball.radius <= brick.x + brick.width) ||
                (ball.x + ball.radius >= brick.x && ball.x + ball.radius <= brick.x + brick.width))
            ) {
                dy = -dy;
                hit = i;
                break;
            }
        }

        if (hit >= 0) {
            bricks.splice(hit, 1);
            hit = -1;
        }

        if (ball.y - ball.radius > canvas.height) {
            health -= 1;
            if (health <= 0) {
                healthText.innerHTML = `Health: ${health}`;
                gameOverPanel.classList.add('active');
                cancelAnimationFrame(animID);
                return;
            }
            dx = 1;
            dy = -1;
            ball.x = player.x + (player.width / 2);
            ball.y = player.y - ball.radius - 1;
        }

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) dx = -dx;
        if (ball.y - ball.radius < 0 || 
            (
                ((ball.y + ball.radius >= player.y && ball.y + ball.radius <= player.y + player.height) ||
                (ball.y - ball.radius >= player.y && ball.y - ball.radius <= player.y + player.height)) && 
                ((ball.x - ball.radius >= player.x && ball.x - ball.radius <= player.x + player.width) ||
                (ball.x + ball.radius >= player.x && ball.x + ball.radius <= player.x + player.width))
            )) dy = -dy;
        ball.move(dx, dy, delta);

        draw();
    }
    update();

    document.addEventListener('keydown', (e) => {
        if (keys[e.code] !== undefined) keys[e.code] = 1;
    });

    document.addEventListener('keyup', () => {
        keys.KeyA = 0;
        keys.KeyD = 0;
    });

    playBtn.addEventListener('click', () => {
        init();
        
        update();
    });
});