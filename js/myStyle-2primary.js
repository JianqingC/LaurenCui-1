function Sizing(BlockId,endingsize){
	//approaching ending size step by step: replaced by jquery animate
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
	var rowW = $(window).width();//$(".myrow").width();
	var percentO = 0.15;//small page
	var percentG = 0.70;
	if(rowW>750){
		percentO = 0.15;
		percentG = 0.65;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	console.log("click title: this width "+ $(this).width()+" row width: "+ rowW + " original: " + originalW + " enlarge: "+ growupW);
	if($(this).width()-originalW<=1 /*&& rowW>=600*/){
		//first restore all same container size
		var nodeL = $("main").find("div.cir-container");
		for(var i = 0; i<4; i++){
			var m = nodeL[i];
			$(m).css("width",originalW.toString()+'px');
			$(m).css("height",originalW.toString()+'px');
			$(m).find(".cir-content").css("display","none");
			$(m).find(".title").css("display","block");
		}
		if(rowW>=750){
			$("#"+curID).find(".title").css("display","none");
			
			$(this).animate({height: growupW.toString()+'px', width: growupW.toString()+'px'}, "slow");
			$(this).find(".cir-content").fadeIn();

			//also need change another row margin
			var rowL = $("main").find(".myrow");
			for(var i = 0; i<2; i++){
				var n = rowL[i];
				//check class to identify another row to set margin
				if($(n).attr('class')!=$(this).parent().attr('class')){
					//push the block a little bit further from each other
					var contnerL = $(n).find('div.cir-container');
					$(contnerL[0]).css('margin','5%');
					$(contnerL[1]).css('margin','5%');
				}
			}
		}else{
			//hide all other container block
			for(var i = 0; i<4; i++){
				var n = nodeL[i];
				if($(n).attr('id')!=$(this).attr('id')){
					$(n).css("display","none");
				}
			}
			$("#"+curID).find(".title").css("display","none");
			//setTimeout(function(){Sizing(curID,600);}, 50);
			
			$(this).animate({height: growupW.toString()+'px', width: growupW.toString()+'px'}, "slow");
			$(this).find(".cir-content").fadeIn();
		}
		
	}
});

$("button.glyphicon-remove").click(function() {
	console.log("button trigger");
	var rowW = $(window).width();//$(".myrow").width();
	var percentO = 0.15;//small page
	var percentG = 0.70;
	if(rowW>750){
		percentO = 0.15;
		percentG = 0.65;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	var $blk = $(this).parent().parent().parent().parent(); // find original col-md-4 div
	var blkID = $blk.attr("id");
	console.log($("#"+blkID).width());
	if($("#"+blkID).width() <= growupW){
		if(rowW>=750){
			$("#"+blkID).animate({height: originalW.toString()+'px', width: originalW.toString()+'px'}, "slow");
			var cntid = $("#"+blkID).find(".cir-content");
			$(cntid).fadeOut();
			$("#"+blkID).find(".title").fadeIn();
			//restore all same container margin
			var nodeL = $("main").find("div.cir-container");
			for(var i = 0; i<4; i++){
				var m = nodeL[i];
				$(m).css('margin','');
			}
		}else if(rowW <750){

			var cntid = $("#"+blkID).find(".cir-content");
			$(cntid).fadeOut();
			$("#"+blkID).animate({height: originalW.toString()+'px', width: originalW.toString()+'px'}, "slow");
			//re-show all other block
			var nodeL = $("main").find("div.cir-container");
			for(var i = 0; i<4; i++){
				var m = nodeL[i];
				$(m).css('display','flex');
			}
			$("#"+blkID).find(".title").css('display','block');
		}
		
	}
});

function showBlock(){
	//hide other part  of same block: not only the details
	//first change all the cir-content block display to none
	if($(window).width()>=600){
		$("#"+arguments[0]).parent().children().css("display","none");//fadeOut();
	}
	//then make the part appear
	$("#"+arguments[0]).fadeIn();
}

function hiddenBlock(){	
	$("#"+arguments[0]).fadeOut();
	if($(window).width()>=600){
		var children = $("#"+arguments[0]).parent().children();
		
		for (var i = 0; i < children.length ; i++) {
			if($(children).attr('id')!=arguments[0]){
				if($(children[i]).attr('class')=='detail-title'){
					$(children[i]).fadeIn();
				}
			}
		}
	}
	
}

/*function ShowBlock(){
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
}*/


$(window).resize(_.throttle(function(){
	//all container size change
	var rowW = $(window).width();//$(".myrow").width();
	var percentO = 0.15;//small page
	var percentG = 0.70;
	if(rowW>750){
		percentO = 0.15;
		percentG = 0.65;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	//if(rowW >= 600){
		//first restore all same container size
		var nodeL = $.makeArray($("main").find("div.cir-container"));//Object!!!!!!
		var nodeLw=[];
		nodeL.forEach(function(m){nodeLw.push($(m).width());});
		if(Math.max(...nodeLw)-Math.min(...nodeLw)<1 || _.filter(nodeLw, function(num){ return num == Math.max(...nodeLw); }).length >1){
			//no block open
			nodeL.forEach(function(m){
				$(m).css("width",originalW.toString()+'px');
				$(m).css("height",originalW.toString()+'px');
				var nodeL = $("main").find("div.cir-container");
				$(m).css('margin','');
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
	//}
}, 500));