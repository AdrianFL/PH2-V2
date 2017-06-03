var numJugadores = 10;
if(sessionStorage["equipo1"]!=null && sessionStorage["equipo1"]!=""){
	var equipo1 = window.JSON.parse(sessionStorage["equipo1"]);
}
if(sessionStorage["equipo2"]!=null && sessionStorage["equipo2"]!=""){
	var equipo2 = window.JSON.parse(sessionStorage["equipo2"]);
}


	
//Función que carga las funciones necesarias para hacer funcional el banquillo de jugadores
function cargaBanquillo(){
	cargaPlantilla();
	dibujaBanquillo();
}

function cargaPlantilla(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;
	
	let i = 0;
	
	//Inicializamos el array de jugadores de cada equipo
	for(i = 0; i<numJugadores/2; i++){
		let jugadores1 = '"{"posx":0,"posy":0,"img":"img/ficharoja.svg","colocado":false}"';
		//equipo1.jugadores.push({"posx":0,"posy":0,"img":"img/ficharoja.svg","colocado":false});
	}
	
	for(i = 0; i<numJugadores/2; i++){
		let jugadores2 = '"{"posx":0,"posy":0,"img":"img/fichaazul.svg"}"';
		//equipo2.jugadores.push({"posx":0,"posy":0,"img":"img/fichaazul.svg","colocado":false});
	}
	
	//Los metemos dentro del array JSON
	i = 0;
	for(i = 0; i<numJugadores; i++){
		if(i<numJugadores/2){
			let jugador = creaJugador(sessionStorage["nequipo1"], 4*dim+i*dim+dim/4+i*3,9*dim+dim/4);
			
			//carga de la ficha y pintado en pantalla
			jugador.img.onload = function(){
				ctx.drawImage(jugador.img, jugador.posx,jugador.posy,dim,dim);
			}
			jugador.asignaColor("rojo");
	
			//Metemos los datos en el JSON de equipo
			equipo1.jugadores[i].posx = jugador.posx;
			equipo1.jugadores[i].posy = jugador.posy;
			
			//Guardamos en sesión local
			sessionStorage["equipo1"] = window.JSON.stringify(equipo1);
			
		}else{
			let jugador = creaJugador(sessionStorage["nequipo2"], 5*dim+i*dim+dim/2,9*dim+dim/4);
			
			//carga de la ficha y pintado en pantalla
			jugador.img.onload = function(){
				ctx.drawImage(jugador.img, jugador.posx,jugador.posy,dim,dim);
			}
			jugador.asignaColor("azul");
			
			//Metemos los datos en el JSON de equipo
			equipo2.jugadores[i].posx = jugador.posx;
			equipo2.jugadores[i].posy = jugador.posy;
			
			//Guardamos en sesión local
			sessionStorage["equipo2"] = window.JSON.stringify(equipo2);
			
		}


	}
}
//Función que dibuja el banquillo en su propio canvas
function dibujaBanquillo(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;
	
	//bancoIzq
	ctx.strokeRect(4*dim, 9*dim, 6*dim, 1.5*dim);
	
	/* ARREGLAR
	for(let i=0; i<equipo1.jugadores.length;i++){
		let img = new Image();
		
		img.onload = function(){
			ctx.drawImage(img,equipo1.jugadores[i].posx,equipo1.jugadores[i].posy,dim,dim);
		}
		
		img.src = equipo1.jugadores[i].img;
	}
	*/
	//bancoDech
	ctx.strokeRect(10*dim, 9*dim, 6*dim, 1.5*dim);
	/*
	for(let i=0; i<equipo2.jugadores.length;i++){
		let img = new Image();
		
		img.onload = function(){
			ctx.drawImage(img,equipo2.jugadores[i].posx,equipo2.jugadores[i].posy,dim,dim);
		}
		img.src = equipo2.jugadores[i].img;
	}*/
	
	
	
}

