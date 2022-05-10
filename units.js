function Player(layer) {
	layer.objects.push(this);
	
	// player attributes
	this.spd = 5;
	
	// attributes
	this.name = "player";
	this.pos = createVector(0, 0);
	this.w = 30;
	this.h = 40;
	this.fspd = this.spd;
	
	// variables
	this.count = 0;
	this.sbC = 500;
	
	this.interact = function() {};
	this.check = function() {
		for (var i = 0; i < layer.objects.length; i++) {
			var temp = layer.objects;
			var d = dist(0, 0, temp[i].pos.x - this.pos.x, temp[i].pos.y - this.pos.y);
			temp[i].interact();
			if (d < temp[i].d * 0.5) {
				if (temp[i].name === "mob") {
					temp[i].fight = true;
				} else if (temp[i].name === "speedBuff") {
					for (var j = 0; j < speedBuffs.length; j++) {
						if (speedBuffs[j].effect) {
							this.sbC = 500;
						} else {
							speedBuffs[j].effect = true;
						}
					}
					temp.splice(i, 1);
				}
			}
		}
	};
	this.render = function() {
		push();
		translate(this.pos.x, this.pos.y);
		fill(100, 0, 255);
		ellipse(0, 0, this.w - 5);
		pop();
		this.check();
	};
	this.move = function(speed) {
		speed.setMag(this.fspd);
		this.pos = p5.Vector.add(speed, this.pos);
	};
}
function Mob(layer) {
	layer.objects.push(this);
	
	// mob attributes
	this.name = "mob";
	this.lvl = floor(random(1, area * 5));
	
	// attributes
	this.d = 10 * this.lvl;
	this.pos = createVector(random(-width * area + this.d * 0.5, width * area - this.d * 0.5), random(-height * area + this.d * 0.5, height * area - this.d * 0.5));
	
	// variables
	this.dir = floor(random(2));
	this.count = 0;
	this.fight = false;
	
	this.interact = function() {
		if (this.fight) {
			var maxHP = 50;
			push();
			fill(255);
			rect(player.pos.x - 25, player.pos.y - 23, maxHP, 5);
			fill(255, 0, 0);
			rect(player.pos.x - 25, player.pos.y - 23, maxHP * 0.25, 5);
			pop();
		}
	};
	this.render = function() {
		push();
		translate(this.pos.x, this.pos.y);
		fill(255, 0, 50);
		ellipse(0, 0, this.d, this.d);
		pop();
	};
}
function SpeedBuff(layer, show, d) {
	layer.objects.push(this);
	
	// attributes
	this.name = "speedBuff";
	this.d = d;
	this.pos = createVector(random(-width * area + this.d * 0.5, width * area - this.d * 0.5), random(-height * area + this.d * 0.5, height * area - this.d * 0.5));
	
	// variables
	this.effect = false;
	
	this.interact = function() {
		if (this.effect) {
			player.fspd = player.spd * 1.50;
			player.sbC--;
			if (player.sbC <= 0) {
				for (var i = 0; i < layer.objects.length; i++) {
					layer.objects[i].effect = false;
				}
			}
		} else {
			player.fspd = player.spd;
			player.sbC = 500;
		}
	};
	this.render = function() {
		if (show) {
			push();
			translate(this.pos.x, this.pos.y);
			fill(0);
			ellipse(0, 0, this.d, this.d);
			pop();
		};
	}
}