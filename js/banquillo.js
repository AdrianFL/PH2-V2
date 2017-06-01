var numJugadores = 10;
var equipo1 = new Array();
var equipo2 = new Array();
	
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
	for(i = 0; i<numJugadores; i++){
		if(i<numJugadores/2){
			let jugador = creaJugador(sessionStorage["nequipo1"], 4*dim+i*dim+dim/4+i*3,9*dim+dim/4);
			
			//carga de la ficha y pintado en pantalla
			jugador.img.onload = function(){
				ctx.drawImage(jugador.img, jugador.posx,jugador.posy,dim,dim);
			}
			jugador.asignaColor("rojo");
			equipo1.push(jugador);
		}else{
			let jugador = creaJugador(sessionStorage["nequipo2"], 5*dim+i*dim+dim/2,9*dim+dim/4);
			
			//carga de la ficha y pintado en pantalla
			jugador.img.onload = function(){
				ctx.drawImage(jugador.img, jugador.posx,jugador.posy,dim,dim);
			}
			jugador.asignaColor("azul");
			equipo2.push(jugador);
		}


	}
	
	//--------sessionStorage solo soporta strings, así que colocarlos en sessionStorage para guardar la partida requiere hacer un JSON
	//y un stringify de los datos necesarios
	
	
}