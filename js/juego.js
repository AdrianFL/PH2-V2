
function dibujarTerreno(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000';
	for(let i=0; i<19; i++)
	{
		//Lineas verticales
		ctx.moveTo((i+1)*dim, 0);
		ctx.lineTo((i+1)*dim, 9*dim);

		//Lineas horizontales
		if(i<10)
		{
			ctx.moveTo(dim, i*dim);
			ctx.lineTo(cv.width-dim, i*dim);
		}
	}
	ctx.stroke();
	dibujarCampos();
	dibujarPorterias();
}

function dibujarCampos()
{
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.strokeStyle = '#a00';

	ctx.strokeRect(dim, 0, 18*dim, 9*dim);
	ctx.strokeRect(dim, 2*dim, 3*dim, 5*dim);
	ctx.strokeRect(16*dim, 2*dim, 3*dim, 5*dim);
	ctx.moveTo(10*dim, 0);
	ctx.lineTo(10*dim, 9*dim);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(10*dim, (4*dim)+(dim/2), dim, 1.5*Math.PI, 2.5*Math.PI, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(10*dim, (4*dim)+(dim/2), dim, 1.5*Math.PI, 2.5*Math.PI, true);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(4*dim, (4*dim)+(dim/2), dim, 1.5*Math.PI, 2.5*Math.PI, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(16*dim, (4*dim)+(dim/2), dim, 1.5*Math.PI, 2.5*Math.PI, true);
	ctx.stroke();
}

function dibujarPorterias()
{
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;

	ctx.beginPath();
	ctx.fillStyle = '#00f';
	ctx.strokeStyle = '#00a';
	ctx.strokeRect(0, 3*dim, dim, dim);
	ctx.fillRect(0, 3*dim, dim, dim);
	ctx.strokeRect(0, 4*dim, dim, dim);
	ctx.fillRect(0, 4*dim, dim, dim);
	ctx.strokeRect(0, 5*dim, dim, dim);
	ctx.fillRect(0, 5*dim, dim, dim);7
	ctx.strokeRect(19*dim, 3*dim, dim, dim);
	ctx.fillRect(19*dim, 3*dim, dim, dim);
	ctx.strokeRect(19*dim, 4*dim, dim, dim);
	ctx.fillRect(19*dim, 4*dim, dim, dim);
	ctx.strokeRect(19*dim, 5*dim, dim, dim);
	ctx.fillRect(19*dim, 5*dim, dim, dim);
}

//#####################
function generarGrid(){
	let grid = "{[";
	
	for(let i = 0; i< 9; i++){
		for(let j = 0; j<20; j++){
			grid+='{"fila":'+i+',"columna":'+j+',"ocupado":false}';;
		}
	}
	
	grid+="]}";
	sessionStorage["grid"] = grid;
}

function gameclick(e){
	//Dependiendo de quien tenga el turno
	if(sessionStorage["turno"] == "1"){
		let cv = e.target,
			x = e.offsetX,
			y = e.offsetY,
			dim = cv.width / 20,
			fila = Math.floor( y / dim),
			columna = Math.floor( x / dim);

		if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
			return;
		}

		console.log(" Posicion: ${x} - ${y}");
		console.log(' Posicion: '+ x +' - '+ y);
		console.log('CLICK=>fila:'+fila+' columna:'+columna);

		cv.width = cv.width;
		
		dibujarTerreno();
		
		let ctx = cv.getContext('2d'),
			img = new Image();
			
		img.onload= function(){
			ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
		};
		img.src = "img/ficharoja.svg";
		
		sessionStorage["turno"] = "2";
	}else{
		
		sessionStorage["turno"] = "1";
	}
}


function down(e){
	//Este funciona cuando haces click
	
	//Hacer drag-and-drop con esto
}

function up(e){
	//Este también
	
	//Hacer drag-and-drop con esto too
}
//#####################


function cargarJuego(){
	//comprobarNombresEquipos();
	dibujarTerreno();
	
	//#####################
	//Se genera el array de datos del grid
	generarGrid();
	
	//Asignamos el turno inicial
	sessionStorage["turno"] = "1";
	//#####################
}

//Funcion para comprobar que ambos equipos tienen nombres en sessionStorage
//Si no es asi, redirecciona a index.html
function comprobarNombresEquipos(){
	if(sessionStorage)
	{
		if(sessionStorage.getItem("equipo1")&&sessionStorage.getItem("equipo2"))
		{
			return;
		}
		else
		{
			window.location.replace("index.html");
		}
	}
	else
	{
		alert("Tu navegador actual no tiene soporte para sessionStorage");
	}
}