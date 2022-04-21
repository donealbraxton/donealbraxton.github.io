$.ajaxSetup({
    async: false
  });


$(document).ready(function () {

    $("#login-form").submit(function (e) {
        
        var x = document.getElementById('inputUser').value;
        var y = document.getElementById('inputPassword').value;
        var yx = document.getElementById('inputCPassword').value;
        function changePage(){
            var account = {"username":x,"password":y};
            $.ajax({
                url: 'https://doncards-fa13.restdb.io/rest/decks',
                type: 'POST',
                dataType: 'json',
                data:account,
                headers: {
                  'Content-Type': 'application/json',
                  'x-apikey': '6242758367937c128d7c92b6',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                contentType: 'application/json; charset=utf-8',
                success: function (result) {      }
              });
              $("#overlay").empty().append('<a id="aa" href="loginPage.html">LOGIN NOW</a>');
        }




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
            if(result[0]!=null){alert("Username Already Exists");}
            else{ if(y==yx){
                changePage();
            }
            else
            alert("Passwords Don't Match");}
          },
          error: function (error) {
            
          }
        });
        e.preventDefault();
      });

});