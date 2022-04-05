var loggedIn = false;
var currentDeck = "";
var currentFormat = "";
var currentValidSearch = false;
$.ajaxSetup({
  async: false
});
  //------------------LOGGED IN FUNCTINOS------------------------------------------
  function cleanCard(x){
    return x.replace(/\s/g, '+');
  }
  
  function cardAdd(){

  }
  function cardDelete(){

  }
  function validateCard(x){
    var cCard = cleanCard(x);
    var isValid = false;
    $.getJSON("https://api.scryfall.com/cards/named?fuzzy="+cCard, function(a) {
      isValid = true;
  });
return(
isValid
  
);

  }
function properName(x){
  var cCard = cleanCard(x);
  var propName = "";
  $.getJSON("https://api.scryfall.com/cards/named?fuzzy="+cCard, function(a) {
    propName = a["name"];
});
return propName;
}
  
function landSpellCheck(x){
  var cCard = cleanCard(x)
  var landorspell = null;
  var isLand = 1;
  $.getJSON("https://api.scryfall.com/cards/named?fuzzy="+cCard, function(a) {
    landorspell = a["type_line"];
    if(landorspell.includes("land")){
      island = 0;
    }
});
return isLand;
}

  function saveDeck(){

  }
  function isCardAdded(x){
    var isAdded = false;
    var cDeck = currentDeck;
    $.each( cDeck["cards"], function( key, value ) {
      if(key==x){
        console.log(key+" "+x);
        isAdded = true;
      }
    });
    $.each( cDeck["lands"], function( key, value ) {
      if(key==x){
        console.log(key+" "+x);
        isAdded = true;
      }
    });
    return isAdded;
  }



//------BUTTON TRIGGERS ------------------------------------------------------------------
$(document).ready(function(){

  updateLowerData("Reanimate");
  
      $("#search").click(function(){
          
          var cardName = document.getElementById('name').value;
          var cCard = cleanCard(cardName);
  
          $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cCard, function(a){
              document.getElementById('artist').innerHTML = "Artist: "+a['artist'];
              document.getElementById('cardName').innerHTML = "Card Name: "+a['name'];
              document.getElementById("myImg").src = a['image_uris']['png'];
           
  
              }).fail(function() {  });
  
              
  
        });
        
        $("#login-form").submit(function(e){
    
          $.ajax({
              url: 'https://doncards-fa13.restdb.io/rest/decks',
              type: 'GET',
              dataType: 'json',
              headers: {
                  'Content-Type': 'application/json',
                  'x-apikey': '6242758367937c128d7c92b6'
              },
              contentType: 'application/json; charset=utf-8',
              success: function (result) {             
              
                   var x = document.getElementById('inputUser').value
                  var y = document.getElementById('inputPassword').value; 
                  if (x === result[0]["username"] && y === result[0]["password"]) {
                      setCookie("username", x, 365);
                      loggedIn = true;
                      off();
              
                  } else {
                      alert("Incorrect Password");
                  }
              },
              error: function (error) {
                  alert("not working");
              }
          });
          e.preventDefault();
        });

  
        $("#addCard").click(function(){
          var name = properName(document.getElementById('name').value);
          var count = document.getElementById('add-count').value;
          var landorspell = landSpellCheck(name);
          if(count<5&&count>0){//check if count is a valid number
            if(validateCard(name)){//check if card is a valid card
              alert(isCardAdded(name));
              if(landSpellCheck(name)==0){
                $("#land-fill").append('<div class="row"><div class="col-sm"><input type="number"value="'+count
                +'" class="form-control count-text"> </div><div class="col-lg">'+
                '<p onmouseover="showcard(this)" class="card-text">'+name+
                '</p></div></div>'
                  )
              }
              else{
                $("#card-fill").append('<div class="row"><div class="col-sm"><input type="number" min="1" max="4" value="'+count
                +'" class="form-control count-text"> </div><div class="col-lg">'+
                '<p onmouseover="showcard(this)" class="card-text">'+name+
                '</p></div></div>'
                  )
              }

            }else{
              alert("not valid card")
            }
          }else{
            alert("not valid number");
          }
        });
  
    });





//------------------------------------------------------------------------------

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
      loggedIn = true;
      off();
    } else {/*
    
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
        on();
      }*/
    }
  }

  function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    var testerArr = {
      "name":"ThoughtCast",
      "cards":{
        "Reanimate":1,
        "Plant":4
      },
        "lands":{
          "Swamp":5
        }
      };
    deckLoad(testerArr);
    document.getElementById("overlay").style.display = "none";
    $('.hidden').css('display', 'inline');
  }


  function deckLoad(x){
    var spells = x["cards"];
    var lands = x["lands"];
    var deckName = x["name"];
    currentDeck=x;
    $("#deckname").empty().append(deckName);
    var deleteButton ='<button type="button" class="col-sm btn btn-danger">Danger</button>';

    $.each( spells, function( key, value ) {
      if(validateCard(key)){
        $("#card-fill").append('<div class="row"><div class="col-sm"><input type="number" min="1" max="4" value="'+value
        +'" class="form-control count-text"> </div><div class="col-lg">'+
        '<p onmouseover="showcard(this)" class="card-text">'+key+
        '</p></div></div>'
          )
      }
    });
    $.each( lands, function( key, value ) {
      if(validateCard(key)){
        $("#land-fill").append('<div class="row"><div class="col-sm"><input type="number"value="'+value
        +'" class="form-control count-text"> </div><div class="col-lg">'+
        '<p onmouseover="showcard(this)" class="card-text">'+key+
        '</p></div></div>'
          )
      }
    });
  }


  //-----------COMMUNICATE WITH SCRYFALL-------------------------------------------------
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
    
    var cCard = cleanCard(x);
    $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cCard, function(a){
        document.getElementById('search-artist').innerHTML = "Artist: "+a['artist'];
        document.getElementById('search-cardName').innerHTML = "Card Name: "+a['name'];
        document.getElementById("myImg").src = a['image_uris']['png'];
     

        });
}
function updateLowerData(x){
  var cCard = x.replace(/\s/g, '+');

    $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cCard, function(a){
        document.getElementById('artist').innerHTML = "Artist: "+a['artist'];
        document.getElementById('cardName').innerHTML = "Card Name: "+a['name'];
        document.getElementById("myImg").src = a['image_uris']['png'];
     

        });
}


function showcard(x){
    clearTimeout(timeoutId); // doesn't matter if it's 0
    timeoutId = setTimeout(onmouseover(x), 500);

}


  //---------------------------------------------------------------------