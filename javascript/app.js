// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLh5dJYfHFziQJ5jTlTOdfLhKPjjIMkFA",
  authDomain: "sleepers-9464b.firebaseapp.com",
  databaseURL: "https://sleepers-9464b.firebaseio.com",
  projectId: "sleepers-9464b",
  storageBucket: "sleepers-9464b.appspot.com",
  messagingSenderId: "83781089592"
};
firebase.initializeApp(config);
var database = firebase.database();

//start button hiding everything 
$(document).ready(function () {
  $(".main-screen").hide();
  $("#start").click(function () {
    $(".main-screen").fadeIn();
    $(this).hide();
  });
});


//Fantasy Football Nerd API 

jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});

var apiKey = "ryz7dd7qeq6e";

$("#start").on("click", function () {

  var queryURL = "https://www.fantasyfootballnerd.com/service/weekly-rankings/json/" + apiKey + "/QB";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < response.Rankings.length; i++) {
      var tRow = $("<tr>");

      var playerPosition = $("<td>").text(response.Rankings[i].position);

      var playerName = $("<td>").text(response.Rankings[i].name);

      var playerTeam = $("<td>").text(response.Rankings[i].team);

      var playerStandard = $("<td>").text(response.Rankings[i].standard);

      tRow.append(playerPosition, playerName, playerTeam, playerStandard);

      $("tbody").append(tRow);
    }




  });

});


//Position buttons
$(".positionButtons").on("click", function () {

  var posistion = $(this).attr("id")
  console.log(posistion)

});

//Fantasy Football Nerd API 



// var queryURL = "https://www.fantasyfootballnerd.com/service/weekly-rankings/json/" + apiKey;

// // https://cors-anywhere.herokuapp.com/
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {

    //Fantasy Football Nerd API 
    var apiKey = "ryz7dd7qeq6e";


// });

    // https://cors-anywhere.herokuapp.com/
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     // console.log(response);
    //     // console.log("click");
    //     var rank = response.Rankings 
    //     // console.log(rank)
    //     for (var i = 0; i < 5; i++){
    //         console.log(rank[i])
    //     }

    // });
    




//chat submit button
$('#btnSubmit').click(function () {
  var u = $('#nameIpt').val();
  var m = $('#msgIpt').val();
  database.ref().push({ name: u, text: m });
  $('#msgIpt').val('');
});

//when a msg is added it runs the displayMsg function
database.ref().on('child_added', function (snapshot) {
  var msg = snapshot.val();
  displayMsg(msg.name, msg.text);
});

//dipslays the msg on the chat screen 
function displayMsg(name, text) {
  $('<div />').text(text).prepend($('<em/>').text(name + ': ')).appendTo('#msgList');

  $('#msgList')[0].scrollTop = $('#msgList')[0].scrollHeight;
};





