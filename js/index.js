//Inicialización del sessionStorage
/*if(sessionStorage["equipo1"]==null || sessionStorage["equipo1"]==""){
	sessionStorage["equipo1"] ='{"nombre":"","jugadores":[]}';
	sessionStorage["equipo2"] ='{"nombre":"","jugadores":[]}';
}else{
	if(sessionStorage["nequipo1"]!=null && sessionStorage["nequipo1"]!=""){
		sessionStorage["equipo1"] ='{"nombre":"'+sessionStorage["nequipo1"]+'","jugadores":[]}';
		sessionStorage["equipo2"] ='{"nombre":"'+sessionStorage["nequipo2"]+'","jugadores":[]}';
	}else{
		sessionStorage["equipo1"] ='{"nombre":"","jugadores":[]}';
		sessionStorage["equipo2"] ='{"nombre":"","jugadores":[]}';
	}
}*/

//funcion que genera el formulario de juego
function generaForm(){
	
	let frm = document.querySelector("body>main>section>form");
	
	let equipo1 = sessionStorage["equipo1"];
	let equipo2 = sessionStorage["equipo2"];
	
	frm.innerHTML = 
		"<fieldset>"+
		"<legend>Inserta los nombres para jugar</legend>"+
		
		"<label for='nequipo1'>Jugador 1</label>"+
		"<input type='text' name='nequipo1' id='nequipo1' autofocus>"+
		
		"<label for='nequipo2'>Jugador 2</label>"+
		"<input onkeydown='generaBoton();' type='text' name='nequipo2' id='nequipo2'>"+
		"</fieldset>"
		;
	
	
	if(sessionStorage["nequipo1"]!=null &&  sessionStorage["nequipo1"]!=""){
		
		document.getElementById("nequipo1").value = sessionStorage["nequipo1"];
		document.getElementById("nequipo2").value = sessionStorage["nequipo2"];
		
		generaBoton();
	}
	return false;
}


//Función que genera el botón de juego
function generaBoton(){
	let frm = document.querySelector("body>main>section>form>fieldset");
	
	//Si el botón no existe ya
	let comprueba = document.getElementById("botonPlay");
	
	if(comprueba == null){
		//Si no existe, se añade en caso de estar los nombres
		//Creamos el boton
		let boton = document.createElement("input");
		
		//Se le añaden sus atributos
		boton.setAttribute("id","botonPlay");
		boton.setAttribute("value","JUGAR");
		boton.addEventListener('click', function()
			{
				//Guardamos los nombres en la sesión
				sessionStorage["nequipo1"] = document.getElementById("nequipo1").value;
				sessionStorage["nequipo2"] = document.getElementById("nequipo2").value;
				
				//Actualizamos los equipos
				/*let aux1 = window.JSON.parse(sessionStorage["equipo1"]);
				aux1.nombre = sessionStorage["nequipo1"];
				sessionStorage["equipo1"] = window.JSON.stringify(aux1);
				
				let aux2 = window.JSON.parse(sessionStorage["equipo2"]);
				aux2.nombre = sessionStorage["nequipo2"];
				sessionStorage["equipo2"] = window.JSON.stringify(aux2);*/
				
				document.querySelector("body>main>section>form").submit();
			});
		//boton.setAttribute("type","submit");
		
		
		//Se verifica que los nombres estén puestos
		let nequipo1 = document.getElementById("nequipo1").value;
		let nequipo2 = document.getElementById("nequipo2").value;

		if(nequipo1!="" && nequipo1!=null && nequipo2!="" && nequipo2!=null){
			frm.appendChild(boton);
		}
	}else{
		
		//Si existe el botón pero no hay nombres, se borra para que no se pueda jugar
		let nequipo1 = document.getElementById("nequipo1").value;
		let nequipo2 = document.getElementById("nequipo2").value;
		
		if(nequipo1=="" || nequipo1==null || nequipo2=="" || nequipo2==null){
			frm.removeChild(comprueba);
		}
	}
	return true;
}