$(document).ready(function() {
                
                         

    $("#login-form-submit").click(function(){
   
        var username = document.getElementById('inputUser').value
        var pass = document.getElementById('inputPassword').value; 
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
            
            
                alert(username+ pass);
                if (username === result[0]["username"] && pass === result[0]["password"]) {
                    alert("You have successfully logged in.");
            
                } else {
                    alert("You have clicked the Sign in Button.");
                }
            },
            error: function (error) {
                alert("not working");
            }
        });


            
    
      });







});