// settings
var w = 300;
var h = 300;

// variables
var area = 1;
var view = 0.5;
var viewX = view;
var viewY = view;
var touchMode = 2;

// objects
var layers = [];
var walls = [];
var mobs = [];
var speedBuffs = [];
var player;
var joyMove;
var joyView;

function setup() {
	// layers order
	createCanvas(w, h);
	layers[0] = new Layer();
	layers[1] = new Layer();
	layers[2] = new Map(100);
	layers[3] = new Layer();
	
	// layers[0].objects
	grass = new Background(layers[0]);
	walls.push(new Wall(layers[0], -width * area, -height * area, -width * area, height * area));
	walls.push(new Wall(layers[0], -width * area, -height * area, width * area, -height * area));
	walls.push(new Wall(layers[0], width * area, -height * area, width * area, height * area));
	walls.push(new Wall(layers[0], -width * area, height * area, width * area, height * area));
	
	// layers[1].objects
	for (var i = 0; i < area * 10; i++) {
		mobs.push(new Mob(layers[1]));
	}
	speedBuffs.push(new SpeedBuff(layers[1], false, 0));
	for (var i = 0; i < area * 3; i++) {
		speedBuffs.push(new SpeedBuff(layers[1], true, 20));
	}
	player = new Player(layers[1]);
	
	// layers[2].objects
	layers[2].objects = layers[1].objects;
	
	// layers[3].objects
	joyMove = new Joystick(layers[3], true, width * 0.5, height * 0.5, (w + h) / 2 / 6);
	joyView = new Joystick(layers[3], false, player.w * 3, player.w * 3, player.w * 3);
}
function draw() {
	background(0);
	
	// render layers
	for (var i = 0; i < layers.length; i++) {
		layers[i].render();
	}
	
	// logic
	layers[0].trns = createVector(width * viewX - player.pos.x, height * viewY - player.pos.y);
	layers[1].trns = createVector(width * viewX - player.pos.x, height * viewY - player.pos.y);
	player.move(joyMove.getValue());
	joyMove.update();
	joyView.update();
	
	var v = joyView.getValue();
	v.setMag(view);
	viewX = v.x + view;
	viewY = v.y + view;
}