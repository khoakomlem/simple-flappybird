class Bird {
    constructor({
        x = 100,
        y = 300,
        lift = -10,
        velocity = 0,
        gravity = 0.5,
        size = 30,
        color = 'yellow'
    } = {}) {
        this.x = x;
        this.y = y;
        this.lift = lift;
        this.velocity = velocity;
        this.gravity = gravity;
        this.size = size;
        this.color = color;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size);
    }

    flap() {
        this.velocity = this.lift; // Apply the lift force to the bird
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // If the bird hits the bottom of the screen, set the bird to the bottom of the screen and the velocity to 0
        if (this.y + this.size > height) { 
            this.y = height - this.size;
            this.velocity = 0;
        }

        // If the bird hits the top of the screen, set the bird to the top of the screen and the velocity to 0
        if (this.y < 0) {
            this.y = 0; 
            this.velocity = 0;
        }
    }
}