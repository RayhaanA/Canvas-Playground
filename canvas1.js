///////CANVAS 1///////
var explosion = function() {
	//Globals
	var canvas = document.getElementById('one');
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var gravity = 0.3;
	var particles = [];
	var numParticles = 400;

	//Initialize with black background
	context.fillStyle = 'rgba(0,0,0,1)';
	context.fillRect(0,0,width,height);

	//Constructor
	function Particle(mouseX, mouseY) {
		this.x = mouseX;
		this.y = mouseY;
		this.vx = Math.random() * 8 - 4;
		this.vy = Math.random() * (-8) - 5;
		this.radius = Math.random() * 7 + 1;
		this.hue = Math.random() * 360; //Used for random colours
	}

	Particle.prototype.update = function() {
		this.x += this.vx;
		this.y += (this.vy += gravity);
		//Reduce radius size to create fading out effect
		this.radius = Math.abs(this.radius - .075);
	}

	function draw() {
		context.fillStyle = 'rgba(0,0,0,0.3)'; //Clear background while allowing for partial trailing frames
		context.fillRect(0,0,canvas.width,canvas.height);
		for(var i = 0; i < particles.length; i++) {
				particles[i].update();
				context.beginPath();
			   context.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2, false);
			   context.fillStyle = "hsla(" + particles[i].hue  + ", 50%, 50%,1)";
			   context.fill();
				//If particle is small enough, remove from array
				if(particles[i].radius <= 0.5) {
					particles.splice(i, 1);
				}
		}
	}

	function start(mouseX, mouseY) {
		//Initialize particle aray
		for(var i = 0; i < numParticles; i++) {
			particles.push(new Particle(mouseX, mouseY));
		}
		//Start loop
		requestAnimationFrame(loop);
	}

	//On click function, for program to draw, requires previous explosion array
	//to be completely empty
	canvas.addEventListener("click", function(e) {
		//Get mouse position relative to canvas
	    var rect = canvas.getBoundingClientRect();
	    var x = e.clientX - rect.left;
	    var y = e.clientY - rect.top;

		 //Only start if particle array is empty
		 if(particles.length == 0)
	 		start(x, y);
	 }, false);

	 //Main loop
	 function loop() {
		 draw();
		 if(particles.length === 0)
			 clearAnimationFrame(loop);
		 requestAnimationFrame(loop);
	 }
} ();
