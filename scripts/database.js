var loggedIn = false;
var CURRENTID = "";
var CURRENTDECKID = ""
var currentDeck = {
  "deckName":"New Deck",
  "lands":{},
  "nonlands":{}
  
};

var allDecks ={}
var currentFormat = "";
var currentValidSearch = false;
var symbolUrl = "https://api.scryfall.com/symbology";
var fuzzyUrl = "https://api.scryfall.com/cards/named?fuzzy="
var SYMBOLS = null;






$.getJSON(symbolUrl, function (a) {
  SYMBOLS = a["data"];
});


$.ajaxSetup({
  async: false
});

//------------------Set UP Functions


function retrieveDecks(){
  $.ajax({
      url: 'https://doncards-fa13.restdb.io/rest/decks/'+CURRENTID
      +'/decks',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6242758367937c128d7c92b6'
      },
      contentType: 'application/json; charset=utf-8',
      success: function (result) {
        $("#deckRoll").empty();
        allDecks = result;
        allDecks.forEach(function (deck, index){
          addDeck(deck);
        });

      }
    });
}





//------------------LOGGED IN FUNCTINOS------------------------------------------
function cleanCard(x) {
  return x.replace(/\s/g, '+');
}
function resetAllInfo(){
  $("#card-fill").empty();
  $("#land-fill").empty();
  $("#search-artist").empty();
  $("#search-cardName").empty();
  $("#mana-cost").empty();
  $("#cardName").empty();
  document.getElementById("myImg").src = "";
  $("#artist").empty();
 // $("#deckRoll").empty();

}
function cardAdd() {

}
function cardDelete() {

}

function addtoCurrent(name,count,type) { 
  if (type=="land") {
    currentDeck["lands"][name]=count;
  }
  else
  currentDeck["nonlands"][name]=count;
}

function landSpellCheck(x) {
  var cCard = cleanCard(x)
  var landorspell = null;
  var isLand = 1;
  $.getJSON(fuzzyUrl + cCard, function (a) {
    landorspell = a["type_line"];
    if (landorspell.includes("Land")) {
      isLand = 0;
    }
  });
  return isLand;
}


//---Adding in Spells and Lands Functions
function addLand(name, count) {
  $("#land-fill").append(
    '<div class="row"><div class="input-group"><input id="'+name+'" type="number"min="1"max="20" value="' + count
    + '" class="form-control count-text udL">' +
    '<p onmouseover="showcard(this)" class="card-text">' + name +
    '</p></div></div>'
  );
  addtoCurrent(name,count,"land");
}
function addSpell(name, count) {
  $("#card-fill").append(
    '<div class="row"><div class="input-group"><input  id="'+name+'" type="number" min="1" max="4" value="' + count
    + '" class="form-control count-text udC">' +
    '<p onmouseover="showcard(this)" class="card-text">' + name +
    '</p></div></div>'
  );
  addtoCurrent(name,count,"cards");
}
function addDeck(deck){
  var deckName = deck["deckName"];
  var deckID = deck["_id"];
  $("#deckRoll").append(
    '<div class="col-sm-3"><div id='+deckID
    +' class="card card-block">'+deckName
    +'</div></div>'
  );

}

//-- Boolean Check Utilities
function isCardAdded(x) {
  var isAdded = false;
  var cDeck = currentDeck;
  $.each(cDeck["nonlands"], function (key, value) {
    if (key == x) {
      console.log(key + " " + x);
      isAdded = true;
    }
  });
  $.each(cDeck["lands"], function (key, value) {
    if (key == x) {
      console.log(key + " " + x);
      isAdded = true;
    }
  });
  return isAdded;
}
function validateCard(x) {
  var cCard = cleanCard(x);
  var isValid = false;
  $.getJSON(fuzzyUrl + cCard, function (a) {
    isValid = true;
  });
  return (
    isValid

  );

}
function properName(x) {
  var cCard = cleanCard(x);
  var propName = "";
  $.getJSON(fuzzyUrl + cCard, function (a) {
    propName = a["name"];
  });
  return propName;
}

