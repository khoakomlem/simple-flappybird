class Bird {
    lift = -10;
    velocity = 0;
    gravity = 0.5;
    size = 20;
    color = 255;

    constructor(x = 20, y = 300) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    flap() {
        this.velocity = this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.size > height) {
            this.y = height - this.size;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
}