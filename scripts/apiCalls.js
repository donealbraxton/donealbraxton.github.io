$(document).ready(function(){

    $("#search").click(function(){
        $.getJSON('https://api.scryfall.com' + "/cards/random", function(a){
            document.getElementById('artist').innerHTML = "Artist: "+a['artist'];
            document.getElementById('cardName').innerHTML = "Card Name: "+a['name'];
            document.getElementById("myImg").src = a['image_uris']['png'];
            });
      });



  });