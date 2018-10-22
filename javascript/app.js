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
        // console.log(response);

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


    var queryURL = "https://www.fantasyfootballnerd.com/service/byes/json/ryz7dd7qeq6e/ppr/";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        console.log(response);

        // for (var i = 0; i < 5; i++) {
        //     var tRow = $("<tr>");
        //     var playerPosition = $("<td>").text(rank[i].position);
        //     var playerName = $("<td>").text(rank[i].name);
        //     var playerTeam = $("<td>").text(rank[i].team);
        //     var playersScore = $("<td>").text(rank[i].standard);
        //     playersScore.addClass("scores")
        //     playersScore.attr("data-ppr", rank[i].ppr);
        //     playersScore.attr("data-standard", rank[i].standard);
        //     tRow.append(playerPosition, playerName, playerTeam, playersScore);
        //     $("tbody").append(tRow);
        // }
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
$(document).on("click", ".bars", function () {
    var barUrl = $(this).attr("data-url");
    console.log(barUrl);
    window.open(barUrl)

})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// PUT NEW CODE BELOW ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var teamLogos = {

    cardinals: "https://s3.amazonaws.com/freebiesupply/large/2x/arizona-cardinals-logo-transparent.png",

    falcons: "https://www.printyourbrackets.com/nfl-logos/atlanta-falcons-logo.png",

    ravens: "https://www.printyourbrackets.com/nfl-logos/baltimore-ravens-logo.png",

    bills: "https://www.printyourbrackets.com/nfl-logos/buffalo-bills-logo.png",

    panthers: "https://www.printyourbrackets.com/nfl-logos/carolina-panthers-logo.png",

    bears: "https://www.printyourbrackets.com/nfl-logos/chicago-bears-logo.png",

    bengals: "https://www.printyourbrackets.com/nfl-logos/cincinnati-bengals-logo.png",

    browns: "https://images.vexels.com/media/users/3/141834/isolated/preview/5c98f4cff6d29fd0f29fabc0bf7d66f4-cleveland-browns-american-football-by-vexels.png",

    cowboys: "https://www.printyourbrackets.com/nfl-logos/dallas-cowboys-logo.png",

    broncos: "https://www.printyourbrackets.com/nfl-logos/denver-broncos-logo.png",

    lions: "https://www.printyourbrackets.com/nfl-logos/detroit-lions-logo.png",

    packers: "https://www.printyourbrackets.com/nfl-logos/green-bay-packers-logo.png",

    texans: "https://www.printyourbrackets.com/nfl-logos/houston-texans-logo.png",

    colts: "https://www.printyourbrackets.com/nfl-logos/indianapolis-colts-logo.png",

    jaguars: "https://www.printyourbrackets.com/nfl-logos/jacksonville-jaguars-logo.png",

    chiefs: "https://www.printyourbrackets.com/nfl-logos/kansas-city-chiefs-logo.png",

    chargers: "https://sportslogohistory.com/wp-content/uploads/2018/05/los_angeles_chargers_matthew_harvey.png", //Find Another

    rams: "https://www.printyourbrackets.com/nfl-logos/st-louis-rams-logo.png",

    dolphins: "https://www.printyourbrackets.com/nfl-logos/miami-dolphins-logo.png",

    vikings: "https://www.printyourbrackets.com/nfl-logos/minnesota-vikings-logo.png",

    patriots: "https://www.printyourbrackets.com/nfl-logos/new-england-patriots-logo.png",

    saints: "https://www.printyourbrackets.com/nfl-logos/new-orleans-saints-logo.png",

    giants: "https://www.printyourbrackets.com/nfl-logos/new-york-giants-logo.png",

    jets: "https://www.printyourbrackets.com/nfl-logos/new-york-jets-logo.png",

    raiders: "https://www.printyourbrackets.com/nfl-logos/oakland-raiders-logo.png",

    eagles: "https://www.printyourbrackets.com/nfl-logos/philadelphia-eagles-logo.png",

    steelers: "https://www.printyourbrackets.com/nfl-logos/pittsburgh-steelers-logo.png",

    niners: "https://www.printyourbrackets.com/nfl-logos/san-francisco-49ers-logo.png",

    seahawks: "https://www.printyourbrackets.com/nfl-logos/seattle-seahawks-logo.png",

    buccaneers: "https://www.printyourbrackets.com/nfl-logos/tampa-bay-buccaneers-logo.png",

    titans: "https://www.printyourbrackets.com/nfl-logos/tennessee-titans-logo.png",

    redskins: "https://www.printyourbrackets.com/nfl-logos/washington-redskins-logo.png",


}



    
    $(document).on("click", ".dropdown-item", function () {
        var logos = $("<image>").attr("class", "logos");
        $(".logos").attr("src", teamLogos.cardinals)
        $(".main-screen").append(logos);
        var teamSelected = $(this).attr("value");
        console.log(teamSelected);
        if (teamSelected === "Arizona Cardinals") {
            $(".logos").attr("src", teamLogos.cardinals);
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
            $(".logos").attr("src", teamLogos.falcons);
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
            $(".logos").attr("src", teamLogos.ravens);
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
            $(".logos").attr("src", teamLogos.bills);
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
            $(".logos").attr("src", teamLogos.panthers);
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
            $(".logos").attr("src", teamLogos.bears);
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
            $(".logos").attr("src", teamLogos.bengals);
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
            $(".logos").attr("src", teamLogos.browns);
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
            $(".logos").attr("src", teamLogos.cowboys);
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
            $(".logos").attr("src", teamLogos.broncos);
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
            $(".logos").attr("src", teamLogos.lions);
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
            $(".logos").attr("src", teamLogos.packers);
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
            $(".logos").attr("src", teamLogos.texans);
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
            $(".logos").attr("src", teamLogos.colts);
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
            $(".logos").attr("src", teamLogos.jaguars);
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
            $(".logos").attr("src", teamLogos.chiefs);
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
            $(".logos").attr("src", teamLogos.chargers);
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
            $(".logos").attr("src", teamLogos.rams);
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
            $(".logos").attr("src", teamLogos.dolphins);
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
            $(".logos").attr("src", teamLogos.vikings);
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
            $(".logos").attr("src", teamLogos.patriots);
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
            $(".logos").attr("src", teamLogos.saints);
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
            $(".logos").attr("src", teamLogos.giants);
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
            $(".logos").attr("src", teamLogos.jets);
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
            $(".logos").attr("src", teamLogos.raiders);
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
            $(".logos").attr("src", teamLogos.eagles);
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
            $(".logos").attr("src", teamLogos.steelers);
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
            $(".logos").attr("src", teamLogos.niners);
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
            $(".logos").attr("src", teamLogos.seahawks);
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
            $(".logos").attr("src", teamLogos.buccaneers);
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
            $(".logos").attr("src", teamLogos.titans);
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
            $(".logos").attr("src", teamLogos.redskins);
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



