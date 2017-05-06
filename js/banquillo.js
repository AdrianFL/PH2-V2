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
		//------Completar, obvio
		if(i<numJugadores/2){
			var jugador = creaJugador(sessionStorage["nequipo1"], ); 
		}else{
			var jugador = creaJugador(sessionStorage["nequipo2"], ); 
		}
	}
	
	//--------sessionStorage solo soporta strings, así que colocarlos en sessionStorage para guardar la partida requiere hacer un JSON
	//y un stringify de los datos necesarios
	
	
}