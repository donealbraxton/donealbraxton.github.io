var timeoutId= 0;
function keyupFunction() {
    clearTimeout(timeoutId); // doesn't matter if it's 0
    timeoutId = setTimeout(getFilteredResultCount, 500);


}

function getFilteredResultCount(){
    var cardName = document.getElementById('name').value;
    updateCardData(cardName);
    updateLowerData(cardName);
}
function onmouseover(x){
    var cardName = x.innerHTML;
    updateLowerData(cardName);
}

function updateCardData(x){
    
    var cleanCard = x.replace(/\s/g, '+');
    $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cleanCard, function(a){
        document.getElementById('search-artist').innerHTML = "Artist: "+a['artist'];
        document.getElementById('search-cardName').innerHTML = "Card Name: "+a['name'];
        document.getElementById("myImg").src = a['image_uris']['png'];
     

        });
}
function updateLowerData(x){
    var cleanCard = x.replace(/\s/g, '+');

    $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cleanCard, function(a){
        document.getElementById('artist').innerHTML = "Artist: "+a['artist'];
        document.getElementById('cardName').innerHTML = "Card Name: "+a['name'];
        document.getElementById("myImg").src = a['image_uris']['png'];
     

        });
}


function showcard(x){
    clearTimeout(timeoutId); // doesn't matter if it's 0
    timeoutId = setTimeout(onmouseover(x), 500);

}

$(document).ready(function(){

updateLowerData("Reanimate");

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