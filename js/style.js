function ShowBlock(){
	//document.getElementById(arguments[0]).setAttribute("style","display:visible");
	Fade(arguments[0],true);
	//alse nned checkn other block is closed
	for (var i = arguments.length - 1; i > 0; i--) {
		document.getElementById(arguments[i]).setAttribute("style","display:none");

	}
}

function HiddenBlock(BlockId){	
	document.getElementById(BlockId).setAttribute("style","display:none");
	//Fade(BlockId,false);
}


function Fade(BlockId,flag) {
	if(flag){
    	document.getElementById(BlockId).style.opacity = 0.0;
    	document.getElementById(BlockId).style.display = 'block';
    	setTimeout(function(){Fading(BlockId,flag);}, 50);//work for fade in
	}else{
		mouseStillDown = true;
		console.log(mouseStillDown);//fade out no need change
		//or wait until mouse release
		$(document).mouseup(function(event) {
     		setTimeout(function(){Fading(BlockId,flag);}, 50);
		});
	}
    //var int_id = setInterval(function(){Fading(BlockId,flag);}, 50);

}

function Fading(BlockId,flag){
    if(flag){
    	document.getElementById(BlockId).style.opacity = (parseFloat(document.getElementById(BlockId).style.opacity) + 0.05);
    	if (document.getElementById(BlockId).style.opacity < 0.8) {
        	setTimeout(function(){Fading(BlockId,true);}, 50);
    	}else{
    		;
    	}
    }else{
    	document.getElementById(BlockId).style.opacity = (parseFloat(document.getElementById(BlockId).style.opacity) - 0.05);
    	//fade out
    	if (parseFloat(document.getElementById(BlockId).style.opacity) > 0.05) {
    		//mouseStillDown = true;
        	setTimeout(function(){Fading(BlockId,false);}, 50);
        	console.log(mouseStillDown);
	    }else{
	    	//mouseStillDown = false;
	    	document.getElementById(BlockId).style.display = 'none';
	    	console.log("finish");
	    }
    }
}


