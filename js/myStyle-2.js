
/*$("#about,#projects,#experiences,#skills").click(function() {
	if($(this).width()>400){
		$(this).find(".cir-content").fadeIn();
		console.log("open the block");
	}
});*/

function getSize(type){
	//get the container original size
	var rowW = $(".myrow").width();
	
	//the small original size will be 25%?
	var originalW = rowW/5;//by 5 for in case
	var growupW = rowW/2;

	
	if(type === "original"){
		return originalW;
	}else if(type === "enlarge"){
		return growupW;
	}
}

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
	console.log("this width "+ $(this).width());
	var rowW = $(window).width();//$(".myrow").width();
	
	//the small original size will be 25%?
	var originalW = Math.round(rowW/4);//by 5 for in case
	var growupW = Math.round(rowW/2);
	console.log("row width: "+ rowW + " original: " + originalW + " enlarge: "+ growupW);
	if($(this).width()-originalW<=1){
		//first restore all same container size
		var nodeL = $("main").find("div.cir-container");
		for(var i = 0; i<4; i++){
			var m = nodeL[i];
			$(m).css("width",originalW.toString()+'px');
			$(m).css("height",originalW.toString()+'px');
			$(m).find(".cir-content").css("display","none");
			$(m).find(".title").css("display","block");
			//doesn't work when #about open
		}
		$("#"+curID).find(".title").css("display","none");
		//setTimeout(function(){Sizing(curID,600);}, 50);
		
		$(this).animate({height: growupW.toString()+'px', width: growupW.toString()+'px'}, "slow");
		$(this).find(".cir-content").fadeIn();
	}
});

$("button.glyphicon-remove").click(function() {
	console.log("button trigger");
	var rowW = $(window).width();//$(".myrow").width();
	
	//the small original size will be 25%?
	var originalW = Math.round(rowW/4);//by 5 for in case
	var growupW = Math.round(rowW/2);

	var $blk = $(this).parent().parent().parent().parent(); // find original col-md-4 div
	var blkID = $blk.attr("id");
	console.log($("#"+blkID).width());
	if($("#"+blkID).width() <= growupW){
		//setTimeout(function(){Sizing(blkID,300);}, 50);
		$("#"+blkID).animate({height: originalW.toString()+'px', width: originalW.toString()+'px'}, "slow");
		var cntid = $("#"+blkID).find(".cir-content");
		$(cntid).fadeOut();
		$("#"+blkID).find(".title").fadeIn();
	}
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

function ShowBlock(){
	$("#"+arguments[0]).fadeIn();
	//alse nned checkn other block is closed
	for (var i = arguments.length - 1; i > 0; i--) {
		document.getElementById(arguments[i]).setAttribute("style","display:none");
	}
	//also hide other part  of same block: not only the details
}

function HiddenBlock(BlockId){	
	var blkID = "#"+BlockId;
	$(blkID).fadeOut();
}


$(window).resize(function(){
	//all container size change
	var rowW = $(window).width();//$(".myrow").width();
	//New size
	var originalW = Math.round(rowW/4);//by 5 for in case
	var growupW = Math.round(rowW/2);
	
	//first restore all same container size
	var nodeL = $.makeArray($("main").find("div.cir-container"));//Object!!!!!!
	var nodeLw= [];
	nodeL.forEach(function(m){nodeLw.push($(m).width());});
	
	if(Math.max(...nodeLw)-Math.min(...nodeLw)<1){
		//no block open
		nodeL.forEach(function(m){
			$(m).css("width",originalW.toString()+'px');
			$(m).css("height",originalW.toString()+'px');
		});
	}else{
		nodeL.forEach(function(m){
			if($(m).width() === Math.max(...nodeLw)){
				$(m).css("width",growupW.toString()+'px');
				$(m).css("height",growupW.toString()+'px');
			}else{
				$(m).css("width",originalW.toString()+'px');
				$(m).css("height",originalW.toString()+'px');
			}
		});
	}
});