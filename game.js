const pipes = [];
const bird = new Bird();
console.log(bird)

function setup() {
    createCanvas(400, 600);
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
        pipes.push(new Pipe());
    }
}

function mousePressed() {
    bird.flap();
}

function keyPressed() {
  bird.flap();
}