const pipes = [];
const bird = new Bird();

function setup() {
    createCanvas(1366, 768);
    for (let i = 0; i < 5; i++) {
        pipes.push(new Pipe({
            x: 500 + i * 300,
            h: random(100, height - 100)
        }));
    }
}

function draw() {
    background(0);
    pipes.forEach(pipe => {
        if (pipe.offscreen()) {
            pipes.shift();
        }
    });

    pipes.forEach(pipe => {
        pipe.update();
        pipe.draw();
    });

    bird.update();
    bird.draw();

    if (pipes[0] && pipes[0].hits(bird)) {
        bird.color = 'red';
    } else {
        bird.color = 255;
    }
    if (frameCount % 100 === 0) {
        pipes.push(new Pipe({
            x: pipes[pipes.length - 1].x + 300,
            h: random(100, height - 100)
        }));
    }
}

function mousePressed() {
    bird.flap();
}

function keyPressed() {
    bird.flap();
}