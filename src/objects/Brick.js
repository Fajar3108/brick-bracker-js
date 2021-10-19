class Brick {
    constructor({ canvas, context, x, y, width, height, color = '#fff' }) {
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.strokeStyle = '#f00';
        this.context.stroke();
        this.context.fill();
        this.context.closePath();
    }
}

export default Brick;