function isInDeck(x){
  if (x in currentDeck["lands"]||x in currentDeck["nonlands"]) {
    return true;
  }
  else
  return false;
}

function symbolImg(x) {

  var seperateSymb = x.split("");
  var filtered = seperateSymb.filter(function (value, index, arr) {
    return value != '{' && value != '}';
  });

  var symbURL = "";
  filtered.forEach(element => {
    var truesymb = '{' + element + '}'
    SYMBOLS.forEach(symbol => {
      if (symbol["symbol"] == truesymb) {
        symbURL += '<img id="mana-cost" class="symbol-img" src="' + symbol["svg_uri"] + '"></img>';
      }
    });
  });


  return symbURL;
}


//------BUTTON TRIGGERS ------------------------------------------------------------------
$(document).ready(function () {
  $("#TEST").click(function (e){
    retrieveDecks();
  });
  updateLowerData("Reanimate");

  $("#search").click(function () {

    var cardName = document.getElementById('name').value;
    var cCard = cleanCard(cardName);

    $.getJSON(fuzzyUrl + cCard, function (a) {
      document.getElementById('artist').innerHTML = "Artist: " + a['artist'];
      document.getElementById('cardName').innerHTML = "Card Name: " + a['name'];
      document.getElementById("myImg").src = a['image_uris']['png'];
      document.getElementById("mana-cost").innerHTML = "Mana Cost: " + a['mana_cost'];


    }).fail(function () { });



  });

  $("#login-form").submit(function (e) {
    $.ajax({
      url: 'https://doncards-fa13.restdb.io/rest/decks?q={"username": "'+
      document.getElementById('inputUser').value+'"}',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6242758367937c128d7c92b6'
      },
      contentType: 'application/json; charset=utf-8',
      success: function (result) {
        CURRENTID = result[0]["_id"];
        var x = document.getElementById('inputUser').value;
        var y = document.getElementById('inputPassword').value;
        if (x == result[0]["username"] && y == result[0]["password"]) {
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


  $("#addCard").click(function (e) {
    var name = properName(document.getElementById('name').value);
    var count = Number(document.getElementById('add-count').value);
    if (count < 5 && count > 0) {//check if count is a valid number
      if (validateCard(name)&&!isInDeck(name)) {//check if card is a valid card

        if (landSpellCheck(name) == 0) {
          addLand(name, count);
        }
        else {
          addSpell(name, count);
        }

      } else {
        alert("not valid card")
      }
    } else {
      alert("not valid number");
    }
  });

 $("#saveDeck").click(function (e){
   currentDeck["deckName"]=document.getElementById("deckname").value;
   if(CURRENTID!=""){
    $.ajax({
      url: 'https://doncards-fa13.restdb.io/rest/decks/'+CURRENTID
      +'/decks/'+CURRENTDECKID,
      type: 'POST',
      dataType: 'json',
      data:currentDeck,
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6242758367937c128d7c92b6',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      contentType: 'application/json; charset=utf-8',
      success: function (result) {      }
    });
  }
  else
  $.ajax({
    url: 'https://doncards-fa13.restdb.io/rest/decks/'+CURRENTID
    +'/decks',
    type: 'POST',
    dataType: 'json',
    data:currentDeck,
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '6242758367937c128d7c92b6',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    contentType: 'application/json; charset=utf-8',
    success: function (result) {   deckLoad(currentDeck); retrieveDecks();  }
 });
 retrieveDecks();
 });

 $("#deleteDeck").click(function (e){
  if (CURRENTDECKID!=""){
    $.ajax({
      url: 'https://doncards-fa13.restdb.io/rest/accounts/'+CURRENTDECKID
      ,
      type: 'DELETE',
      dataType: 'json',
      data:currentDeck,
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6242758367937c128d7c92b6',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      contentType: 'application/json; charset=utf-8',
      success: function (result) {   }
   });
  }


  currentDeck = {
    "deckName":"New Deck",
    "nonlands":{},
    "lands":{}
  };
  CURRENTDECKID = "";
  deckLoad(currentDeck);
  retrieveDecks();
  
 });
 $("#newDeck").click(function (e){
  currentDeck = {
    "deckName":"New Deck",
    "nonlands":{},
    "lands":{}
  };
  CURRENTDECKID = "";
  deckLoad(currentDeck);
  retrieveDecks();
 });
   /*$(".updL").each(function(){
  
     var name =  $(this).attr("id");
     var value = Number($(this).value);
     currentDeck["lands"][name]=value;
    });*/

});

//----------Add Current Number Count to Current Deck ----------------
$( document ).ajaxComplete(function() {
  
  


  $('.udC').focusout(function(e){
    e.stopImmediatePropagation();
    var name =  $(this).attr("id");
     var value = Number(document.getElementById(name).value);
     currentDeck["nonlands"][name]=value;
  });  
  $('.udL').focusout(function(e){
    e.stopImmediatePropagation();
    var name =  $(this).attr("id");
     var value = Number(document.getElementById(name).value);
     currentDeck["lands"][name]=value;
  });  
  $('.card-block').click(function(e){
    e.stopImmediatePropagation();
    var id =  $(this).attr("id");
    CURRENTDECKID = id;
    allDecks.forEach(function (deck, index){
      if(deck["_id"]==CURRENTDECKID){
    deckLoad(deck);
      }
    });
  }); 
});

if(atFirst!=succeed){
  tryAgain();
}

//----------------------Cookies and Beginning Code--------------------------------------------------------

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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
    $.ajax({
      url: 'https://doncards-fa13.restdb.io/rest/decks?q={"username": "'+
      getCookie("username")+'"}',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6242758367937c128d7c92b6'
      },
      contentType: 'application/json; charset=utf-8',
      success: function (result) {
        CURRENTID = result[0]["_id"];
      }
    });
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
  
  deckLoad(currentDeck);
  retrieveDecks();
  document.getElementById("overlay").style.display = "none";
  $('.hidden').css('display', 'inline');
}


function deckLoad(x) {
  var spells = x["nonlands"];
  var lands = x["lands"];
  var deckName = x["deckName"];
  currentDeck = x;
  resetAllInfo();
 
  $("#deckname").val(deckName);
  $.each(spells, function (key, value) {
    if (validateCard(key)) {
      addSpell(properName(key), value);
    }
  });
  $.each(lands, function (key, value) {
    if (validateCard(key)) {
      addLand(properName(key), value);
    }
  });
}


//-----------COMMUNICATE WITH SCRYFALL-------------------------------------------------
var timeoutId = 0;
function keyupFunction() {
  clearTimeout(timeoutId); // doesn't matter if it's 0
  timeoutId = setTimeout(getFilteredResultCount, 500);


}

function getFilteredResultCount() {
  var cardName = document.getElementById('name').value;
  updateCardData(cardName);
  updateLowerData(cardName);
}
function onmouseover(x) {
  var cardName = x.innerHTML;
  updateLowerData(cardName);
}

/*function keyupCount(){
  clearTimeout(timeoutId);
  
  alert($(this).attr('id'));
}*/


function updateCardData(x) {

  var cCard = cleanCard(x);
  $.getJSON(fuzzyUrl + cCard, function (a) {
    document.getElementById('search-artist').innerHTML = "Artist: " + a['artist'];
    document.getElementById('search-cardName').innerHTML = "Card Name: " + a['name'];
    document.getElementById("myImg").src = a['image_uris']['png'];
    document.getElementById("mana-cost").innerHTML = symbolImg(a['mana_cost']);


  });
}
function updateLowerData(x) {
  var cCard = x.replace(/\s/g, '+');

  $.getJSON(fuzzyUrl + cCard, function (a) {
    document.getElementById('artist').innerHTML = "Artist: " + a['artist'];
    document.getElementById('cardName').innerHTML = "Card Name: " + a['name'];
    document.getElementById("myImg").src = a['image_uris']['png'];


  });
}


function showcard(x) {
  clearTimeout(timeoutId); // doesn't matter if it's 0
  timeoutId = setTimeout(onmouseover(x), 500);

}


  //---------------------------------------------------------------------//