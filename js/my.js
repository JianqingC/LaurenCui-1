$(".pri").click(function(){
	var subMenu = $(this).find(".sub");
	if(subMenu.length>0 && $(subMenu).css("display")=="none"){
		$(subMenu).css("display","block");
	}else{
		$(subMenu).css("display","none");
	}
});
$(".sub").click(function(){
	var subsubM = $(this).find(".subsub");
	if(subsubM.length==1 && $(subsubM).css("display")=="none"){
		$(subsubM).css("display","block");
	}else{
		$(subsubM).css("display","none");
	}
});
$(".anchors").click(function(){
	var curActv , newActv ;
	if($(this).hasClass("prev")){
		curActv = $($(this).parents(".Hori")[0]).find(".horiA");
		newActv = $(curActv).prev("div.hori");
		if(newActv.length>0){
			$(curActv).removeClass("horiA");
			$(curActv).addClass("hori");
			$(newActv).removeClass("hori");
			$(newActv).addClass("horiA");
		}
	}else if($(this).hasClass("next")){
		curActv = $($(this).parents(".Hori")[0]).find(".horiA");
		newActv = $(curActv).next("div.hori");
		if(newActv.length>0){
			$(curActv).removeClass("horiA");
			$(curActv).addClass("hori");
			$(newActv).removeClass("hori");
			$(newActv).addClass("horiA");
		}
	}
});
$(".webR").click(function(){
	var rows,i;
	if(this.innerText == "[more]"){
		this.innerText="[less]";
		rows = $($(this)).parents("#skill-table").find(".webr");
		for(i=0;i<rows.length;i++){
			$(rows[i]).removeClass("webr");
			$(rows[i]).addClass("web");
		}
	}else{
		this.innerText="[more]";
		rows = $($(this)).parents("#skill-table").find(".web");
		for(i=0;i<rows.length;i++){
			$(rows[i]).addClass("webr");
			$(rows[i]).removeClass("web");
		}
	}
});