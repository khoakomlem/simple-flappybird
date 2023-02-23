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

class Bird {
	constructor({
		x = 200,
		y = 300,
		lift = -9,
		velocity = 0,
		gravity = 0.5,
		size = 50,
	} = {}) {
		this.x = x;
		this.y = y;
		this.lift = lift;
		this.velocity = velocity;
		this.gravity = gravity;
		this.size = size;
		this.image = loadImage('./images/flappybird.png');
	}

	draw() {
		// Ratio is used to keep the image's aspect ratio when resizing to this.size
		const ratio = this.image.width / this.image.height;
		image(this.image, this.x, this.y, this.size * ratio, this.size);
	}

	update() {
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	flap() {
		this.velocity = this.lift; // Apply the lift force to the bird
		sounds.flap.play();
	}

	offscreen() {
		return this.y + this.size > height || this.y < 0;
	}
}
