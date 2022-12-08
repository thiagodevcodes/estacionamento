const modalAluno = document.querySelector("#modalAluno");
const modalUser = document.querySelector("#modalUser");

let statsMenu = false;

//Modal Aluno

function ModalAluno() {
	if (modalAluno.classList.contains("active")) {
		modalAluno.classList.remove("active")
	} else {
		modalAluno.classList.add("active");
	}
}

//Modal User

function ModalUser() {
	if (modalUser.classList.contains("active")) {
		modalUser.classList.remove("active")
	} else {
		modalUser.classList.add("active")
	}
}


function onlynumber(evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	//var regex = /^[0-9.,]+$/;
	var regex = /^[0-9.]+$/;
	if( !regex.test(key) ) {
	   theEvent.returnValue = false;
	   if(theEvent.preventDefault) theEvent.preventDefault();
	}
 }

//Search

$(document).ready(function() {
	$("#searchbar").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".box-child").filter(function() {
			$(this).toggle($(this).text()
			.toLowerCase().indexOf(value) > -1)
		});
	});
});



