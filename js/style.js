$("#job1").animate({opacity:'0.4'},200);
$("#proj-java").slideDown('slow');

function ShowBlock(){
	document.getElementById(arguments[0]).setAttribute("style","visibility:visible");
	//alse nned checkn other block is closed
	for (var i = arguments.length - 1; i > 0; i--) {
		document.getElementById(arguments[i]).setAttribute("style","visibility:hidden");
	}
}

function HiddenBlock(BlockId){	
	document.getElementById(BlockId).setAttribute("style","visibility:hidden");
}