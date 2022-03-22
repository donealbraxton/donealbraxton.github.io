$(document).ready(function(){

var $images = ['im1','im2','im3','im4','im5','im6']

$images.forEach(element => {
    $.getJSON('https://api.scryfall.com' + "/cards/random?q=is%3Amodern", function(a){
        document.getElementById(element).src = a['image_uris']['large'];
        });
});
    
      
 



  });