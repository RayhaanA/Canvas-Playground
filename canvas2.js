///////CANVAS 2///////
//Globals
var canvas2 = document.getElementById('two');
var context2 = canvas2.getContext('2d');
var width2 = canvas2.width;
var height2 = canvas2.height;
var particles2 = [];
var numParticles2 = 100;
var linear = true;

//Initialize with black background
context2.fillStyle = 'rgba(0, 0, 0, 1)';
context2.fillRect(0, 0, width2, height2);

//Constructor very similar to canvas1's constructor
function Particle2() {
	this.x = Math.random() * width2;
	this.y = Math.random() * height2;
	this.vx = Math.random() * 12 - 4;
	this.vy = Math.random() * 12 - 4;
	this.radius = Math.random() * 20 + 10;
	this.colour = "rgb(" + Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ")";
}


Particle2.prototype.update = function() {
	//If linear movement
	if(linear) {
		this.x += this.vx;
		this.y += this.vy;
	}
	//If random movement
	else if(!linear) {
		this.x += Math.cos(this.vx) + 0.1;
		this.y += Math.sin(this.vy) + 0.1;
		if(this.vx < 2000000000)
			this.vx += 0.05;
			this.vy += 0.03;
		} else {
			this.vx = 0;
			this.vy = 0;
		}
	//If moves off screen
	if(this.x < -60) this.x = width2 + 60;
	if(this.y < -60) this.y = height2 + 60;
	if(this.x > width2 + 60) this.x = -60;
	if(this.y > height2 + 60) this.y = -60;
}

function draw2() {
	context2.globalCompositeOperation = "source-over"; //Make sure it overwrites screen
	context2.fillStyle = 'rgba(0, 0, 0, 0.3)'; //Allow for partial trailing
	context2.fillRect(0, 0, width2, height2); //Clear
	context2.globalCompositeOperation = "lighter"; //Lighten colours
	for(var i = 0; i < numParticles2; i++) {
		particles2[i].update(); //Update positions
		context2.beginPath();
		context2.arc(particles2[i].x, particles2[i].y, particles2[i].radius, 0, Math.PI * 2, false);
		var gradient = context2.createRadialGradient(particles2[i].x, particles2[i].y, 0, particles2[i].x,
																	particles2[i].y, particles2[i].radius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, particles2[i].colour);
		gradient.addColorStop(1, "black");
		context2.fillStyle = gradient;
		context2.fill();
	}
}

//Create particle array
for(var i = 0; i < numParticles2; i++) {
	particles2.push(new Particle2());
}

//Switch between linear and random movement
canvas2.addEventListener("click", function() {
	if(linear) {
		linear = false;
	} else if (!linear) {
		for(var i = 0; i < numParticles2; i++) {
			linear = true;
			//New constant velocities
			particles2[i].vx = Math.random() * 12 - 4;
			particles2[i].vy = Math.random() * 12 - 4;
		}
	}
}, false);

//Loop
setInterval(draw2, 30);
