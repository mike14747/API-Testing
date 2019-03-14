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