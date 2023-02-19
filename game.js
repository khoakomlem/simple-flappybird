let pipes, bird, score;

function initial() {
    pipes = [];
    bird = new Bird();
    score = 0;
    // Create 5 initial pipes on start
    for (let i = 0; i < 5; i++) {
        pipes.push(new Pipe({
            x: 500 + i * 300,
            height: random(100, height - 200)
        }));
    }
}

function setup() {
    createCanvas(1366, 768);
    textAlign(CENTER, CENTER);

    initial();
}

function draw() {
    background(255); // Set the background to black
    
    strokeWeight(10);
    stroke(80);
    line(0, height - 100, width, height - 100); // Draw the ground

    strokeWeight(3);
    stroke("black");

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
        bird.draw();
        fill('white');
        strokeWeight(6);
        stroke(80);
        textSize(50);
        text("PRESS R TO RESTART", width/2 , height/2);
        frameRate(0);
    } else {
        bird.color = 'yellow';
    }

    if (bird.x > pipes[0].x + pipes[0].width && !pipes[0].passed) {
        score++;
        pipes[0].passed = true;
    }
    fill('white');
    strokeWeight(6);
    stroke(80);
    textSize(80);
    text(score, width/2 , 100);

    // If the frame count is a multiple of 100, create a new pipe
    if (frameCount % 100 === 0) {
        pipes.push(new Pipe({
            x: pipes[pipes.length - 1].x + 300,
            height: random(100, height - 200)
        }));
    }
}

function mousePressed() {
    bird.flap();
}

function keyPressed() {
    bird.flap();
    if (keyCode === 82) {
        initial();
        frameRate(60);
    }
}