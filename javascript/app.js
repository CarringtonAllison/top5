var apiKey = "ryz7dd7qeq6e";

jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

var queryURL = "https://www.fantasyfootballnerd.com/service/players/json/" + apiKey + "/QB/1";

// var queryURL = "https://fantasysports.yahooapis.com/fantasy/v2/league?client_id=" + apiKey;
// console.log(queryURL);



// https://cors-anywhere.herokuapp.com/
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
  console.log("click");
});

