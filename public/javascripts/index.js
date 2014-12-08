$(document).ready(function() {
	var listLatLong = [[42.366029,-71.085838],[42.375427,-71.118670]];
  	var listType = ["restaurantbakerybarcafe","schooluniversity","subway_stationtaxi_standtrain_station"];

  	//createLatLongBarGraph(listLatLong,listType);
  	//createLatLongBarGraph(listLatLong,listType);

  	$(function() {
        $("#myForm").on("submit", function(e) {
            e.preventDefault();
            $.ajax({
                url: $(this).attr("action"),
                type: 'POST',
                data: $(this).serialize(),
                beforeSend: function() {
                },
                success: function(data) {
                	console.log(data);
                    makeBarGraph(listLatLong,listType,data);
                }
            });
        });
    });

 // 	$("#myForm").submit(function () {
 // 	 	createLatLongBarGraph(listLatLong,listType);
 // 	 	return false;
	// });

  	var firstCity = "Boston";
  	var secondCity = "San Francisco";

  	createDoubleBarGraph(firstCity,secondCity);

  	$(".button1").on("click", function() {
  		$(this).parent().find(".active").removeClass("active");
  		$(this).addClass("active");
  		firstCity = $(this).text();
  		$("#doubleBarGraph").fadeOut(function() {
  			$(this).html("");
  			createDoubleBarGraph(firstCity, secondCity);
  			$(this).fadeIn();
  		});		
  	});

   	$(".button2").on("click", function() {
  		$(this).parent().find(".active").removeClass("active");
  		$(this).addClass("active");
  		secondCity = $(this).text();
  		$("#doubleBarGraph").html("");
  		createDoubleBarGraph(firstCity, secondCity); //This line is da bomb dot com
  	});
});