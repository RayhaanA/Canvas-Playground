///////CANVAS 2///////
var particleSystem = function () {
	//Globals
	var canvas = document.getElementById('two');
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var particles = [];
	var numParticles = 100;
	var linear = true;

	//Initialize with black background
	context.fillStyle = 'rgba(0, 0, 0, 1)';
	context.fillRect(0, 0, width, height);

	//Constructor very similar to canvas1's constructor
	function Particle() {
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.vx = Math.random() * 8 - 4;
		this.vy = Math.random() * 8 - 4;
		this.radius = Math.random() * 20 + 10;
		this.colour = "rgb(" + Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ","
									+ Math.floor(Math.random() * 255) + ")";
	}


	Particle.prototype.update = function() {
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
		if(this.x < -60) this.x = width + 60;
		if(this.y < -60) this.y = height + 60;
		if(this.x > width + 60) this.x = -60;
		if(this.y > height + 60) this.y = -60;
	}

	function draw() {
		context.globalCompositeOperation = "source-over"; //Make sure it overwrites screen
		context.fillStyle = 'rgba(0, 0, 0, 0.3)'; //Allow for partial trailing
		context.fillRect(0, 0, width, height); //Clear
		context.globalCompositeOperation = "lighter"; //Lighten colours
		for(var i = 0; i < numParticles; i++) {
			particles[i].update(); //Update positions
			context.beginPath();
			context.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2, false);
			var gradient = context.createRadialGradient(particles[i].x, particles[i].y, 0, particles[i].x,
																		particles[i].y, particles[i].radius);
			gradient.addColorStop(0, "white");
			gradient.addColorStop(0.4, "white");
			gradient.addColorStop(0.4, particles[i].colour);
			gradient.addColorStop(1, "black");
			context.fillStyle = gradient;
			context.fill();
		}
	}

	//Create particle array
	for(var i = 0; i < numParticles; i++) {
		particles.push(new Particle());
	}

	//Switch between linear and random movement
	canvas.addEventListener("click", function() {
		if(linear) {
			linear = false;
		} else if (!linear) {
			for(var i = 0; i < numParticles; i++) {
				linear = true;
				//New constant velocities
				particles[i].vx = Math.random() * 12 - 4;
				particles[i].vy = Math.random() * 12 - 4;
			}
		}
	}, false);

	//Loop
	function loop() {
		draw();
		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);
} ();
