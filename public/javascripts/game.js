/*******************************************************************************
    Simple Flappy Bird Game - A simple flappy bird game using p5.js
    Copyright (c) 2023 Đậu Văn Đăng Khoa

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    Home: https://github.com/khoakomlem/simple-flappybird
*/

const PIPE_DISTANCE = 400;
let bgImage;
let pipes;
let bird;
let score;
let diffScale = 1;

function initial() {
	pipes = [];
	bird = new Bird();
	score = 0;
	diffScale = 1;
	// Create 5 initial pipes on start
	for (let i = 0; i < 5; i++) {
		pipes.push(new Pipe({
			x: 500 + i * PIPE_DISTANCE,
			height: random(100, height - 200),
		}));
	}
}

function lose() {
	bird.color = 'red';
	bird.draw();
	fill('white');
	strokeWeight(6);
	stroke(80);
	textSize(50);
	text('PRESS R TO RESTART', width / 2, height / 2);
	frameRate(0);
}

function setup() {
	bgImage = loadImage('./images/background.png');
	createCanvas(window.innerWidth, window.innerHeight);
	textAlign(CENTER, CENTER);
	initial();
}

function draw() {
	smooth();
	image(bgImage, 0, 0, width, height);

	strokeWeight(6);
	stroke('black');

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

	// If the bird hits the first pipe or is offscreen, lose
	if ((pipes[0] && pipes[0].hits(bird)) || bird.offscreen()) {
		lose();
	}

	if (bird.x > pipes[0].x + pipes[0].width && !pipes[0].passed) {
		score++;
		pipes[0].passed = true;
	}

	fill('white');
	strokeWeight(10);
	stroke(80);
	textSize(100);
	text(score, width / 2, 100);

	// If the frame count is a multiple of 100, create a new pipe
	if (frameCount % 100 === 0) {
		pipes.push(new Pipe({
			x: pipes[pipes.length - 1].x + (PIPE_DISTANCE * diffScale),
			height: random(50, height - 200),
			speed: 2.3 * diffScale,
		}));
		diffScale += 0.1;
	}
}

function mousePressed() {
	bird.flap();
}

function keyPressed() {
	bird.flap();
	if (keyCode === 82 && bird.color === 'red') {
		initial();
		frameRate(60);
	}
}
