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

var cardColor;


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
        console.log(response)
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
                $p.attr("id", "barInfo");
                $2div.css("background-color", cardColor)
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



    
    $(document).on("click", ".dropdown-item", function () {
        var logos = $("<image>").attr("class", "logos");
        $(".logos").attr("src", teamLogos.cardinals)
        $(".main-screen").append(logos);
        var teamSelected = $(this).attr("value");
        console.log(teamSelected);
        if (teamSelected === "Arizona Cardinals") {
            $("body").stop().animate({
                backgroundColor: "rgb(151,35,63)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,182,18)",
                
            })
            cardColor = "rgb(255,182,18)";

            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })

        } else if (teamSelected === "Atlanta Falcons") {
            $("body").stop().animate({
                backgroundColor: "rgb(167,25,48)",
                color: "rgb(0, 0, 0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(165, 172, 175)",
                
            })
            cardColor = "rgb(165, 172, 175)";

            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })  

        } else if (teamSelected === "Baltimore Ravens") {
            $("body").stop().animate({
                backgroundColor: "rgb(26,25,95)",
                color: "rgb(0,0,0)"
            }, 1000);
            $(".card").stop().animate({
                backgroundColor: "rgb(158,124,12)",
            })
            cardColor = "rgb(158,124,12)";

            $(".hrColor").stop().animate({
                backgroundColor: "rgb(198,12,14)"
            })
        } else if (teamSelected === "Buffalo Bills") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,51,141)",
                color: "(255,255,255)"
            }, 1000);
            
            $(".card").stop().animate({
                backgroundColor: "rgb(198,12,48)",
            })
            cardColor = "rgb(198,12,48)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Carolina Panthers") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,133,202)",
                color: "rgb(16,24,32)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(191,192,191)",
            })
            cardColor = "rgb(191,192,191)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })
            
        } else if (teamSelected === "Chicago Bears") {
            $("body").stop().animate({
                backgroundColor: "rgb(11,22,42)",
                color: "rgb(11,22,42)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(200,56,3)",
            })
            cardColor = "rgb(200,56,3)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })
            
        } else if (teamSelected === "Cincinnati Bengals") {
            $("body").stop().animate({
                backgroundColor: "rgb(251,79,20,2)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(0,0,0)",
            })
            cardColor = "rgb(0,0,0)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })

        } else if (teamSelected === "Cleveland Browns") {
            $("body").stop().animate({
                backgroundColor: "rgb(49,29,0)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,60,0)",
            })
            cardColor = "rgb(255,60,0)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })
            

        } else if (teamSelected === "Dallas Cowboys") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,53,148)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(134,147,151)",
            })
            cardColor = "rgb(134,147,151)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Denver Broncos") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,34,68)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(251,79,20)",
            })
            cardColor = "rgb(251,79,20)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Detroit Lions") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,118,182)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(176,183,188)",
            })
            cardColor = "rgb(176,183,188)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Green Bay Packers") {
            $("body").stop().animate({
                backgroundColor: "rgb(24,48,40)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,184,28)",
            })
            cardColor = "rgb(255,184,28)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Houston Texans") {
            $("body").stop().animate({
                backgroundColor: "rgb(3,32,47)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(167,25,48)",
            })
            cardColor = "rgb(167,25,48)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Indianapolis Colts") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,44,95)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(162,170,173)",
            })
            cardColor = "rgb(162,170,173)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Jacksonville Jaguars") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,103,120)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(159,121,44)",
            })
            cardColor = "rgb(159,121,44)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Kansas City Chiefs") {
            $("body").stop().animate({
                backgroundColor: "rgb(227,24,55)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,184,28)",
            })
            cardColor = "rgb(255,184,28)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Los Angeles Chargers") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,128,198)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,194,14)",
            })
            cardColor = "rgb(255,194,14)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Los Angeles Rams") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,34,68)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(134,109,75)",
            })
            cardColor = "rgb(134,109,75)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Miami Dolphins") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,142,151)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(242,106,36)",
            })
            cardColor = "rgb(242,106,36)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Minnesota Vikings") {
            $("body").stop().animate({
                backgroundColor: "rgb(79,38,131)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,198,47)",
            })
            cardColor = "rgb(255,198,47)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "New England Patriots") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,34,68)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(198,12,48)",
            })
            cardColor = "rgb(198,12,48)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "New Orleans Saints") {
            $("body").stop().animate({
                backgroundColor: "rgb(211,188,141)",
                color: "rgb(255,255,255)"
            }, 1000);   

            $(".card").stop().animate({
                backgroundColor: "rgb(16,24,31)",
            })
            cardColor = "rgb(16,24,31)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "New York Giants") {
            $("body").stop().animate({
                backgroundColor: "rgb(1,35,82)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(163,13,45)",
            })
            cardColor = "rgb(163,13,45)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "New York Jets") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,63,45)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(39,37,31)",
            })
            cardColor = "rgb(39,37,31)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Oakland Raiders") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,0,0)",
                color: "rgb(0,0,0)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(165,172,175)",
            })
            cardColor = "rgb(165,172,175)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Philadelphia Eagles") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,76,84)",
                color: "rgb(255,255,255"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(95,96,98)",
            })
            cardColor = "rgb(95,96,98)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })

        } else if (teamSelected === "Pittsburgh Steelers") {
            $("body").stop().animate({
                backgroundColor: "rgb(255,182,18)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(16,24,32)",
            })
            cardColor = "rgb(16,24,32)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })
            
        } else if (teamSelected === "San Francisco 49ers") {
            $("body").stop().animate({
                backgroundColor: "rgb(170,0,0)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(173,153,93)",
            })
            cardColor = "rgb(173,153,93)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Seattle Seahawks") {
            $("body").stop().animate({
                backgroundColor: "rgb(105,190,40)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(0,34,68)",
            })
            cardColor = "rgb(0,34,68)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else if (teamSelected === "Tampa Bay Buccaneers") {
            $("body").stop().animate({
                backgroundColor: "rgb(213,10,10)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(52,48,43)",
            })
            cardColor = "rgb(52,48,43)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(0,0,0)"
            })

        } else if (teamSelected === "Tennessee Titans") {
            $("body").stop().animate({
                backgroundColor: "rgb(0,42,92)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(68,149,209)",
            })
            cardColor = "rgb(68,149,209)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })

        } else  {
            $("body").stop().animate({
                backgroundColor: "rgb(63,16,16)",
                color: "rgb(255,255,255)"
            }, 1000);

            $(".card").stop().animate({
                backgroundColor: "rgb(255,182,18)",
            })
            cardColor = "rgb(255,182,18)" 
            
            $(".hrColor").stop().animate({
                backgroundColor: "rgb(255,255,255)"
            })
            
        } 

    });



