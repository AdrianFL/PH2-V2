//funcion que genera el formulario de juego
function generaForm(){
	
	let frm = document.querySelector("body>main>section>form");
	
	let equipo1 = sessionStorage["nequipo1"];
	let equipo2 = sessionStorage["nequipo2"];
	
	frm.innerHTML = 
		"<fieldset>"+
		"<legend>Inserta los nombres para jugar</legend>"+
		
		"<label for='nequipo1'>Jugador 1</label>"+
		"<input type='text' name='nequipo1' id='nequipo1' autofocus>"+
		
		"<label for='nequipo2'>Jugador 2</label>"+
		"<input onkeydown='generaBoton();' type='text' name='nequipo2' id='nequipo2'>"+
		"</fieldset>"
		;
	
	
	if(sessionStorage["nequipo1"]!=null && sessionStorage["nequipo1"]!=""){
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
		boton.setAttribute("type","submit");
		boton.setAttribute("value","JUGAR");
		boton.setAttribute("onclick","jugar();");
		
		//Se verifica que los nombres estén puestos
		let nequipo1 = document.getElementById("nequipo1").value;
		let nequipo2 = document.getElementById("nequipo2").value;

		console.log("que paisha-"+ nequipo1 + "-" + nequipo2);
		if(nequipo1!="" && nequipo1!=null && nequipo2!="" && nequipo2!=null){
			
			frm.appendChild(boton);
		}
	}else{
		
		//Si existe el botón pero no hay nombres, se borra para que no se pueda jugar
		let nequipo1 = document.getElementById("nequipo1").value;
		let nequipo2 = document.getElementById("nequipo2").value;
		
		console.log("YEPPPA-"+ nequipo1 + "-" + nequipo2);
		if(nequipo1=="" || nequipo1==null || nequipo2=="" || nequipo2==null){
			frm.removeChild(comprueba);
		}
	}
	return true;
}

//Funcion que redirige la página y guarda las variables en sessionStorage();
function jugar(){
	sessionStorage["nequipo1"] = document.getElementById("nequipo1").value; 
	sessionStorage["nequipo2"] = document.getElementById("nequipo2").value;
	return true;
}