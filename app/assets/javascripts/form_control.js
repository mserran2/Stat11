/**
 * Copyright 2012 Mark Serrano
 */

$(function() {
	$(".page_title").prependTo("#page_container");
	$(".sbutton" ).button();
	$("#dialog-modal").dialog({
		height: 240,
		modal: true,
		autoOpen: false,
		buttons: { "Ok": function() { $(this).dialog("close"); } }
	});
	$("#step1 .sbutton").click(function() {
		$(this).hide();
		step2();
	});
	$("#step2 .sbutton").click(function() {
		var modal = $("#dialog-modal")
		var cont = $("#dialog-modal p")
		for(i=1;i<=$("#classnum").val();i++){
			if($("input[name=radio"+i+"]:checked").val()==undefined){
				cont.html("You need to select a division for ALL of your courses.");
				modal.dialog('open');
				return;
			}
			if(!isInteger($("#total_"+i).val())){
				cont.html("Oops. You entered something other than a number for total pages read for course #"+ i);
				modal.dialog('open');
				return;
			}
			if(!isInteger($("#comp_"+i).val())){
				cont.html("Oops. You entered something other than a number for pages complete read for course #"+ i)
				modal.dialog('open');
				return;
			}
			if($("#total_"+i).val()==""){
				cont.html("Please enter the total amount of readings for ALL your courses.");
				modal.dialog('open');
				return;
			}
			if($("#comp_"+i).val()==""){
				cont.html("Please enter the amount of readings completed for ALL your courses.");
				modal.dialog('open');
				return;
			}
			if(parseInt($("#comp_"+i).val()) > parseInt($("#total_"+i).val())){
				cont.html("Oops. For course #"+i+", you completed more pages than you were assigned! Please correct this.");
				modal.dialog('open');
				return;
			}
		}
		$(this).hide();
		step3()
	});
});


function step2(){
	$.ajax({
	  url: "/surveys/gentable/" + $("#classnum").val(),
	  error: function(){/*alert("Oops! Something bad happened. Error# 503. Try it again if it still doesn't work contact the Dean of Housing.")*/},
	  statusCode: {
	    404: function() {
	    },
	    200: function(data) {
	    	var newh = 150 + (50*$("#classnum").val());
	    	$("#step2").css("height",(newh+7)+"px");
	    	$('#content_container').animate({height: newh+"px"});
	    	$("#step1").hide("drop")
	    	$("#step2 .sbutton").before(data)
	    	$(".radio").buttonset();
	    	setTimeout(function() {$("#step2").show("slide")}, 400);
    		$("input").blur(function(){
				this.value = this.value.split(' ').join('');
			})
	    }
	  }
	});
	

}
function step3(){
	$("#step2").hide("drop")
	var newh = 150 + (85*$("#classnum").val());
	$("#step3").css("height",(newh+7)+"px");
	$('#content_container').animate({height: newh+"px"});
	//$("#step3 .sbutton").before(data)
	//$(".radio").buttonset();
	options = ['','Not at all', 'Somewhat', 'Neither here nor there', 'Well Covered', "Exremely well!"]
	for(i=1;i<=$("#classnum").val();i++){
		$("#step3 .actions").before('<div class="opcla" id="opcla'+i+'"></div>')
		radio = $("input[name=radio"+i+"]:checked").val();
		tot = $("#total_"+i).val();
		comp = $("#comp_"+i).val();
		$("#opcla"+i).append("<h3>Class #"+i+" | "+radio+" division | "+tot+" pages total | "+comp+" pages completed</h3>")
		$("#opcla"+i).append('For class '+i+', How well do you think readings were incorporated into class discussions? (Use Slider)');
		$("#opcla"+i).append('<div class="slider" id="valcla'+i+'"></div>');
		$("#opcla"+i).append('<div class="slide_stat" id="slide_stat'+i+'">Neither here nor there</div>');
		$("#opcla"+i).append('<input id="rating'+i+'" name="rating'+i+'" type="hidden" value="3" />');
		temp = i
		$("#valcla"+i).slider({
			range: "min",
			value: 3,
			min: 1,
			max: 5,
			slide: function( event, ui) {
				
				var local = this.id.charAt(this.id.length-1);
				$("#slide_stat"+local).html(options[ui.value]);
				$("#rating"+local).val(ui.value);
			}
		});
	}
	setTimeout(function() {$("#step3").show("slide")}, 400);
}
function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
        // uncomment the next line of code if you want to detect leading zeros.
        //if (i==1 && c=="0") return false;
    }
    // All characters are numbers.
    return true;
}