var loggedIn = false;
var currentDeck = "";
var currentFormat = "";
var currentValidSearch = false;


$(document).ready(function() {

//------BUTTON TRIGGERS ------------------------------------------------------------------

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
      "cards":{
        "Reanimate":1,
        "Plant":4
      }};
    deckLoad(testerArr["cards"]);
    document.getElementById("overlay").style.display = "none";

  }
function cardValidate(cardName){
  $.getJSON('https://api.scryfall.com/cards/named?fuzzy='+cardName, function(a){
    return true;
        });
        return true;
}
  function deckLoad(x){
    $.each( x, function( key, value ) {
      if(cardValidate(key)){
        $("#card-fill").append('<div class="row"><div class="col-sm"><input type="number" min="1" max="4" value="'+value
        +'" class="form-control count-text"> </div><div class="col-lg">'+
        '<p onmouseover="showcard(this)" class="card-text">'+key+
        '</p></div></div>'
          )
      }
    });
    $.each( x, function( key, value ) {
      if(cardValidate(key)){
        $("#land-fill").append('<div class="row"><div class="col-sm"><input type="number" min="1" max="4" value="'+value
        +'" class="form-control count-text"> </div><div class="col-lg">'+
        '<p onmouseover="showcard(this)" class="card-text">'+key+
        '</p></div></div>'
          )
      }
    });
  }

  //LOGGED IN FUNCTINOS------------------------------------------

  function cardAdd(){

  }
  function cardDelete(){

  }
  function validateCard(){

  }
  function saveDeck(){

  }





  