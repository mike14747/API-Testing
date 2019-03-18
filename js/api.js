"use strict";

var regExp = /^(\d{5})?$/;
var zipCode = "";
var lat = "";
var lon = "";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB75AD4RwNGFghlu53lGcend2AO0DBhCj4",
    authDomain: "api-testing-78812.firebaseapp.com",
    databaseURL: "https://api-testing-78812.firebaseio.com",
    projectId: "api-testing-78812",
    storageBucket: "api-testing-78812.appspot.com",
    messagingSenderId: "668074926103"
};
firebase.initializeApp(config);

// yelp via heroku
var myurl = "https://api.yelp.com/v3/businesses/search?latitude=41.75&longitude=-81.28333&categories=restaurants";

$.ajax({
    url: myurl,
    headers: {
        'Authorization': 'Bearer iva312UpJwgodz8SBwfU35hwdK7Hxkjw-enIQ6TOizDWwFhWC59f_-pebY5GNDBI00_HK1HnWSux0wlfmSNCQDpOqBeKw2Uu1KkaBtC_jPXysdHW9vKuMe14T8eOXHYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        // Grab the results from the API JSON return
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0) {
            // Display a header on the page with the number of results
            $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
            // Itirate through the JSON array of 'businesses' which was returned by the API
            $.each(data.businesses, function (i, item) {
                // Store each business's object in a variable
                var id = item.id;
                var alias = item.alias;
                var phone = item.display_phone;
                var image = item.image_url;
                var name = item.name;
                var rating = item.rating;
                var reviewcount = item.review_count;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                // Append our result into our page
                $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
            });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
            $('#results').append('<h5>We discovered no results!</h5>');
        }
    }
});

function zipSearch(zip) {
    // zipcodedownload.com api key
    var apiKey = "4af80d5a852a405d9baad6ce23a015b0";
    var queryURL = "https://zipcodedownload.com:5430/Filter?format=json&citytype=d&cityname=&postalcode=" + zip + "&country=us5&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            $("#zip_info").removeClass("d-none");
            $("#zip_card").empty();
            $("#zip_card").append("<p><b>City: </b>" + response[0].city_name + "</p>");
            $("#zip_card").append("<p><b>State: </b>" + response[0].province + "</p>");
            $("#zip_card").append("<p><b>Latitude: </b>" + response[0].lat + "</p>");
            lat = response[0].lat;
            $("#zip_card").append("<p><b>Longitude: </b>" + response[0].lon + "</p>");
            lon = response[0].lon;
            $("#zip_card").append("<p><b>Area Code: </b>" + response[0].area_code + "</p>");
            $("#zip_card").append("<p><b>Time Zone: </b>" + response[0].time_zone + "</p>");
            // weather(lat, lon);
        }
    });
    return;
}

// function weather(lat, lon) {
function weather(zip) {
    // https://api.weather.gov/points/41.75,-81.2833
    // then, use the data from: response.properties.forecast to make the following ajax call:
    // https://api.weather.gov/gridpoints/CLE/95,77/forecast

    // openweathermap.org api key
    var apiKey = "4245352a3814173935fcebaa7e744e45";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "&units=imperial&cnt=1&APPID=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.cod == 200) {
            $("#weather_info").removeClass("d-none");
            $("#weather_card").empty();
            $("#weather_card").append("<div id='w'_icon'><img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Current Conditions'></div>");
            $("#weather_card").append("<p><b>Temperature: </b>" + response.list[0].main.temp + "</p>");
            $("#weather_card").append("<p><b>Humidity: </b>" + response.list[0].main.humidity + "</p>");
            $("#weather_card").append("<p><b>Wind Speed: </b>" + response.list[0].wind.speed + "</p>");
            $("#weather_card").append("<p><b>Wind Direction: </b>" + response.list[0].wind.deg + "</p>");
            $("#weather_card").append("<p><b>Summary: </b>" + response.list[0].weather[0].main + "</p>");
        }
    });
    return;
    /*
    // dark sky weather
    var apiKey = "af81fcad465db28a02669a76a2404ff6";
    var queryURL = "https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + lon;
    // https://api.darksky.net/forecast/af81fcad465db28a02669a76a2404ff6/41.75,-81.28333
    $.ajax({
        url: queryURL,
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
    */
}

