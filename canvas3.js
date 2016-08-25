///////CANVAS 3///////
//Globals
var canvas = document.getElementById('three');
var context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var particles = [];
var numParticles = 30;

//Initialize with black background
context.fillStyle = 'rgba(0, 0, 0, 1)';
context.fillRect(0, 0, width, height);

function Particle() {
	this.x = Math.random() * width;
	this.y = Math.random() * height;
	this.velocity = Math.random() * 2 + 1;
	this.radius = 0;
	this.rotAngle = Math.random() * 360;
	this.colour = "rgb(" + Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ")";
	this.lineWeight = 1;
}

Particle.prototype.update = function() {
	this.x += this.velocity * Math.cos(this.rotAngle);
	this.y += this.velocity * Math.sin(this.rotAngle);

	if(this.x < 0) this.x = width;
	if(this.x > width) this.x = 0;
	if(this.y > height) this.y = 0;
	if(this.y < 0) this.y = height;
}

function draw() {
	context.globalCompositeOperation = "source-over"; //Make sure it overwrites screen
	context.fillStyle = 'rgba(0, 0, 0, 0.05)'; //Allow for partial trailing
	context.fillRect(0, 0, width, height); //Clear
	context.globalCompositeOperation = "lighten"; //Lighten colours
	for(var i = 0; i < numParticles; i++) {
		context.fillStyle = "white";
		context.fillRect(particles[i].x, particles[i].y, particles[i].radius, particles[i].radius);

		for(var n = 0; n < numParticles; n++) {
			var distance = Math.sqrt(Math.pow(particles[n].x - particles[i].x, 2) + Math.pow(particles[n].y - particles[i].y, 2));
			if(distance < 200) {
				context.beginPath();
				context.lineWidth = particles[i].lineWeight;
				context.moveTo(particles[i].x, particles[i].y);
				context.lineTo(particles[n].x, particles[n].y);
				context.strokeStyle = particles[i].colour;
				context.stroke();
			}
		}
		particles[i].update();
	}
}

for(var i = 0; i < numParticles; i++) {
	particles.push(new Particle());
}

canvas.addEventListener("click", function() {
	for(var i = 0; i < numParticles; i++) {
		particles[i].colour = "rgb(" + Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ")";
	}
}, true);

canvas.addEventListener("keydown", function(e) {
	if(e.keyCode == 187) {
		console.log(e.keyCode);
		for(var i = 0; i < numParticles; i++) {
			if(particles[i].lineWeight < 7)
				particles[i].lineWeight++;
		}
	}
	if(e.keyCode == 189) {
		for(var i = 0; i < numParticles; i++) {
			if(particles[i].lineWeight > 1)
				particles[i].lineWeight--;
		}
	}
}, true);


setInterval(draw, 50);
