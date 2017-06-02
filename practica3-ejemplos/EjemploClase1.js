
var ficha = {"fila":0,"columna":0};

function cuadrado()
{
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');

	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 4;
	ctx.fillStyle = '#0aa';
	ctx.strokeRect(100, 100, 200, 100);
	ctx.fillRect(100, 100, 200, 100);
}

function rotar45deg(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');

	ctx.translate(100, 100);
	ctx.rotate( 45 * (Math.pi /180));
}

function imagen(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let img = new Image();

	img.onload = function(){
		ctx.drawImage(img, 0, 0, cv.width, cv.height);
	};

	img.src = 'imagen1.jpg';
}

function copiar(){
	let cv1 = document.getElementById('cv01');
	let ctx1 = cv1.getContext('2d');
	let cv2 = document.getElementById('cv02');
	let ctx2 = cv2.getContext('2d');
	let imgData;

	imgData = ctx1.getImageData(0, 0, cv1.width, cv1.height);
	ctx2.putImageData(imgData, 0, 0);
}

function aColor(color){
	let cv1 = document.getElementById('cv01');
	let ctx1 = cv1.getContext('2d');
	let cv2 = document.getElementById('cv02');
	let ctx2 = cv2.getContext('2d');
	let imgData;

	console.log("aux");
	imgData = ctx1.getImageData(0, 0, cv1.width, cv1.height);
	/*for(let i=0; i<imgData.height; i++){
		for(let j=0; i<imgData.width; j++){
			console.log("1");
			if(color!='r'){
				imgData.data[ (i * imgData.width + j) * 4 + 0] = 0; //rojo
			}
			if(color!='g'){
				imgData.data[ (i * imgData.width + j) * 4 + 1] = 0; //verde
			}
			if(color!='b'){
				imgData.data[ (i * imgData.width + j) * 4 + 2] = 0; //azul
			}
			//imgData.data[ (i * imgData.width + j) * 4 + 3] //alpha
		}
	}*/
	ctx1.putImageData(imgData, 0, 0);
}

function dibujarCuadricula(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 3;

	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#00a';
	for(let i=1; i<3; i++){
		//lineas verticales
		ctx.moveTo(i * dim, 0);
		ctx.lineTo(i * dim, cv.height);
		//lineas horizontales
		ctx.moveTo(0, i * dim);
		ctx.lineTo(cv.width, i * dim);
	}
	ctx.stroke();
}

function redibujarCanvas(){
	let cv = document.getElementById("cv01"),
		ctx = cv.getContext("2d"),
		img = new Image(),
		dim = cv.width/3;
	//Limpiamos el canvas
	cv.width = cv.width;

	//Redibujamos todo
	dibujarCuadricula();
	img.onload = function(){
		ctx.drawImage(img, ficha.columna*dim, ficha.fila*dim, dim, dim);
	};
	img.src = "ficharoja.svg";
}

function mouse_move(e){
	return;
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 3,
		fila = Math.floor( y / dim),
		columna = Math.floor( x / dim);

	/*console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('MOVING:fila:'+fila+' columna:'+columna);*/

	if(cv.getAttribute("data-move")){
		//ESTOY ARRASTRNDO LA FICHA
		console.log('MOVE=>fila:'+fila+' columna:'+columna);
		if(ficha.columna != columna || ficha.fila != fila){
			ficha.columna = columna;
			ficha.fila = fila;
			redibujarCanvas();
		}	
	}
}

function mouse_click(e){
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 3,
		fila = Math.floor( y / dim),
		columna = Math.floor( x / dim);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}

	console.log(" Posicion: ${x} - ${y}");
	console.log(' Posicion: '+ x +' - '+ y);
	console.log('CLICK=>fila:'+fila+' columna:'+columna);

	cv.width = cv.width;
	dibujarCuadricula();
	let ctx = cv.getContext('2d'),
		img = new Image();
		
	img.onload= function(){
		
		ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
 	};
	img.src = "ficharoja.svg";

	ctx.beginPath();
	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 4;
	ctx.strokeRect(columna * dim, fila * dim, dim, dim);
}

function mouse_down(e){
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 3,
		fila = Math.floor( y / dim),
		columna = Math.floor( x / dim);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}
	console.log('DOWN=>fila:'+fila+' columna:'+columna);
	if(ficha.columna == columna && ficha.fila == fila){ //Hay ficha
		cv.setAttribute("data-down","true");
	}
}

function mouse_up(e){
	let cv = e.target,
		x = e.offsetX,
		y = e.offsetY,
		dim = cv.width / 3,
		fila = Math.floor( y / dim),
		columna = Math.floor( x / dim);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}
	console.log('UP=>fila:'+fila+' columna:'+columna);
	
	cv.removeAttribute("data-down");
}

