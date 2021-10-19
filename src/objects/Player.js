class Player {
    constructor({ canvas, context, width = 150, height = 30, speed = 700, color = '#fff' }) {
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
        this.x = (this.canvas.width / 2) - (width / 2);
        this.y = this.canvas.height - (height * 3);
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }
}

export default Player;