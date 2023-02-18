class Pipe {
    constructor({
        x = width,
        y = 0,
        width = 50,
        height = 100,
        gap = 160
    } = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gap = gap;
    }

    draw() {
        fill('green');
        rect(this.x, this.y, this.width, this.height);
        rect(this.x, this.y + this.height + this.gap, this.width, height - this.height - this.gap);
    }

    update() {
        this.x -= 2;
    }

    offscreen() {
        return this.x < -this.width;
    }

    hits(bird) {
        if (bird.y < this.height || bird.y + bird.size > this.height + this.gap) {
            if (bird.x + bird.size > this.x && bird.x < this.x + this.width) {
                return true;
            }
        }
    }
}