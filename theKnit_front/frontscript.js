function init() {

	// var startButton = document.getElementById("start_project").addEventListener("click", startProject);
	// var viewA = document.getElementById("viewA");
	// var viewB = document.getElementById("viewB");

	// function startProject(){
	// 	var sty = getComputedStyle(viewB).display;
	// 	console.log(sty);
	// };

	//BUTTON

	//clicking button switches to viewB
	var startButton = document.getElementById('start_project').addEventListener('click', function(e){
		e.preventDefault();
		showhide('viewA');
		showhide('viewB');

	} );

	
	//show/hide divs by changing computed display value
	function showhide(id) {
		var div = document.getElementById(id);
		var sty = getComputedStyle(div);
		if (sty.display == 'none'){
			div.style.display = 'block';
		} else {
			div.style.display = 'none';
		}	
	}
};

window.addEventListener('load', init);