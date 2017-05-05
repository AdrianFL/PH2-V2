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

function cargarJuego(){
	//comprobarNombresEquipos();
	dibujarTerreno();
}

//Funcion para comprobar que ambos equipos tienen nombres en sessionStorage
//Si no es asi, redirecciona a index.html
function comprobarNombresEquipos(){
	if(sessionStorage)
	{
		if(sessionStorage.getItem("nequipo1")&&sessionStorage.getItem("nequipo2"))
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