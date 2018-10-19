var clientID = "dj0yJmk9Sjk5TUJPdW1Ganp2JmQ9WVdrOVptTkRVVEpwTm1jbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kOQ--";


var queryURL = "https://fantasysports.yahooapis.com/fantasy/v2/league?client_id=" + clientID ;
console.log(queryURL);



// https://cors-anywhere.herokuapp.com/
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log("click");
    });


