var searchCity=$("#City").val();
var searchcountry=$("#Country").val();
var cities=[];
var APIKey="&units=imperial&appid=daf68df3bd764a692d5a54534756eecf"


$("button").on("click",(function() {
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
   
$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
    console.log(response);
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    
    var cityButton=$("<button>");
    localStorage.setItem($("#City").val(),$("#Country").val());
    })
}))