function census(zip) {
    var apiKey = "599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65";
    var queryURL = "https://api.census.gov/data/2017/acs/acs5/profile?get=NAME,DP05_0001E,DP05_0019PE,DP05_0024PE,DP05_0004E,DP03_0062E,DP05_0018E,DP04_0089E,DP04_0134E,DP02_0060PE,DP03_0119PE&for=zip+code+tabulation+area:" + zip + "&key=" + apiKey;
    // https://api.census.gov/data/2017/acs/acs5/profile?get=NAME,DP05_0001E,DP05_0019PE,DP05_0024PE,DP05_0004E,DP03_0062E,DP05_0018E,DP04_0089E,DP04_0134E,DP02_0060PE,DP03_0119PE&for=zip+code+tabulation+area:44077&key=599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65
    // DP05_0001E (total population)
    // DP05_0019PE (18 and under percent of total population)
    // DP05_0024PE (65 and over percent of total population)
    // DP05_0005PE (percent under 5 yo)
    // DP05_0006PE (percent 5-9 yo)
    // DP05_0007PE (percent 10-14 yo)
    // DP05_0008PE (percent 15-19 yo)
    // DP05_0009PE (percent 20-24 yo)
    // DP05_0010PE (percent 25-34 yo)
    // DP05_0011PE (percent 35-44 yo)
    // DP05_0012PE (percent 45-54 yo)
    // DP05_0012PE (percent 55-59 yo)
    // DP05_0014PE (percent 60-64 yo)
    // DP05_0015PE (percent 65-74 yo)
    // DP05_0016PE (percent 75-84 yo)
    // DP05_0017PE (percent 85+ yo)
    // DP05_0004E (number of males per 100 females)
    // DP05_0002PE (percent males)
    // DP05_0003PE (percent females)
    // DP03_0062E (median household income)
    // DP05_0018E (median age)
    // DP04_0089E (median home values... owner occupied)
    // DP04_0134E (gross rent)
    // DP02_0060PE (highest level of education 9th-12th grade... no diploma)
    // DP03_0119PE (poverty rate)
    // DP05_0037PE (race - percent white)
    // DP05_0038PE (race - percent black or African American)
    // DP05_0070PE (race - percent Hispanic or Latino)
    // DP05_0044PE (race - percent Asian)
    // DP05_0039PE (race - percent American Indian or Alaska native)
    // DP05_0052PE (race - percent Hawaiian or Pacific Islander)
    // DP05_0057PE (race - percent other race)
    // DP05_0035PE (race - percent 2 or more races)
    // https://api.census.gov/data/2017/acs/acs5/profile?get=NAME,DP05_0001E,DP05_0019PE,DP05_0024PE,DP05_0005PE,DP05_0006PE,DP05_0007PE,DP05_0008PE,DP05_0009PE,DP05_0010PE,DP05_0011PE,DP05_0012PE,DP05_0013PE,DP05_0014PE,DP05_0015PE,DP05_0016PE,DP05_0017PE,DP05_0004E,DP05_0002PE,DP05_0003PE,DP03_0062E,DP05_0018E,DP04_0089E,DP04_0134E,DP02_0060PE,DP03_0119PE,DP05_0037PE,DP05_0038PE,DP05_0071PE,DP05_0044PE,DP05_0039PE,DP05_0052PE,DP05_0057PE,DP05_0035PE&for=zip+code+tabulation+area:44077&key=599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65


    // national numbers
    // https://api.census.gov/data/2017/acs/acs5/profile?get=NAME,DP05_0001E,DP05_0019PE,DP05_0024PE,DP05_0005PE,DP05_0006PE,DP05_0007PE,DP05_0008PE,DP05_0009PE,DP05_0010PE,DP05_0011PE,DP05_0012PE,DP05_0013PE,DP05_0014PE,DP05_0015PE,DP05_0016PE,DP05_0017PE,DP05_0004E,DP05_0002PE,DP05_0003PE,DP03_0062E,DP05_0018E,DP04_0089E,DP04_0134E,DP02_0060PE,DP03_0119PE,DP05_0037PE,DP05_0038PE,DP05_0071PE,DP05_0044PE,DP05_0039PE,DP05_0052PE,DP05_0057PE,DP05_0035PE&for=us:1&key=599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            $("#census_info").removeClass("d-none");
            $("#census_card").empty();
            $("#census_card").append("<p><b>Population: </b>" + response[1][1] + "</p>");
            $("#census_card").append("<p><b>18 and under percent: </b>" + response[1][2] + "</p>");
            $("#census_card").append("<p><b>65+ percent: </b>" + response[1][3] + "</p>");
            $("#census_card").append("<p><b>Males / 100 Females: </b>" + response[1][4] + "</p>");
            $("#census_card").append("<p><b>Median Household Income: </b>" + response[1][5] + "</p>");
            $("#census_card").append("<p><b>Median Age: </b>" + response[1][6] + "</p>");
            $("#census_card").append("<p><b>Median Home Value: </b>" + response[1][7] + "</p>");
            $("#census_card").append("<p><b>Gross Rent: </b>" + response[1][8] + "</p>");
            var hsGradRate = 100 - response[1][9];
            $("#census_card").append("<p><b>25+ Graduted HS: </b>" + hsGradRate + "</p>");
            $("#census_card").append("<p><b>Poverty Rate: </b>" + response[1][10] + "</p>");
        }
    });
    return;
}

function censusAvg() {
    var apiKey = "599c1fceaf4dbdd36e8883a85282f4b2cbb5cd65";
    var queryURL = "https://api.census.gov/data/2017/acs/acs5/profile?get=NAME,DP05_0001E,DP05_0019PE,DP05_0024PE,DP05_0004E,DP03_0062E,DP05_0018E,DP04_0089E,DP04_0134E,DP02_0060PE,DP03_0119PE&for=us:1&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.length > 0) {
            $("#census_avg_info").removeClass("d-none");
            $("#census_avg_card").empty();
            $("#census_avg_card").append("<p><b>Population: </b>" + response[1][1] + "</p>");
            $("#census_avg_card").append("<p><b>18 and under percent: </b>" + response[1][2] + "</p>");
            $("#census_avg_card").append("<p><b>65+ percent: </b>" + response[1][3] + "</p>");
            $("#census_avg_card").append("<p><b>Males / 100 Females: </b>" + response[1][4] + "</p>");
            $("#census_avg_card").append("<p><b>Median Household Income: </b>" + response[1][5] + "</p>");
            $("#census_avg_card").append("<p><b>Median Age: </b>" + response[1][6] + "</p>");
            $("#census_avg_card").append("<p><b>Median Home Value: </b>" + response[1][7] + "</p>");
            $("#census_avg_card").append("<p><b>Gross Rent: </b>" + response[1][8] + "</p>");
            var hsGradRate = 100 - response[1][9];
            $("#census_avg_card").append("<p><b>25+ Graduted HS: </b>" + hsGradRate + "</p>");
            $("#census_avg_card").append("<p><b>Poverty Rate: </b>" + response[1][10] + "</p>");
        }
    });
    return;
}

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
        weather(zipCode);
        census(zipCode);
        censusAvg();
    }
});