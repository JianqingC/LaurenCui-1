$(".cir-container").click(function() {
	var curID = $(this).attr("id");
	
	//first restore all same container size
	var nodeL = $("main").find("div.cir-container");
	for(var i = 0; i<4; i++){
		var m = nodeL[i];
		$(m).find(".cir-content").css("display","none");
		$(m).find(".title").css("display","block");
		//doesn't work when #about open
	}
	$("#"+curID).find(".title").css("display","none");
	$(this).find(".cir-content").fadeIn();
});

$("button.glyphicon-remove").click(function() {
	console.log("button trigger");
	var $blk = $(this).parent().parent().parent().parent(); // find original col-md-4 div
	var blkID = $blk.attr("id");
	var cntid = $("#"+blkID).find(".cir-content");
	$(cntid).fadeOut();
	$("#"+blkID).find(".title").fadeIn();
});

function showBlock(){
	//hide other part  of same block: not only the details
	//first change all the cir-content block display to none
	$("#"+arguments[0]).parent().children().fadeOut();
	//then make the part appear
	$("#"+arguments[0]).fadeIn();
}

function hiddenBlock(){	
	$("#"+arguments[0]).fadeOut();
	var children = $("#"+arguments[0]).parent().children();
	
	for (var i = 0; i < children.length ; i++) {
		if($(children).attr('id')!=arguments[0]){
			if($(children[i]).attr('class')=='detail-title'){
				$(children[i]).fadeIn();
			}
		}
	}
	
}

$(window).resize(function(){
	//all container size change
});