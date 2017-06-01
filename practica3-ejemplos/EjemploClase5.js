function prepararDnD(){
	//ZONA DRAG QUEEN
	let v = document.querySelector("body>footer>img");
	for(let i = 0; i<v.length; i++){
		v[i].setAttribute("draggable","true");
		v[i].id = "img" + i;
		v[i].ondragstart = function(){
			e.dataTransfer.setData("text/plain",v[i].id);
		}
	}

	//ZONA DROP THE BASE
	let cv = document.getElementById("cv01");
	
	cv.ondragover = function(e){
		e.preventDefault();
		e.stopPropagation();
		
	}
	cv.ondrop = function(e){
		e.preventDefault();
		e.stopPropagation();
		let x = e.offsetX,
		    y = e.offsetY;
		let id = e.dataTransfer.getData("text/plain");
		let img = new Image();
		let ctx = cv.getContext("2d");

		img.onload = function(){
			ctx.drawImage(img,x,y)
		};

		img.src = document.getElementById(id).src;
		
	}
}
