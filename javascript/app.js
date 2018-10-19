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

      $('#btnSubmit').click(function() {
        var u = $('#nameIpt').val();
        var m = $('#msgIpt').val();
        database.ref().push({name: u, text: m});
        $('#msgIpt').val('');
      });

      database.ref().on('child_added', function(snapshot) {
        var msg = snapshot.val();
        displayMsg(msg.name, msg.text);
      });

      function displayMsg(name, text) {
        $('<div />').text(text).prepend($('<em/>').text(name+': ')).appendTo('#msgList');

        $('#msgList')[0].scrollTop = $('#msgList')[0].scrollHeight;
      };

         
      