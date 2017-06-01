function creaJugador(equipo,posx,posy){
	let jugador = new Object();
	//Equipo
	jugador.equipo = equipo;
	
	//Posiciones
	jugador.posx = posx;
	jugador.posy = posy;
	
	//Imagen de la ficha
	jugador.img = new Image();
	
	
	jugador.asignaColor = function(color){
		if(color == "rojo"){
			jugador.img.src = "img/ficharoja.svg";
		}else{
			jugador.img.src = "img/fichaazul.svg";
		}
		return 0;
	}
	
	return jugador;
}