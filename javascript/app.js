// Initialize Firebase
var config = {
    fantasyApiKey: "AIzaSyDLh5dJYfHFziQJ5jTlTOdfLhKPjjIMkFA",
    authDomain: "sleepers-9464b.firebaseapp.com",
    databaseURL: "https://sleepers-9464b.firebaseio.com",
    projectId: "sleepers-9464b",
    storageBucket: "sleepers-9464b.appspot.com",
    messagingSenderId: "83781089592"
};
firebase.initializeApp(config);
var database = firebase.database();
var fantasyApiKey = "ryz7dd7qeq6e";
var yelpApiKey = "DEarLC7CAG_qsAEt1-nz8iyDsLL2tcDUn72S1wje4GmAksA05LKkj2MpqqyyNzFMdiysoE-Nv_wTUGQQn-rYM5scXqQpdFu-mObJuPPtwyiGXrqLWPGAYdrG-q7LW3Yx"


// cors hack
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


//start button hiding everything 
$(document).ready(function () {
    $(".main-screen").hide();
    $("#start").click(function () {
        $(".main-screen").fadeIn();
        $(".first-buttons").hide();
        $("#zipCode").hide();
        $(this).hide();
    });
});


//when the start button is clicked
$("#start").on("click", function () {

    //Fantasy Football Nerd API
    var queryURL = "https://www.fantasyfootballnerd.com/service/weekly-rankings/json/" + fantasyApiKey + "/QB";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        rank = response.Rankings;

        for (var i = 0; i < 5; i++) {
            var tRow = $("<tr>");
            var playerPosition = $("<td>").text(rank[i].position);
            var playerName = $("<td>").text(rank[i].name);
            var playerTeam = $("<td>").text(rank[i].team);
            var playersScore = $("<td>").text(rank[i].standard);
            playersScore.addClass("scores")
            playersScore.attr("data-ppr", rank[i].ppr);
            playersScore.attr("data-standard", rank[i].standard);
            tRow.append(playerPosition, playerName, playerTeam, playersScore);
            $("tbody").append(tRow);
        }
    });

    var zip = $("#zipCode").val();


    // Yelp API 
    var yelpUrl = "https://api.yelp.com/v3/businesses/search?location=" + zip + "&categories=sportsbars&limit=5"

    $.ajax({
        url: yelpUrl,
        headers: {
            'Authorization': 'Bearer DEarLC7CAG_qsAEt1-nz8iyDsLL2tcDUn72S1wje4GmAksA05LKkj2MpqqyyNzFMdiysoE-Nv_wTUGQQn-rYM5scXqQpdFu-mObJuPPtwyiGXrqLWPGAYdrG-q7LW3Yx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            sportsBar = data.businesses
            console.log(sportsBar)

            for (var i = 0; i < 5; i++) {
                var $div = $("<div>");
                $div.addClass("col d-flex justify-content-center layout");
                var $2div = $("<div>");
                $2div.addClass("card bars");
                $2div.attr("data-url", sportsBar[i].url);
                var $img = $("<img>");
                $img.addClass("card-img-top img-size");
                $img.attr("src", sportsBar[i].image_url);
                $img.attr("alt", sportsBar[i].name);
                var $3div = $("<div>");
                $3div.addClass("card-body");
                var $p = $("<p>");
                $p.addClass("card-text");
                $p.attr("id", "barInfo")
                $p.append("<h5>" + sportsBar[i].name + "</h5>", "<p class='barText'>" + sportsBar[i].location.display_address + "</p>", "<p class='barText'>" + "Phone: " + sportsBar[i].phone + "</p>");
                $div.append($2div);
                $2div.append($img, $3div);
                $3div.append($p);
                $("#barListing").append($div);
            }
        }
    });
});


//Position buttons
$(".positionButtons").on("click", function () {
    $("#player").empty();
    var position = $(this).attr("id")
    var queryURL = "https://www.fantasyfootballnerd.com/service/weekly-rankings/json/" + fantasyApiKey + "/" + position;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        rank = response.Rankings;

        for (var i = 0; i < 5; i++) {
            var tRow = $("<tr>");
            var playerPosition = $("<td>").text(rank[i].position);
            var playerName = $("<td>").text(rank[i].name);
            var playerTeam = $("<td>").text(rank[i].team);
            var playersScore = $("<td>").text(rank[i].standard);
            playersScore.addClass("scores");
            playersScore.attr("data-ppr", rank[i].ppr);
            playersScore.attr("data-standard", rank[i].standard);
            tRow.append(playerPosition, playerName, playerTeam, playersScore);
            $("tbody").append(tRow);
        }
    });
});


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


//The League buttons 
$("#ppr").on("click", function () {
    console.log("working");
    $(".scores").empty();
    $(".scores").text($(".scores").attr("data-ppr"))
})

$("#standard").on("click", function () {
    console.log("working");
    $(".scores").empty();
    $(".scores").text($(".scores").attr("data-standard"))
})

// if the yelp results are clicked then they will open another page with the yelp website 
$(document).on("click",".bars",function(){
    var barUrl =$(this).attr("data-url");
    console.log(barUrl);
    window.open(barUrl)

})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// PUT NEW CODE BELOW ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////