////////CANVAS 4/////////
let paint = function() {
	//Globals
	const canvas = document.getElementById('four');
	const context = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;
	let mousePos;
	let brush = document.getElementById("brush").value; //Initial pen type
	let undoStack = []; //Holds previous canvas states
	let spray; //Spray animation function

	//Defaults
	context.lineCap = 'round';
	context.fillStyle = 'black';
	context.strokeStyle = 'black';

	function endDrawing(event) {
		if(brush == "spray") {
			clearInterval(spray);
		}
		removeEventListener("mousemove", whileDragging);
		removeEventListener("mouseup", endDrawing);
	}

	function getMousePos(event) {
  		let rect = canvas.getBoundingClientRect();
  		return {x: event.clientX - rect.left - 5,
      y: event.clientY - rect.top - 5};
	}

	function whileDragging(event) {
		event.preventDefault();
		if(brush == "line") {
			console.log("drawing");
			context.beginPath();
			context.moveTo(mousePos.x, mousePos.y);
			mousePos = getMousePos(event);
			context.lineTo(mousePos.x, mousePos.y);
			context.stroke();
		}
		else if(brush == "spray") {
			mousePos = getMousePos(event);
		}
	}

	function randomPointInRadius(radius) {
	  for (;;) {
	    let x = Math.random() * 2 - 1;
	    let y = Math.random() * 2 - 1;
	    if (x * x + y * y <= 1)
	      return {x: x * radius, y: y * radius};
	  }
	}

	document.getElementById("undo").addEventListener("click", function() {
		if(undoStack.length > 0) {
			context.clearRect(0, 0, width, height);
			let canvasPic = new Image();
         canvasPic.src = undoStack.pop();
         canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
			console.log("undone");
		}
	});

	canvas.addEventListener("mousedown", function(event) {
		if(undoStack.length < 5) {
			undoStack.push(canvas.toDataURL());
		}
		if(brush == "spray") {
			let radius = context.lineWidth / 2;// = cx.lineWidth / 2;
			let dotsPerTick = Math.ceil(radius * radius * Math.PI / 30);
			mousePos = getMousePos(event);
			spray = setInterval(function() {
			  for (let i = 0; i < dotsPerTick; i++) {
				 let offset = randomPointInRadius(radius);
				 context.fillRect(mousePos.x + offset.x,
								 mousePos.y + offset.y, 1, 1);
			  }
			}, 25);
		}
		else {
			mousePos = getMousePos(event);
		}
		addEventListener("mousemove", whileDragging);
		addEventListener("mouseup", endDrawing);
	});

	canvas.addEventListener("click", function(event) {
		if(brush == "line") {
			//For clicks with no movement
			context.beginPath();
			context.arc(mousePos.x, mousePos.y, document.getElementById("stroke").value/2, 0, 2 * Math.PI, false);
			context.fill();
		}
		else if(brush == "clear") {
			context.fillRect(0, 0, width, height);
		}
		else if(brush == "spray") {

		}
		else {
			alert("something went wrong");
		}
	});
	document.getElementById("stroke").addEventListener("change", function() {
		context.lineWidth = document.getElementById("stroke").value;
	});

	document.getElementById("colour-picker").addEventListener("change", function() {
		context.fillStyle = document.getElementById("colour-picker").value;
		context.strokeStyle = document.getElementById("colour-picker").value;
	});

	document.getElementById("brush").addEventListener("change", function() {
		brush = document.getElementById("brush").value;
	});
}();
