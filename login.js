const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

/*JS ICON EYE*/

const iconEye = document.querySelector(".icon-eye");
 
iconEye.addEventListener("click", function() {
    const icon = this.querySelector("i");

	if(this.nextElementSibling.type == "password") {
	  this.nextElementSibling.type = "text";
	  icon.classList.remove("fa-eye-slash");
	  icon.classList.add("fa-eye");
	}else{
	  this.nextElementSibling.type = "password";
	  icon.classList.remove("fa-eye");
	  icon.classList.add("fa-eye-slash");
	}    
});