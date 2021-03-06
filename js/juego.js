var numJugadores = 10;
var selec = -1;
var banquillo1 = null;
var enjuego1 = null;
var banquillo2 = null;
var enjuego2 = null;

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
/*function generarGrid(){
	let grid = "{[";
	
	for(let i = 0; i< 9; i++){
		for(let j = 0; j<20; j++){
			grid+='{"fila":'+i+',"columna":'+j+',"ocupado":false}';;
		}
	}
	
	grid+="]}";
	sessionStorage["grid"] = grid;
}*/

function gameclick(e){
	if(sessionStorage["fase"] == "colocar"){
		colocacion(e);
		
		//Si es igual al número de jugadores los colocados, se va a la segunda etapa.
		let cont = 0;
		for(let i = 0; i<banquillo1.jugadores.length;i++){
			if(banquillo1.jugadores[i].colocado == "true"){
				cont++;
			}
			if(banquillo2.jugadores[i].colocado == "true"){
				cont++;
			}
		}
		
		if(cont == 1){
			jugarAparece();
		}
	}
}

function colocacion(e){
	//Dependiendo de quien tenga el turno
	if(sessionStorage["turno"] == "1"){
		//Si no hay una ficha cogida en el turno del jugador 1, se escoge ficha
		if(sessionStorage["selected"] == "false"){
			//Datos de cálculo
			let cv = e.target,
				x = e.offsetX,
				y = e.offsetY,
				ctx = cv.getContext("2d");
				dim = cv.width / 20,
				fila = Math.floor( y / dim),
				columna = Math.floor( x / dim);

			if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
				return;
			}

			console.log("JUGADOR 1");
			console.log("COGIENDO FICHA");
			/*console.log(" Posicion: ${x} - ${y}");
			console.log(' Posicion: '+ x +' - '+ y);*/

			
			//Pa limpiar ese canvas rico
			cv.width = cv.width;
			
			//Redibuja el terreno
			dibujarTerreno();
			
			//Si has hecho click sobre una ficha existente, se señala y se pone como cogido:
			selec = -1;
			
			for(let i = 0; i<banquillo1.jugadores.length;i++){;
				/*console.log(Math.floor(banquillo1.jugadores[i].posx/dim) + "- " + 
				Math.floor(banquillo1.jugadores[i].posy/dim)+ " es igual a " 
				+ columna +" - " + fila);*/	 
				if(Math.floor(banquillo1.jugadores[i].posx/dim) == columna && Math.floor(banquillo1.jugadores[i].posy/dim) == fila){
					selec = i;
				}
			}
			
			if(selec != -1){
				//Pinta el recuadro que remarca la ficha
				ctx.beginPath();
				ctx.strokeStyle = '#a22';
				ctx.lineWidth = 2;
				
				if(banquillo1.jugadores[selec].colocado == "false"){
					ctx.strokeRect(columna * dim, fila * dim+dim/4, dim, dim);
				}else{
					ctx.strokeRect(columna * dim, fila * dim, dim, dim);
				}
				
				//Se pone seleccionado igual a true si se ha seleccionado la ficha
				sessionStorage["selected"] = "true";
			}
		}else{
			//Datos de cálculo
			let cv = e.target,
				x = e.offsetX,
				y = e.offsetY,
				dim = cv.width / 20,
				fila = Math.floor( y / dim),
				columna = Math.floor( x / dim);

			if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
				return;
			}

			console.log("JUGADOR 1");
			console.log("DEJANDO FICHA");
			/*console.log(" Posicion: ${x} - ${y}");
			console.log(' Posicion: '+ x +' - '+ y);
			console.log('CLICK=>fila:'+fila+' columna:'+columna);*/

			//Pa limpiar ese canvas rico
			cv.width = cv.width;
			
			//Redibuja el terreno
			dibujarTerreno();
			
			//Condicion para colocar la ficha en la pista
			let colocable = false;
			
			//Si está dentro del rango, se mete
			if(fila>=0 && fila<9 && columna>0 && columna<10){
				colocable = true;
				
				//si no coincide con ninguna posición de ninguna ficha, sigue siendo cierto
				for(let i = 0; i<banquillo1.jugadores.length;i++){;
					if(Math.floor(banquillo1.jugadores[i].posx/dim) == columna && Math.floor(banquillo1.jugadores[i].posy/dim) == fila){
						colocable = false;
					}
				}
			}
			
			//Coloca la imagen de la ficha donde desearía colocarlo
			if(colocable){
				//Actualizamos la posición de los objetos
				banquillo1.jugadores[selec].posy = fila*dim;
				banquillo1.jugadores[selec].posx = columna*dim;
				banquillo1.jugadores[selec].colocado = "true";
				sessionStorage["equipo1"] = window.JSON.stringify(banquillo1);
				
				//Se mete en el array de juego y se borra del array de banquillo	
				//enjuego1.jugadores.push(window.JSON.stringify(banquillo1.jugadores[selec]));
				
				let ctx = cv.getContext('2d');
					/*img = new Image();
					
				img.onload= function(){
					ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
				};
				img.src = "img/ficharoja.svg";*/
				
				//Pinta el recuadro que remarca la ficha
				ctx.beginPath();
				ctx.strokeStyle = '#a22';
				ctx.lineWidth = 2;
				
				ctx.strokeRect(columna * dim, fila * dim, dim, dim);
				
				//Cambia de turno
				sessionStorage["selected"]= "false";
				
			}
		}
		
		//Si han sido colocadas todas las fichas se cambia de jugador
		let cont = 0;
		for(let i = 0; i<banquillo1.jugadores.length;i++){
			if(banquillo1.jugadores[i].colocado == "true"){
				cont++;
			}
		}
		if(cont == 5){
			sessionStorage["turno"] = "2";
		}
	}else{
		//Si no hay una ficha cogida en el turno del jugador 1, se escoge ficha
		if(sessionStorage["selected"] == "false"){
			//Datos de cálculo
			let cv = e.target,
				x = e.offsetX,
				y = e.offsetY,
				ctx = cv.getContext("2d");
				dim = cv.width / 20,
				fila = Math.floor( y / dim),
				columna = Math.floor( x / dim);

			if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
				return;
			}

			console.log("JUGADOR 2");
			console.log("COGIENDO FICHA");
			/*console.log(" Posicion: ${x} - ${y}");
			console.log(' Posicion: '+ x +' - '+ y);*/

			
			//Pa limpiar ese canvas rico
			cv.width = cv.width;
			
			//Redibuja el terreno
			dibujarTerreno();
			
			//Si has hecho click sobre una ficha existente, se señala y se pone como cogido:
			selec = -1;
			
			for(let i = 0; i<banquillo2.jugadores.length;i++){;
				if(Math.floor(banquillo2.jugadores[i].posx/dim) == columna && Math.floor(banquillo2.jugadores[i].posy/dim) == fila){
					selec = i;
				}
			}
			
			if(selec != -1){
				//Pinta el recuadro que remarca la ficha
				ctx.beginPath();
				ctx.strokeStyle = '#a22';
				ctx.lineWidth = 2;
				
				if(banquillo2.jugadores[selec].colocado == "false"){
					ctx.strokeRect(columna * dim, fila * dim+dim/4, dim, dim);
				}else{
					ctx.strokeRect(columna * dim, fila * dim, dim, dim);
				}
				
				
				//Se mete en el array de juego y se borra del array de banquillo	
				//enjuego1.jugadores.push(window.JSON.stringify(banquillo1.jugadores[selec]));
				banquillo2.jugadores[selec].colocado = "true";
				sessionStorage["equipo2"] = window.JSON.stringify(banquillo2);
				
				//Se pone seleccionado igual a true si se ha seleccionado la ficha
				sessionStorage["selected"] = "true";
			}
		}else{
			//Datos de cálculo
			let cv = e.target,
				x = e.offsetX,
				y = e.offsetY,
				dim = cv.width / 20,
				fila = Math.floor( y / dim),
				columna = Math.floor( x / dim);

			if(x<1 || x>cv.width-1 || y<1 || y>cv.height-1){
				return;
			}

			console.log("JUGADOR 2");
			console.log("DEJANDO FICHA");
			/*console.log(" Posicion: ${x} - ${y}");
			console.log(' Posicion: '+ x +' - '+ y);
			console.log('CLICK=>fila:'+fila+' columna:'+columna);*/

			//Pa limpiar ese canvas rico
			cv.width = cv.width;
			
			//Redibuja el terreno
			dibujarTerreno();
			
			//Condicion para colocar la ficha en la pista
			let colocable = false;
			
			//Si está dentro de los límites del segundo campo
			if(fila>=0 && fila<9 && columna>=10 && columna<19){
				colocable = true;
				
				//Si no coincide con ninguna ficha del jugador 2, todo ok
				for(let i = 0; i<banquillo2.jugadores.length;i++){;
					if(Math.floor(banquillo2.jugadores[i].posx/dim) == columna && Math.floor(banquillo2.jugadores[i].posy/dim) == fila){
						colocable = false;
					}
				}
			}
			
			//Coloca la imagen de la ficha donde desearía colocarlo
			if(colocable){
				//Actualizamos la posición de los objetos
				banquillo2.jugadores[selec].posy = fila*dim;
				banquillo2.jugadores[selec].posx = columna*dim;
				sessionStorage["equipo2"] = window.JSON.stringify(banquillo2);
				
				let ctx = cv.getContext('2d');
					/*img = new Image();
					
				img.onload= function(){
					ctx.drawImage(img, columna*dim, fila*dim, dim, dim);
				};
				img.src = "img/ficharoja.svg";*/
				
				//Pinta el recuadro que remarca la ficha
				ctx.beginPath();
				ctx.strokeStyle = '#a22';
				ctx.lineWidth = 2;
				
				ctx.strokeRect(columna * dim, fila * dim, dim, dim);
				
				//Cambia de turno
				sessionStorage["selected"]= "false";
			}
		}
		
		//Si han sido colocadas todas las fichas se cambia de jugador
		let cont = 0;
		for(let i = 0; i<banquillo2.jugadores.length;i++){
			if(banquillo2.jugadores[i].colocado == "true"){
				cont++;
			}
		}
		if(cont == 5){
			sessionStorage["turno"] = "1";
		}
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

