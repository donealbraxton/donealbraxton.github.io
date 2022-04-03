$(document).ready(function() {

//------------------------------------------------------------------------

$("#login-form").submit(function(e){
    
    var x = document.getElementById('inputUser').value
    var y = document.getElementById('inputPassword').value; 
    alert("clicked");
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
        
            alert(result[0]["username"]);
            if (x === result[0]["username"] && y === result[0]["password"]) {
                alert("You have successfully logged in.");
        
            } else {
                alert("You have clicked the Sign in Button.");
            }
        },
        error: function (error) {
            alert("not working");
        }
    });
    e.preventDefault();
  });



});

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
      
      off();
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
        on();
      }
    }
  }

  function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }
