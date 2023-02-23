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

class Pipe {
	constructor({
		x = width,
		width = 60,
		height = 100,
		gap = 200,
	} = {}) {
		this.x = x;
		this.width = width;
		this.height = height;
		this.gap = gap;
		this.passed = false;
	}

	draw() {
		fill('green');
		// Top pipe
		rect(this.x, 0, this.width, this.height);
		rect(this.x - 10, this.height - 20, 20 + this.width, 20);

		// Bottom pipe
		rect(this.x, this.height + this.gap, this.width, height - this.height - this.gap);
		rect(this.x - 10, this.height + this.gap, 20 + this.width, 20);
	}

	update() {
		if (isLose) { // If the bird is dead, stop moving the pipes
			return;
		}

		this.x -= 2 * diffScale;
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