//Devuelve el html de una página web
function cargaPagina(href){
	return '<object type="text/html" data="'+href+'" ></object>';
}

//Devuelve
function jugarAparece(){
	//Se carga el boton de jugar
	let botonJugar = cargaPagina("boton_jugar.html");
	let seccion = document.createElement("section");
	console.log(botonJugar);
	console.log(botonJugar.indexOf("<body>") +" - "+botonJugar.indexOf("</body>"));
	seccion.innerHTML = botonJugar.substr(botonJugar.indexOf("<body>"),botonJugar.indexOf("</body>"));
	seccion.setAttribute("id","botonJugar");
	
	//Se mete dentro del documento
	let main = document.querySelector("main");
	main.appendChild(seccion);
}

function marcador(){
	let marcador = cargaPagina("marcador.html");
	
}

function startJugar(){
	
	sessionStorage["fase"] == "jugar";
}
function jugar(){
	
}

//#####################


function cargarJuego(){
	//comprobarNombresEquipos();
	dibujarTerreno();
	
	//#####################
	//Se genera el array de datos del grid
	//generarGrid();
	
	//Asignamos el turno inicial
	if(!sessionStorage["turno"]){
		sessionStorage["turno"] = "1";
	}
	
	sessionStorage["selected"] = "false";

	//Datos principales: banquillo y fichas en juego
	if(sessionStorage["equipo1"]!=null && sessionStorage["equipo1"]!=""){
		banquillo1 = window.JSON.parse(sessionStorage["equipo1"]);
		enjuego1 = window.JSON.parse(sessionStorage["equipo1"]);
		enjuego1.jugadores.splice(0,numJugadores);
	}
	if(sessionStorage["equipo2"]!=null && sessionStorage["equipo2"]!=""){
		banquillo2 = window.JSON.parse(sessionStorage["equipo2"]);
		enjuego2 = window.JSON.parse(sessionStorage["equipo2"]);
		enjuego2.jugadores.splice(0,numJugadores);
	}
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