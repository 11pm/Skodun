//ON FORM SUBMIT
$('form').submit(function(e){
	e.preventDefault();

	var search = $('#search').val();
  	$('.spinner').show();
  	$('.results').empty();


  	//Added delay, for nice spinner
	setTimeout(function(){
		$.ajax({
		  url: 'http://apis.is/car',
		  type: 'GET',
		  dataType: 'json',
		  data: {'number': search},
		  success: function(response) {

		  	$('.spinner').hide();
		  	
		  	var obj = response.results[0];
		  	var html = "";
		  	//Works
		    if(typeof obj !== "undefined"){
		    	//if car is still active
		    	if(obj.status === "Í lagi"){
		    		var now = new Date();
			    	var next = new Date(obj.nextCheck);
			    	var diff = Math.abs(next - now);
			    	var day = 1000*60*60*24;
			    	/*console.log(obj);
			    	console.log(new Date(diff));*/
			    	//html += "<h1>Næsta skoðun er " + makeIcelandicDate(next) ;
			    	html += "<h1>Það eru " + Math.round(diff/day) + " dagar í næstu skoðun</h1>";
		    	}
		    	else{
		    		html += "<h1>Þessi bíll er ekki í notkun</h1>";
		    	}
		    }
		    //Nothing found
		    else{
		    	html += "<h1>Því miður fannst ekkert</h1>";
		    }
		    $('.results').html(html);
		  }
		});
	}, 2000);  	
});