
$(".cl4,.cl4r").click(function() {
	$(this).parent().children("div").css("display","block");
	$(this).parent().css("width","60%");
});

$("button.glyphicon-remove").click(function() {
	var $colblk = $(this).parent().parent(); // find original col-md-4 div
		$colblk.find("div").css("display","none");
		$colblk.css("width","30%");
});

function ShowBlock(){
	//document.getElementById(arguments[0]).setAttribute("style","display:visible");
	Fade(arguments[0],true);
	//alse nned checkn other block is closed
	for (var i = arguments.length - 1; i > 0; i--) {
		document.getElementById(arguments[i]).setAttribute("style","display:none");

	}
}

function HiddenBlock(BlockId){	
	$("#"+BlockId).fadeOut();
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