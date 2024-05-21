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

function showPopup()
{
    document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:block');
    document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:block');
    const p = document.getElementById("popup");
    p.style.transform=`translateY(70%)`
}
function closePopup()
{
    document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:none');
    document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:none');
}

