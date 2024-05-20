function gotoFreeConstructor()
{
    document.location.href+="/free";
}

$(document).ready(function() {
    $('#wrapper1').on('scroll', function() {
      $('#wrapper2').scrollLeft($(this).scrollLeft());
    });
  });


  function gobacktoConstructor()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1];
}