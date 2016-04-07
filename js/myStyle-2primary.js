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
		if(endingsize==750){
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
		percentG = 0.50;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	
	if($(this).width()-originalW<=1){//
		console.log("click title: this width "+ $(this).width()+" row width: "+ rowW + " original: " + originalW + " enlarge: "+ growupW);
		//first restore all same container size
		var nodeL = $("main").find("div.cir-container");
		for(var i = 0; i<4; i++){
			var m = nodeL[i];
			$(m).css("width",originalW.toString()+'px');
			$(m).css("height",originalW.toString()+'px');
			$(m).find(".cir-content").css("display","none");
			$(m).find(".title").css("display","block");
			$(m).css('margin','');
			//also make sure detail list are closed
			var detailL = $(m).find(".detail");
			var j;
			for(j = 0; j< detailL.length; j++){
				$(detailL[j]).fadeOut();
			}
			var detailL = $(m).find(".detail-title");
			for(j = 0; j< detailL.length; j++){
				$(detailL[j]).fadeIn();
			}
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
		percentG = 0.50;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	var $blk = $(this).parent().parent().parent().parent(); // find original col-md-4 div
	var blkID = $blk.attr("id");
	console.log($("#"+blkID).width());
	if($("#"+blkID).width() > originalW*2){
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
			//re-show all other block
			var nodeL = $("main").find("div.cir-container");
			for(var i = 0; i<4; i++){
				var m = nodeL[i];
				$(m).css('display','flex');
				$(m).css('margin','auto');
				$(m).animate({height: originalW.toString()+'px', width: originalW.toString()+'px'}, "slow");
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

$(window).resize(_.throttle(function(){
	//all container size change
	var rowW = $(window).width();//$(".myrow").width();
	var percentO = 0.15;//small page
	var percentG = 0.70;
	if(rowW>750){
		percentO = 0.15;
		percentG = 0.50;
	}
	//the small original size will be 25%?
	var originalW = Math.round(rowW*percentO);//by 5 for in case
	var growupW = Math.round(rowW*percentG);
	//first restore all same container size
	var nodeL = $.makeArray($("main").find("div.cir-container"));//Object!!!!!!
	//above using the width of the container to determine whether a block been clicked
	//now try using check title class been hide or not 
	var nodeLt = [];//contain the clicked one  juquery obj
	nodeL.forEach(function(m){var t = $(m).find('.title'); if(t.length == 1){if($(t).css('display')=='none'){nodeLt.push(m); }} });
	
	if(nodeLt.length == 1){
		//there is one container been clicked and open
		nodeL.forEach(function(m){
			console.log($(m).attr('id') + " ,the clicked one:"+$(nodeLt[0]).attr('id'))
			if($(m).attr('id')== $(nodeLt[0]).attr('id')){
				//detail open one: >=750: if detail open: other detail-title closed
				$(m).css("width",growupW.toString()+'px');
				$(m).css("height",growupW.toString()+'px');
				var detailTL = $(m).find(".detail-title");
				var detailL = $(m).find(".detail");
				if(detailTL.length >0 && detailL.length > 0){
					var j;
					//check whether there is detail opened
					var detailLb = [];
					if(detailL.length > 1){
						for(j = 0; j< detailL.length; j++){
							detailLb.push($(detailL[j]).css('display'));
						}
					}else{
						detailLb.push($(detailL).css('display'));
					}
					//only need reset the display when one of detail is poped
					if(!_.isUndefined(_.find(detailLb,function(n){return n == 'block';}))){
						if(rowW>=750){
							//detail title hide
							for(j = 0; j< detailTL.length; j++){
								$(detailTL[j]).fadeOut();
							}
							$(m).css('margin','');
						}else{
							//detail title show up
							for(j = 0; j< detailTL.length; j++){
								$(detailTL[j]).fadeIn();
							}
						}
					}
				}
				
			}else{
				if(rowW>=750){
					console.log($(m).attr('id'));
					$(m).css("width",originalW.toString()+'px');
					$(m).css("height",originalW.toString()+'px');
					$(m).css('display','flex');
					if($(m).parent().attr("class")!=$(nodeLt[0]).parent().attr("class")){
						$(m).css('margin','5%');
					}else{
						$(m).css('margin','');
					}
				}else{
					$(m).css('display','none');
					$(m).css('margin','');
					//console.log("m is "+m);
				}
			}
		});
	}else{
		//all size set as same only need resize container
		nodeL.forEach(function(m){
			$(m).css("width",originalW.toString()+'px');
			$(m).css("height",originalW.toString()+'px');
			var nodeL = $("main").find("div.cir-container");
			$(m).css('margin','');
		});
	}
}, 500));