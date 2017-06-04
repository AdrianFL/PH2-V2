var equipo1 = null;
var equipo2 = null;
if(sessionStorage["equipo1"]!=null && sessionStorage["equipo1"]!=""){
	equipo1 = window.JSON.parse(sessionStorage["equipo1"]);
}
if(sessionStorage["equipo2"]!=null && sessionStorage["equipo2"]!=""){
	equipo2 = window.JSON.parse(sessionStorage["equipo2"]);
}

//Función que carga las funciones necesarias para hacer funcional el banquillo de jugadores
function cargaBanquillo(){
	//Iniciamos la fase de colocacion
	if(!sessionStorage["fase"]){
		sessionStorage["fase"]="colocar";
	}else{
		if(sessionStorage["fase"]=="intermedio"){
			sessionStorage["fase"]="colocar";
		}
	}
	
	cargaPlantilla();
	dibujaBanquillo();
}

function cargaPlantilla(){
	let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;
	
	//Inicializamos el array de jugadores de cada equipo
	if(window.JSON.parse(sessionStorage["equipo1"]).jugadores.length<=0 && window.JSON.parse(sessionStorage["equipo2"]).jugadores.length<=0){
		for(let i = 0; i<numJugadores/2; i++){
			equipo1.jugadores.push({"posx":0,"posy":0,"img":"img/ficharoja.svg","colocado":"false"});
		}
		
		for(let i = 0; i<numJugadores/2; i++){
			equipo2.jugadores.push({"posx":0,"posy":0,"img":"img/fichaverde.svg","colocado":"false"});
		}
		
		//Los metemos dentro del array JSON
		for(let x = 0; x<numJugadores/2; x++){
				//let jugador = creaJugador(sessionStorage["nequipo1"], 4*dim+i*dim+dim/4+i*3,9*dim+dim/4);
				//Metemos los datos en el JSON de equipo
				equipo1.jugadores[x].posx = 3*dim+x*dim;
				equipo1.jugadores[x].posy = 9*dim+dim/4;
				
				//carga de la ficha y pintado en pantalla
				let img = new Image();
				img.onload = function(){
					ctx.drawImage(img, equipo1.jugadores[x].posx,equipo1.jugadores[x].posy,dim,dim);
				}
				img.src = equipo1.jugadores[x].img;
		
				
		
				//LO MISMO PARA EL JUGADOR 2
				//let jugador = creaJugador(sessionStorage["nequipo2"], 10*dim+i*dim+dim/2,9*dim+dim/4);	
				//Metemos los datos en el JSON de equipo
				equipo2.jugadores[x].posx = 12*dim+x*dim;
				equipo2.jugadores[x].posy = 9*dim+dim/4;
				
				//carga de la ficha y pintado en pantalla
				let img2 = new Image();
				img2.onload = function(){
					ctx.drawImage(img2, equipo2.jugadores[x].posx,equipo2.jugadores[x].posy,dim,dim);
				}
				img2.src = equipo2.jugadores[x].img;			
		}
	}
	//Guardamos en sesión el equipo formado
	sessionStorage["equipo1"] = window.JSON.stringify(equipo1);
	sessionStorage["equipo2"] = window.JSON.stringify(equipo2);
}

function cargaPag(href){
	let xhr= new XMLHttpRequest();
	let fText = "";
	xhr.open('GET', href, true);
	xhr.onreadystatechange= function() {
		fText = xhr.responseText;
	};
	xhr.send();
	return fText;
}

//Función que dibuja el banquillo en su propio canvas
function dibujaBanquillo(){
	/*let cv = document.getElementById('cv01');
	let ctx = cv.getContext('2d');
	let dim = cv.width / 20;
	
	//Si estamos en la fase de colocar fichas, se dibuja el banquillo
	if(sessionStorage["fase"] == "colocar"){

		
		//Actualizamos los jugadores del sessionStorage
		equipo1 = window.JSON.parse(sessionStorage["equipo1"]);
		equipo2 = window.JSON.parse(sessionStorage["equipo2"]);
		
		//bancoIzq
		ctx.strokeStyle = "#a00";
		ctx.lineWidth = 4;
		ctx.strokeRect(2*dim, 9*dim, 7*dim, 1.5*dim);
		
		//bancoDech
		ctx.strokeRect(11*dim, 9*dim, 7*dim, 1.5*dim);
	}
	
	for(let i=0; i<equipo1.jugadores.length;i++){
		let img = new Image();
	
		img.onload = function(){
			ctx.drawImage(img,equipo1.jugadores[i].posx,equipo1.jugadores[i].posy,dim,dim);
		}
		
		img.src = equipo1.jugadores[i].img;
	}
	
	
	
	for(let i=0; i<equipo2.jugadores.length;i++){
		let img = new Image();
		
		img.onload = function(){
			ctx.drawImage(img,equipo2.jugadores[i].posx,equipo2.jugadores[i].posy,dim,dim);
		}
		img.src = equipo2.jugadores[i].img;
	}*/
	
	//cargamos la plantilla en el footer
	let main = document.querySelector("main");
	let footer = document.createElement("footer");
	footer.innerHTML = cargaPag("banquillo.html");
	console.log(cargaPag("banquillo.html"));
	main.appendChild(footer);
	
	
}

