
/*$("#about,#projects,#experiences,#skills").click(function() {
	if($(this).width()>400){
		$(this).find(".cir-content").fadeIn();
		console.log("open the block");
	}
});*/

function Sizing(BlockId,endingsize){
	//approaching ending size step by step
    BlockID = "#"+BlockId;
	var Width = $(BlockID).width();
	var Height = $(BlockID).height();
	if (Width<endingsize && Height<endingsize) {
		$(BlockID).css("width",(Width+10).toString()+"px");
		$(BlockID).css("height",(Height+10).toString()+"px");
    	setTimeout(function(){Sizing(BlockId,endingsize);}, 50);
	}else if(Width>endingsize && Height>endingsize){
		$(BlockID).css("width",(Width-10).toString()+"px");
		$(BlockID).css("height",(Height-10).toString()+"px");
    	setTimeout(function(){Sizing(BlockId,endingsize);}, 50);
	}else{
		if(endingsize==600){
			$(BlockID).find(".cir-content").fadeIn();
		}else{
			$(BlockID).find(".cir-content").fadeOut();
			$(BlockID).find(".title").fadeIn();
		}
	}
}

$(".cir-container").click(function() {
	var curID = $(this).attr("id");
	var rowW = $(this).parent().width();
	console.log("row width:"+(rowW/2).toString());
	if($(this).width()<=300){
		//first restore all same container size
		var nodeL = $("main").find("div.cir-container");
		for(var i = 0; i<4; i++){
			var m = nodeL[i];
			$(m).css("width","300px");
			$(m).css("height","300px");
			$(m).find(".cir-content").css("display","none");
			$(m).find(".title").css("display","block");
			//doesn't work when #about open
		}
		$("#"+curID).find(".title").css("display","none");
		//setTimeout(function(){Sizing(curID,600);}, 50);
		
		$(this).animate({height: (rowW/2).toString()+'px', width: (rowW/2).toString()+'px'}, "slow");
		$(this).find(".cir-content").fadeIn();
	}
});

$("button.glyphicon-remove").click(function() {
	console.log("button trigger");
	var $blk = $(this).parent().parent().parent().parent(); // find original col-md-4 div
	var blkID = $blk.attr("id");
	console.log($("#"+blkID).width());
	var rowW = $(this).parent().width();
	console.log("row width:"+(rowW/2).toString());
	if($("#"+blkID).width() >= 300){
		//setTimeout(function(){Sizing(blkID,300);}, 50);
		$("#"+blkID).animate({height: 300+'px', width: 300+'px'}, "slow");
		var cntid = $("#"+blkID).find(".cir-content");
		$(cntid).fadeOut();
		$("#"+blkID).find(".title").fadeIn();
	}
});

function ShowBlock(){
	$("#"+arguments[0]).fadeIn();
	//alse nned checkn other block is closed
	for (var i = arguments.length - 1; i > 0; i--) {
		document.getElementById(arguments[i]).setAttribute("style","display:none");

	}
}

function HiddenBlock(BlockId){	
	var blkID = "#"+BlockId;
	$(blkID).fadeOut();
}