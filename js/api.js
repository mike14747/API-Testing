"use strict";

var regExp = /^(\d{5})?$/;
var zipCode = "";

function zipSearch(zip) {
    // zipcodedownload.com api key
    var apiKey = "4af80d5a852a405d9baad6ce23a015b0";
    var queryURL = "https://zipcodedownload.com:5430/Filter?format=json&citytype=d&cityname=&postalcode=" + zip + "&country=us5&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            console.log(zip);
            $("#zip_info").show();
            $("#zip_code").text(zip);
            $("#zip_city").text(response[0].city_name);
            $("#zip_state").text(response[0].province);
            $("#zip_lat").text(response[0].lat);
            $("#zip_lon").text(response[0].lon);
            $("#zip_ac").text(response[0].area_code);
            $("#zip_tz").text(response[0].time_zone);
        }
    });
    return;
}

function weather(zip) {
    // https://api.weather.gov/points/41.75,-81.2833
    // then, use the data from: response.properties.forecast to make the following ajax call:
    // https://api.weather.gov/gridpoints/CLE/95,77/forecast
    // openweathermap.org api key

    var apiKey = "4245352a3814173935fcebaa7e744e45";
    // api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&units=imperial&cnt=1&APPID=" + apiKey;
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=44077&APPID=4245352a3814173935fcebaa7e744e45";
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=44077&units=imperial&cnt=1&APPID=4245352a3814173935fcebaa7e744e45";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            console.log(response);
            // console.log("temp: " + response.list[0].main.temp + ", humidity: " + response.list[0].main.humidity + ", wind speed: " + "response.list[0].wind.speed");
            console.log("-wind speed: " + "response.list[0].wind.speed");
        }
    });
    return;
}

$("#submit_zip").on("click", function () {
    event.preventDefault()
    zipCode = $("#zip_code_search").val().trim();
    if (zipCode == "" || !zipCode.match(regExp)) {
        console.log("Validation failed");
    } else {
        // zip code was submitted
        $("#results_row").removeClass("d-none");
        // zipSearch(zipCode);
        weather(zipCode);
    }
});