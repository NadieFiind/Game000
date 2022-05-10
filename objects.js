function Layer() {
	this.objects = [];
	this.show = true;
	this.trns = createVector(width * 0.5, height * 0.5);
	this.render = function() {
		if (this.show) {
			push();
			translate(this.trns.x, this.trns.y);
			for (var i = 0; i < this.objects.length; i++) {
				this.objects[i].render();
			}
			pop();
		}
	};
}
function Map(w) {
	this.show = true;
	this.scl = 0.15;
	this.render = function() {
		if (this.show) {
			push();
			noStroke();
			fill(200, 50);
			square(width - w, 0, w);
			translate(width - w * 0.5, w * 0.5);
			scale(this.scl);
			for (var i = 0; i < this.objects.length; i++) {
				this.objects[i].render();
			}
			pop();
		}
	};
}
function Joystick(layer, show, x, y, w) {
	layer.objects.push(this);
	
	this.w = w;
	this.pos = createVector(x - this.w, y - this.w);
	this.stickPos = this.pos.copy();
	this.ctrl = false;
	this.fingerPos;
	this.value = createVector(0, 0);
	this.activateJoystick = function(command) {
		this.fingerPos = createVector(mouseX - width * 0.5, mouseY - height * 0.5);
		var distance = p5.Vector.dist(this.fingerPos, this.pos);
		if (distance < this.w * 0.5 && command) {
			this.ctrl = true;
		} else {
			this.stickPos = this.pos.copy();
			this.value = this.value.setMag(0);
			this.ctrl = false;
		}
	};
	this.update = function() {
		if (this.ctrl) {
			this.fingerPos = createVector(mouseX - width * 0.5, mouseY - height * 0.5);
			this.stickPos = p5.Vector.sub(this.fingerPos, this.pos);
			this.stickPos.limit(this.w * 0.5);
			this.value = this.stickPos.copy();
			this.stickPos = p5.Vector.add(this.pos, this.stickPos);
		}
	};
	this.getValue = function() {
		return this.value;
	};
	this.render = function() {
		if (show) {
			push();
			stroke(230, 80);
			strokeWeight(this.w / 20);
			fill(150, 30);
			ellipse(this.pos.x, this.pos.y, this.w, this.w);
			stroke(150);
			strokeWeight(this.w / 3);
			line(this.pos.x, this.pos.y, this.stickPos.x, this.stickPos.y);
			stroke(60);
			strokeWeight(this.w / 20);
			fill(50);
			ellipse(this.stickPos.x, this.stickPos.y, 2 * this.w / 3, 2 * this.w / 3);
			pop();
		} else {
			push();
			stroke(230, 80);
			noFill();
			ellipse(this.pos.x, this.pos.y, this.w, this.w);
			stroke(255, 150);
			line(this.pos.x, this.pos.y, this.stickPos.x, this.stickPos.y);
			pop();
		}
	};
}
function Background(layer) {
	layer.objects.push(this);
	this.render = function() {
		push();
		fill(255, 200);
		rect(-width * area, -height * area, width * area * 2, height * area * 2);
		pop();
	};
}
function Wall(layer, x1, y1, x2, y2) {
	layer.objects.push(this);
	this.render = function(l) {
		push();
		stroke(0, 0, 255);
		strokeWeight(10);
		line(x1, y1, x2, y2);
		pop();
	};
}