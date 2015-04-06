function init() {

	//START A NEW PROJECT

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
			div.style.display = 'inline-block';
		} else {
			div.style.display = 'none';
		}	
	}
};

window.addEventListener('load', init);

