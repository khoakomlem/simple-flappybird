const pipes = [];
const bird = new Bird();

function setup() {
    createCanvas(1366, 768);

    // Create 5 initial pipes on start
    for (let i = 0; i < 5; i++) {
        pipes.push(new Pipe({
            x: 500 + i * 300,
            height: random(200, height - 200)
        }));
    }
}

function draw() {
    background(0); // Set the background to black

    // If the first pipe is offscreen, remove it
    if (pipes[0] && pipes[0].offscreen()) {
        pipes.shift();
    }

    // Update and draw all the pipes
    pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();
    });

    // Update and draw the bird
    bird.update();
    bird.draw();

    // If the bird hits the first pipe, change the bird's color to red
    if (pipes[0] && pipes[0].hits(bird)) {
        bird.color = 'red';
    } else {
        bird.color = 'yellow';
    }

    // If the frame count is a multiple of 100, create a new pipe
    if (frameCount % 100 === 0) {
        pipes.push(new Pipe({
            x: pipes[pipes.length - 1].x + 300,
            height: random(200, height - 200)
        }));
    }
}

function mousePressed() {
    bird.flap();
}

function keyPressed() {
    bird.flap();
}