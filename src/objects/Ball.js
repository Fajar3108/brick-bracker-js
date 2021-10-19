class Ball {
    constructor({ canvas, context, x, y, radius = 20, speed = 500, color = 'tomato' }) {
        this.canvas = canvas;
        this.context = context;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }

    move(dx, dy, delta) {
        this.x += dx * this.speed * delta;
        this.y += dy * this.speed * delta;
    }
}

export default Ball;