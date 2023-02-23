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

/** *******	Declare global variables ****** */
const PIPE_DISTANCE = 400;
const sounds = {
	score: null,
	flap: null,
	die: null,
};
let bgImage;
let pipes;
let bird;
let score;
let diffScale;
let isLose;
/** ************************************** */

function randomPipeHeight() {
	return Math.random() * (height - 200);
}

function showLoseScreen() {
	fill('red');
	strokeWeight(6);
	stroke('black');
	textSize(60);
	text('PRESS R TO RESTART', width / 2, height / 2);
}

function drawScore() {
	fill('white');
	strokeWeight(8);
	stroke('black');
	textSize(80);
	text(score, width / 2, 100);
}

function startGame() {
	pipes = [];
	bird = new Bird();
	score = 0;
	diffScale = 1;
	isLose = false;

	// Create 5 initial pipes on start (from the left to the right)
	for (let i = 0; i < 4; i++) {
		pipes.push(new Pipe({
			x: 600 + i * PIPE_DISTANCE,
			height: randomPipeHeight(),
		}));
	}
}

function loseGame() {
	isLose = true;
	bird.draw();
	sounds.die.play();
}

function preload() {
	sounds.score = loadSound('sounds/score.mp3');
	sounds.flap = loadSound('sounds/flap.mp3');
	sounds.die = loadSound('sounds/die.mp3');
	bgImage = loadImage('images/background.png');
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	textAlign(CENTER, CENTER);
	startGame();
}

function draw() {
	smooth(); // Anti-aliasing

	image(bgImage, 0, 0, width, height); // Draw the background

	// If the first pipe is offscreen, remove it
	if (pipes[0] && pipes[0].offscreen()) {
		pipes.shift();
	}

	strokeWeight(6);
	stroke('black');

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
		if (!isLose) {
			loseGame();
		}
	}

	// If the bird passes the first pipe, increase the score
	if (bird.x > pipes[0].x + pipes[0].width && !pipes[0].passed) {
		score++;
		pipes[0].passed = true; // Prevent the score from increasing multiple times
		sounds.score.play();
	}

	// If the frame count is a multiple of 100, create a new pipe
	if (frameCount % 100 === 0) {
		let distance = (PIPE_DISTANCE * diffScale);
		if (distance > 600) {
			distance = 600;
		}

		pipes.push(new Pipe({
			x: pipes[pipes.length - 1].x + distance,
			height: randomPipeHeight(),
			speed: 2.3 * diffScale,
		}));
		diffScale += 0.1;
	}

	if (isLose) {
		showLoseScreen();
	}

	drawScore();
}

function mousePressed() {
	if (!isLose) {
		bird.flap();
	}
}

function keyPressed() {
	if (!isLose) {
		bird.flap();
	}

	if (keyCode === 82) { // Button R
		startGame();
	}
}
