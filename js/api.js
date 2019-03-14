var regExp = /^(\d{5})?$/;
var zipCode = "";
var apiKey = "4af80d5a852a405d9baad6ce23a015b0";
var queryURL = "";

function zipSearch(zip) {
    queryURL = "https://zipcodedownload.com:5430/Filter?format=json&citytype=d&cityname=&postalcode=" + zip + "&country=us5&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

$("#submit_zip").on("click", function () {
    event.preventDefault()
    zipCode = $("#zip_code").val().trim();
    if (zipCode == "" || !zipCode.match(regExp)) {
        console.log("Validation failed");
    } else {
        // zip code was submitted
        zipSearch(zipCode);
    }
});














$(document).ready(function () {
    "use strict"

    var apiKey = "js-GNpuNwQbkhcLxNeovszfbxsQmIYBXO0m0tfkVAFujdtnhtuXMU4ApgipnDTKl0O8";
    var queryURL = "https://www.zipcodeapi.com/rest/" + apiKey + "/info.json/44077/degrees";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

});