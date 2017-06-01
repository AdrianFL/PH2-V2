function prepararDnD(){
	//ZONA DRAGGABLE
	let v = document.querySelectorAll("#s1>ul>li");

	for(let i = 0; i< v.length;i++){
		v[i].setAttribute("dragabble","true");
		v[i].ondragstart = function(){
			e.dataTransfer.setData("text/plain",v[i].id);
		};
	}

	//Zona droppable
	let section = document.getElementById("s2");
	section.ondragover = function(e){
		e.preventDefault();
		e.stopPropagation();
	}
	section.ondrop = function(e){
		e.preventDefault();
		e.stopPropagation();
		let id_li = e.dataTransfer.getData("text/plain");
		console.log("DROP: "+id_li);
		section.querSelector("ul").appendChild(document.getElementById(id_li));
	}
}
