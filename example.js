var APIKey = "&units=imperial&appid=f7881db99aec8ecaf4b4187281073fcc"
var searchCity = $("#City").val();
var searchCountry = $("#Country").val();
var cities = [];
//click to search for city
$("button").on("click", function(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
    // var UV = "https://api.openweathermap.org/data/2.5/uvi?q="+ ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
        // console.log(queryURL);
        // console.log(response);
        //creates and appends button to list
        var userSearch = $("<button>");
        localStorage.setItem($("#City").val(), $("#City").val() + $("#Country").val());
        userSearch.text($("#City").val() + ", " + ($("#Country").val()).toUpperCase());
        userSearch.addClass("list-group-item");
        $("#cityList").prepend(userSearch);
        //sets the search term to the title on the right
        $("#dailyTitle").empty();
        $("#dailyTitle").append($("#City").val() + ", " + ($("#Country").val().toUpperCase()) + " (" + moment().format('L') + ")");
        var weatherImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#dailyTitle").append(weatherImage);
        //grabbing data
        $("#temp").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
        // $("#UV").attr("src","https://api.openweathermap.org/data/2.5/uvi?q="+ ($("#City").val()) + "," + ($("#Country").val()) + APIKey));
    fiveday();
    addDate1();
    addDate2();
    addDate3();
    addDate4();
    addDate5();
});
})
function fiveday(){
    var fivedayqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + ($("#City").val()) + "," + ($("#Country").val()) + APIKey;
    $.ajax({
        url: fivedayqueryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
    for(var i = 0; i < response.list.length; i++){
        if (response.list[i].dt_txt.indexOf("12:00:00") !== -1){
            var fdarray = [];
            fdarray.push([i]);
            console.log(fdarray);
            //if i use this is clears the entire div but also only shows day 1 of the array
            $("#day1").empty();
            //if the index of 12 is present in the above referenced list,
            //then create a div and make the content that index
            $("<div>").text("Temp: " + fdarray[0]).appendTo($("#day1"));
            $("<div>").text("Temp: " + fdarray[1]).appendTo($("#day2"));
            // localStorage.setItem("Temp: ", response.list[i].main.temp);
            // console.log(response.list[i].main.temp)
            // $("#day1").append(response.list[0].main.temp);
            // $("#day2").append(response.list[1].main.temp);
            // $("#day3").append(response.list[2].main.temp);
            // $("#day4").append(response.list[3].main.temp);
            // $("#day5").append(response.list[4].main.temp);
        }
    }
})};
// function callCity (){
//     // userSearch.on("click", getItem($("#City").val());
// }
//functions to add dates to five day forecast
function addDate1(){
    $("#date1").empty();
    var date1 = $("<div>");
    date1.text(moment().add(1, 'days').format('L'));
    $("#date1").append(date1);
}
function addDate2(){
    $("#date2").empty();
    var date2 = $("<div>");
    date2.append(moment().add(2, 'days').format('L'));
    $("#date2").append(date2);
}
function addDate3(){
    $("#date3").empty();
    var date3 = $("<div>");
    date3.append(moment().add(3, 'days').format('L'));
    $("#date3").append(date3);
}
function addDate4(){
    $("#date4").empty();
    var date4 = $("<div>");
    date4.append(moment().add(4, 'days').format('L'));
    $("#date4").append(date4);
}
function addDate5(){
    $("#date5").empty();
    var date5 = $("<div>");
    date5.append(moment().add(5, 'days').format('L'));
    $("#date5").append(date5);
}

My HTML:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./sytle.css">
    <title>Weather App</title>
</head>
<body>
    <div class = "container">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Weather Dashboard</h1>
            </div>
        </div>
    <div class = "row"> <!--Row for entire body-->
        <div class = "col-md-4"> <!--column for search bar-->
            <div class="card h-auto w-100" style="width: 18rem;">
                <div class="card-header">
                    Seach for a City:
                </div>
                <div class="form-group">
                        <input type="text" class="form-control" id="City" placeholder ="City">
                        <input type="text" class="form-control" id="Country" placeholder="Country">
                        <button class="btn btn-primary w-100" id="submitBtn"><i class="fas fa-angle-double-down"></i></button>
                </div>
                <ul class="list-group list-group-flush" id="cityList">
                </ul>
            </div>
        </div>
        <!--column for results-->
        <div class = "col-md-8">
            <!-- row for daily display-->
            <div class = "row">
            <div class="card float-right w-100 h-auto">
                <div class="card-header" id = "dailyTitle"></div>
                <div class="card-body">
                    <div>
                    <p id="temp"></p>
                    <p id="humidity"></p>
                    <p id="wind-speed"></p>
                    <p id="UV"></p>
                    </div>
                </div>
            </div>
            </div>
        <!-- row for five day display-->
        <div class = "row">
            <div class="header"></div>
        </div>
            <div class = "row">
                <div class="card-group w-100 h-auto">
                <div class = "col-sm-2">
                    <div class="card m-2 text-white bg-primary mb-3 float-left" style="max-width: 18rem;">
                        <div class="card-body" id="day1">
                            <h6 class="card-title" id="date1"></h6>
                        </div>
                    </div>
                </div>
                <div class = "col-sm-2">
                        <div class="card m-2 text-white bg-primary mb-3 float-left w-auto" style="max-width: 18rem;">
                            <div class="card-body" id="day2">
                                <h6 class="card-title" id="date2"></h6>
                            </div>
                        </div>
                    </div>
                <div class = "col-sm-2">
                        <div class="card m-2 text-white bg-primary mb-3 float-left w-auto" style="max-width: 18rem;">
                            <div class="card-body" id="day3">
                                <h6 class="card-title" id="date3"></h6>
                            </div>
                        </div>
                    </div>
                <div class = "col-sm-2">
                        <div class="card m-2 text-white bg-primary mb-3 float-left w-auto" style="max-width: 18rem;">
                            <div class="card-body" id="day4">
                                <h6 class="card-title" id="date4"></h6>
                            </div>
                        </div>
                    </div>
                <div class = "col-sm-2">
                        <div class="card m-2 text-white bg-primary mb-3 float-left w-auto" style="max-width: 18rem;">
                            <div class="card-body" id="day5">
                                <h6 class="card-title" id="date5"></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    </div>
    </div>
<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="crossorigin="anonymous"></script>
<script src="./script.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/0704bad5d1.js" crossorigin="anonymous"></script>
</head>
</body>
</html>