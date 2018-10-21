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


//cors hack

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
        $(this).hide();
    });
});



// when the start button is clicked
$("#start").on("click", function () {
    favTeamColor();
    
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


// this is the YELP api testing on a button
$("#yelp").on("click", function () {
    
    //This url is set for 85233 zip right now but we can set a variable for that to change with input 
    var yelpUrl = "https://api.yelp.com/v3/businesses/search?location=85233&categories=sportsbars&limit=5"
    
    $.ajax({
        url: yelpUrl,
        headers: {
            'Authorization': 'Bearer DEarLC7CAG_qsAEt1-nz8iyDsLL2tcDUn72S1wje4GmAksA05LKkj2MpqqyyNzFMdiysoE-Nv_wTUGQQn-rYM5scXqQpdFu-mObJuPPtwyiGXrqLWPGAYdrG-q7LW3Yx',
        },
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
    
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// PUT NEW CODE BELOW ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var teamLogos = {

    cardinals: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Arizona_Cardinals_logo.jpg",
    
    falcons: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Atlanta_Falcons_logo.jpg",

    ravens: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Baltimore_Ravens_logo.jpg",

    bills: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Buffalo_Bills_logo.jpg",

    panthers: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Carolina_Panthers_logo.jpg",

    bears: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Chicago_Bears_logo.jpg",

    bengals: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Cincinnati_Bengals_logo.jpg",

    browns: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Cleveland_Browns_logo.jpg",

    cowboys: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Dallas_Cowboys_logo.jpg",

    broncos: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Denver_Broncos_logo.jpg",

    lions: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Detroit_Lions_logo.jpg",

    packers: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Green_Bay_Packers_logo.jpg",

    texans: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Houston_Texans_logo.jpg",

    colts: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/indianapolis_colts_logo_colors.png",

    jaguars: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Jacksonville_Jaguars_logo.jpg",

    chiefs: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Kansas_City_Chiefs_logo.jpg",

    jaguars: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/NFL_Chargers_logo.jpg",

    chargers: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Jacksonville_Jaguars_logo.jpg",

    rams: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Los_Angeles_Rams_logo.jpg",

    dolphins: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/dolphins_logo_2018-300x220.png",

    vikings: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Minnesota_Vikings_logo.jpg",

    patriots: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/New_England_Patriots_logo.jpg",

    saints: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/New_Orleans_Saints_logo.jpg",

    giants: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/New_York_Giants_logo.jpg",

    jets: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/new_york_jets_colors.png",

    raiders: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Oakland_Raiders_logo.jpg",

    eagles: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Philadelphia_Eagles_logo.jpg",

    steelers: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Pittsburgh_Steelers_logo.jpg",

    niners: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/San_Francisco_49ers_logo.jpg",

    seahawks: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Seattle_Seahawks_logo.jpg",

    buccaneers: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2014/05/Tampa_Bay_Buccaneers_logo.jpg",

    titans: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Tennessee_Titans_logo.jpg",

    redskins: "https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2017/05/Washington_Redskins_logo.jpg",

    
}


function favTeamColor() {
    console.log("click");
    // console.log(this);

    $(".dropdown-item").on("click", function() {
        console.log(this);
        var teamSelected = $(this).attr("value");
        console.log(teamSelected);
        if (teamSelected === "Arizona Cardinals") {
            $("body").stop().animate({
                backgroundColor: "rgba(151,35,63, 0.6)",
                color: "rgb(255,182,18)"
            }, 1000)
            console.log("click");
        }
        
   
    })
  
    // if ($(".team-list:selected").val() === "Arizona Cardinals") {
    //     console.log("click");
    //     $("body").animate({backgroundColor: "red"}, "slow")
    // }
    
};


