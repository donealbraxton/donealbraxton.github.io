$(document).ready(function(){

    $("#search").click(function(){
        
        var cardName = document.getElementById('name').value;
        var cleanCard = cardName.replace(/\s/g, '+');

        $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cleanCard, function(a){
            document.getElementById('artist').innerHTML = "Artist: "+a['artist'];
            document.getElementById('cardName').innerHTML = "Card Name: "+a['name'];
            document.getElementById("myImg").src = a['image_uris']['png'];
         

            }).fail(function() { alert("error"); });

            

      });
      



  });