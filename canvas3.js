///////CANVAS 3///////
//Globals
var canvas3 = document.getElementById('three');
var context3 = canvas3.getContext('2d');
var width3 = canvas3.width;
var height3 = canvas3.height;
var particles3 = [];
var numParticles3 = 30;

//Initialize with black background
context3.fillStyle = 'rgba(0, 0, 0, 1)';
context3.fillRect(0, 0, width3, height3);

function Particle3() {
	this.x = Math.random() * width3;
	this.y = Math.random() * height3;
	this.velocity = 3;
	this.radius = 0;
	this.rotAngle = Math.random() * 360;
	this.colour = "rgb(" + Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ","
								+ Math.floor(Math.random() * 255) + ")";
	this.lineWeight = 1;
}

Particle3.prototype.update = function() {
	this.x += this.velocity * Math.cos(this.rotAngle);
	this.y += this.velocity * Math.sin(this.rotAngle);

	if(this.x < 0) this.x = width3;
	if(this.x > width3) this.x = 0;
	if(this.y > height3) this.y = 0;
	if(this.y < 0) this.y = height3;
}

function draw3() {
	context3.globalCompositeOperation = "source-over"; //Make sure it overwrites screen
	context3.fillStyle = 'rgba(0, 0, 0, 0.05)'; //Allow for partial trailing
	context3.fillRect(0, 0, width3, height3); //Clear
	context3.globalCompositeOperation = "lighten"; //Lighten colours
	for(var i = 0; i < numParticles3; i++) {
		context3.fillStyle = "white";
		context3.fillRect(particles3[i].x, particles3[i].y, particles3[i].radius, particles3[i].radius);

		for(var n = 0; n < numParticles3; n++) {
			var distance = Math.sqrt(Math.pow(particles3[n].x - particles3[i].x, 2) + Math.pow(particles3[n].y - particles3[i].y, 2));
			if(distance < 150) {
				context3.beginPath();
				context3.lineWidth = particles3[i].lineWeight;
				context3.moveTo(particles3[i].x, particles3[i].y);
				context3.lineTo(particles3[n].x, particles3[n].y);
				context3.strokeStyle = particles3[i].colour;
				context3.stroke();
			}
		}
		particles3[i].update();
	}
}

for(var i = 0; i < numParticles3; i++) {
	particles3.push(new Particle3());
}

canvas3.addEventListener("click", function() {
	for(var i = 0; i < numParticles3; i++) {
		particles3[i].colour = "rgb(" + Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ")";
	}
}, true);

canvas3.addEventListener("keydown", function(e) {
	if(e.keyCode == 187) {
		console.log(e.keyCode);
		for(var i = 0; i < numParticles3; i++) {
			if(particles3[i].lineWeight < 7)
				particles3[i].lineWeight++;
		}
	}
	if(e.keyCode == 189) {
		for(var i = 0; i < numParticles3; i++) {
			if(particles3[i].lineWeight > 1)
				particles3[i].lineWeight--;
		}
	}
}, true);


setInterval(draw3, 50);
