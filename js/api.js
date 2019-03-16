"use strict";

var regExp = /^(\d{5})?$/;
var zipCode = "";
var lat = "";
var lon = "";

function zipSearch(zip) {
    // zipcodedownload.com api key
    var apiKey1 = "4af80d5a852a405d9baad6ce23a015b0";
    var queryURL1 = "https://zipcodedownload.com:5430/Filter?format=json&citytype=d&cityname=&postalcode=" + zip + "&country=us5&key=" + apiKey1;

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            $("#zip_info").removeClass("d-none");
            $("#zip_city").text(response[0].city_name);
            $("#zip_state").text(response[0].province);
            $("#zip_lat").text(response[0].lat);
            lat = response[0].lat;
            $("#zip_lon").text(response[0].lon);
            lon = response[0].lon;
            $("#zip_ac").text(response[0].area_code);
            $("#zip_tz").text(response[0].time_zone);
            weather(lat, lon);
        }
    });
    return;
}

function weather(lat, lon) {
    // function weather(zip) {
    // https://api.weather.gov/points/41.75,-81.2833
    // then, use the data from: response.properties.forecast to make the following ajax call:
    // https://api.weather.gov/gridpoints/CLE/95,77/forecast
    // openweathermap.org api key

    /*
    var apiKey = "4245352a3814173935fcebaa7e744e45";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&units=imperial&cnt=1&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.cod == 200) {
            $("#weather_info").removeClass("d-none");
            $("#w_icon").append("<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Current Conditions'>");
            $("#temp").text(response.list[0].main.temp);
            $("#humidity").text(response.list[0].main.humidity);
            $("#wind_speed").text(response.list[0].wind.speed);
            $("#wind_deg").text(response.list[0].wind.deg);
            $("#cond").text(response.list[0].weather[0].main);
        }
    });
    return;
    */
    // dark sky weather
    // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    var apiKey2 = "af81fcad465db28a02669a76a2404ff6";
    var queryURL2 = "https://api.darksky.net/forecast/" + apiKey2 + "/" + lat + "," + lon;
    // https://api.darksky.net/forecast/af81fcad465db28a02669a76a2404ff6/41.75,-81.28333
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            $("#weather_info").removeClass("d-none");
            $("#weather_card").append("<div id='w'_icon'>Icon: " + response.currently.icon + "</div>");
            $("#weather_card").append("<p><b>Summary: </b>" + response.currently.summary + "</p>");
            $("#weather_card").append("<p><b>Temperature: </b>" + response.currently.temperature + "</p>");
            $("#weather_card").append("<p><b>Feels Like: </b>" + apparentTemperature + "</p>");
            $("#weather_card").append("<p><b>Humidity: </b>" + response.currently.humidity + "</p>");
            $("#weather_card").append("<p><b>Wind Speed: </b>" + response.currently.windSpeed + "</p>");
            $("#weather_card").append("<p><b>Gusts: </b>" + response.currently.windGust + "</p>");
            $("#weather_card").append("<p><b>Wind Direction: </b>" + response.currently.windBearing + "</p>");
            $("#weather_card").append("<p><b>Sunrise: </b>" + response.daily.data[0].SunriseTime + "</p>");
            $("#weather_card").append("<p><b>Sunset: </b>" + response.daily.data[0].SunsetTime + "</p>");
        }
    });
    return;
}

/*
function census() {
    var apiKey = "599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65";
    var queryURL = "";

}
*/

$("#submit_zip").on("click", function (event) {
    event.preventDefault();
    zipCode = $("#zip_code_search").val().trim();
    if (zipCode == "" || !zipCode.match(regExp)) {
        console.log("Validation failed");
    } else {
        // zip code was submitted
        $("#results_row").removeClass("d-none");
        $("#zip_code_search").val("");
        zipSearch(zipCode);
        // weather(zipCode);
    }
});