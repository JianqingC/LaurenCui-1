$(document).ready(function(){
	$('#top_tag').fadeOut();
	$(".slide_holder").scrollLeft(0);
	$(".slide_navi.active").removeClass("active");
	$(".slide_image_0").addClass("active");
});
$(document).scroll(function() {
	var y = $(this).scrollTop(),
	w = window.innerWidth;
	//w<900
	if (y > 100) {
		$('#top_tag').fadeIn();
	} else {
		$('#top_tag').fadeOut();
	}
	
});
$(".right_block").scroll(function() {
	var y = $(this).scrollTop(),
	w = window.innerWidth;
	//w>900
	if (y > 15) {
		$('#top_tag').fadeIn();
	} else {
		$('#top_tag').fadeOut();
	}
});
$("#top_tag").click(function(){
	var w = window.innerWidth;
	if(w<=900){
		$('html,body').scrollTop(0);
		$('#top_tag').fadeOut();
	}else{
		$('.right_block').scrollTop(0);
		$('#top_tag').fadeOut();
	}
});
$("div.flip").click(function(){
	if($(this).hasClass("flipOn")||$(this).hasClass("flipOff")){
		var parent = "#"+$(this).parent().attr("id");
		$(parent).hasClass("flipped")===true?$(parent).removeClass("flipped"):$(parent).addClass("flipped");
		// $(this).removeClass("flipOn").addClass("flipOff");
		// $(parent).children(".flipOff").removeClass("flipOff").addClass("flipOn");
		if($(this).hasClass("art")){
			//reset the art slider 
			$(".pics_tile .slide_holder").scrollLeft(0);
			$(".pics_tile .slide_navi.active").removeClass("active");
			$(".pics_tile .slide_image_0").addClass("active");
			$(".pics_tile .slide_container").hasClass("closed")===true?$(".pics_tile .slide_container").removeClass("closed").addClass("opened"):$(".pics_tile .slide_container").removeClass("opened").addClass("closed");
		}
	}
});
$(".slide_show").click(function(){
	$(".slide_container").hasClass("closed")===true?$(".slide_container").removeClass("closed").addClass("opened"):$(".slide_container").removeClass("opened").addClass("closed");
});
$(".desc .link").click(function(){
	var thisDesc = $(this).parents(".desc"),
		thisSlide = $(thisDesc).children(".slide_d"),
		thisRow = $(this).parents(".right_row");
	if(thisSlide && !$(thisDesc).hasClass("high") ){//&& !$(thisRow).hasClass("high")
		$(thisDesc).addClass("high");//
		$(thisRow).addClass("high");
		$(thisSlide).removeClass("closed").addClass("opened");
		$(this).removeClass("show").addClass("hide");
	}
});
$(".wrap").click(function(){
	var thisDesc = $(this).parents(".desc"),
		thisSlide = $(thisDesc).children(".slide_d"),
		thisRow = $(this).parents(".right_row");
	if(thisDesc && $(thisDesc).hasClass("high")){//  && $(thisRow).hasClass("high")
		$(thisSlide).removeClass("opened").addClass("closed");
		$(thisDesc).removeClass("high");//
		$(thisRow).removeClass("high");
		$(thisDesc).find(".link").removeClass("hide").addClass("show");
	}
});

$("#resume_pdf").click(function(event){
	event.stopPropagation();
	window.open('./files/Resume_Lauren_web.pdf');
});
//image navi button
$(".navi_holder .slide_navi").click(function(){
	var target = $(this).attr("class").split(" ")[1],//second class a=mark the image: slide_image_#
		art_id = "."+"slide_art_"+target.split("_")[2],//"#"+$(this).attr("class").split(" ")[1],
		pjct_id = "."+"slide_pjct_"+target.split("_")[2],
		artList=[0,300,600],
		artleft = artList[target.split("_")[2]],
		pjct_width = $(".pics").width(),
		pjctList=[0,pjct_width,pjct_width*2],
		pjctleft= pjctList[target.split("_")[2]],
		container = $(this).parents(".slide_container");
	if($(container).parent().hasClass("pics_tile")){
		$(container).find(".slide_holder").animate({scrollLeft:artleft},1500);
	}else{

		$(container).find(".slide_holder").animate({scrollLeft:pjctleft},1500);
	}
	$(container).find(".slide_navi.active").removeClass("active");
	$(this).addClass("active");
});
$(window).resize(function(){
	//resize->trigger the image slides scroll position refresh
	$(".slide_holder").scrollLeft(0);
	$(".slide_navi.active").removeClass("active");
	$(".slide_image_0").addClass("active");
});