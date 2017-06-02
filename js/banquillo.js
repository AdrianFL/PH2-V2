var numJugadores = 10;
if(sessionStorage["equipo1"]!=null && sessionStorage["equipo1"]!=""){
	var equipo1 = window.JSON.parse(sessionStorage["equipo1"]);
}
if(sessionStorage["equipo2"]!=null && sessionStorage["equipo2"]!=""){
	var equipo2 = window.JSON.parse(sessionStorage["equipo2"]);
}


	
//Función que carga las funciones necesarias para hacer funcional el banquillo de jugadores
function cargaBanquillo(){
	dibujaBanquillo();
}

//Función que dibuja el banquillo en su propio canvas
function dibujaBanquillo(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;
	
	//bancoIzq
	ctx.strokeRect(4*dim, 9*dim, 6*dim, 1.5*dim);
	
	//bancoDech
	ctx.strokeRect(10*dim, 9*dim, 6*dim, 1.5*dim);
	
	
	
	let i = 0;
	
	//Inicializamos el array de jugadores de cada equipo
	let jugadores1 = "[";
	for(i = 0; i<numJugadores/2; i++){
		jugadores1+= '"{"posx":0,"posy:0"}"';
	}
	jugadores1+="]";
	
	equipo1.jugadores = jugadores1;
	
	let jugadores2 = "[";
	for(i = 0; i<numJugadores/2; i++){
		jugadores2+= '"{"posx":0,"posy:0"}"';
	}
	jugadores2+="]";
	
	equipo2.jugadores = jugadores2;
	
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
			
			//#############
			//console.log("DIMEQ UE ESTO VA AL MENOS");
			//console.log(window.JSON.stringify(equipo1));
			//#############
			
			
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
	
	//--------sessionStorage solo soporta strings, así que colocarlos en sessionStorage para guardar la partida requiere hacer un JSON
	//y un stringify de los datos necesarios
	
	
}