function gotoConstructor()
{
    document.location.href+="constructor";
}

function gotoOrders()
{
    document.location.href+="orders";
}

function gobacktoOrders()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/orders";
}

function gotoCakes()
{
    document.location.href+="cakes";
}

function gotoIngredients()
{
    document.location.href+="ingredients";
}

function gotoConcIngredients()
{
    document.location.href+="concingredients";
}

function gotoParameteres()
{
    document.location.href+="parameters";
}

function gotomain()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/";
}

function showPass()
{
    var x = document.getElementById("third"); var name = "checkpass";
    if (x.type === "password") {
      x.type = "password_text";
      document.getElementById(name).innerHTML = '';
      const rootDiv = document.getElementById(name);
      const element = document.createElement("img");
      element.setAttribute("src",'/static/images/view.png');
      rootDiv.appendChild(element);
    } else {
      x.type = "password";
      document.getElementById(name).innerHTML = '';
      const rootDiv = document.getElementById(name);
      const element = document.createElement("img");
      element.setAttribute("src",'/static/images/hide.png');
      rootDiv.appendChild(element);
    }
}


function enter()
{
  var error = document.getElementById("error_label"); 
  error.style.visibility="hidden";
  var password = document.getElementById("third"); 
  var login = document.getElementById("login"); 
  if (login.value=="") 
  {
    error.style.visibility="visible";
    error.textContent="Отсутствует логин!";
    setTimeout(function(){
      error.style.visibility="hidden";
  }, 2500);
  }
  else if (password.value=="") 
  {
    error.style.visibility="visible";
    error.textContent="Отсутствует пароль!";
    setTimeout(function(){
      error.style.visibility="hidden";
  }, 2500);
  }
  else 
  {
    $.ajax({
      url: "getlogpass/",
      type: "GET",
      dataType: "json",
      data:{
        'login': login.value,
        'password': password.value,
    },
    async: false,
      success: (data) => {
        var pass = data['password'];
        var log=data['login'];
        var usrid=data['id']
        if (log==0) 
        {
          error.style.visibility="visible";
          error.textContent="Введенного логина не существует!";
          setTimeout(function(){
            error.style.visibility="hidden";
        }, 2500);
        }
        else if (pass==0) 
        {
          error.style.visibility="visible";
          error.textContent="Неправильный пароль!";
          setTimeout(function(){
            error.style.visibility="hidden";
        }, 2500);
        }
        else 
        {
            $.ajax({
              url: "create_token/",
              type: "GET",
              dataType: "json",
              data: {
                "id":usrid,
              },
              success: (data) => {
                document.cookie="token="+data['token']+";id="+data['id'];
                var newUrl = "main/";
                document.location.href = newUrl;
              },
              error: (error) => {
                  console.log(error);
              }
            });

        }
        
      },
      error: (error) => {
          console.log(error);
      }
    });

  }
}