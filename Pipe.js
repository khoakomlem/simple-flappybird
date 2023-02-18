class Pipe {
    constructor(x = width, y = 0, w = 50, h = 100, gap = 160) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gap = gap;
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        rect(this.x, this.y + this.h + this.gap, this.w, height - this.h - this.gap);
    }

    update() {
        this.x -= 2;
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        if (bird.y < this.h || bird.y + bird.size > this.h + this.gap) {
            if (bird.x + bird.size > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
    }
}