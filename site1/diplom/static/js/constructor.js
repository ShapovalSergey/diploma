function gotoFreeConstructor(id)
{
    document.location.href+="/free_"+id;
}




function gotoConstructCake(id)
{
    document.location.href+="/constructor_"+id+"_new";
}

$(document).ready(function() {
    $('#wrapper1').on('scroll', function() {
      $('#wrapper2').scrollLeft($(this).scrollLeft());
    });
  });


  function gobacktoConstructor()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/"+local[2];
}

function showPopup()
{
    const ing = document.getElementsByClassName("newElement");
  if (ing.length==0)
    alert("Невозможно создать пустое блюдо. Пожалуйста, добавьте в него ингредиенты");
  else
  {
    document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:block');
    document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:block');
    const p = document.getElementById("popup");
    p.style.transform=`translateY(70%)`
  }
}

function showCakePopup()
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


function savenewCake()
{
  var name = document.getElementById("cake_name").value;
  if (name=='')
    alert("Не введено название блюда");
  else
  {
  id = document.getElementById("id").value;
  $.ajax({
    url: "/check-dish-name/",
    type: "GET",
    dataType: "json",
    async: false,
    data:{
        'name':name,
        'id':id
      },
    success: (data) => {
      var check=data['check'];
      if (check==0)
      alert("Данное имя уже используется, пожалуйста, выберите другое");
      else
      {
        ing = document.getElementsByClassName("newElement");
        otkl=0;
        d=[]
        ing1=[]
        for (var i = 0; i <ing.length; i++)
        {
          d.push(Number(ing[i].getAttribute("number")));
        }
        bubbleSortConcept1(d);
        for (var i = 0; i <ing.length; i++)
        {
          for (var j = 0; j <ing.length; j++)
          {
            if(d[i]==Number(ing[j].getAttribute("number")))
            {
              ing1.push(ing[j]);
            }
          }
        }
        for (var i = ing1.length-1; i >=0; i--)
        {
          otkl=Number(ing1[i].getAttribute("number"));
          let compAnimation = anime({
                      targets: ing1[i],
                      translateY: ((otkl-(i+1))*33),
                      duration: 2000,
                      easing: 'linear',
                    });
          ing1[i].setAttribute("location", i);
        }
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        var sum=0;
        let names = [];
        let values = [];
        let locations = [];
        let ids = [];
        for (var i = 0; i < ing.length; i++)
        {
          sum+=Number(ing[i].getAttribute("value"));
          names.push(ing[i].getAttribute("name"));
          values.push(Number(ing[i].getAttribute("value")));
          locations.push(Number(ing[i].getAttribute("location")));
          ids.push(Number(ing[i].getAttribute("plain_id")));
        }
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const requestObject = new XMLHttpRequest();
        requestObject.open("POST", '/savenewdish/');
        requestObject.setRequestHeader("X-CSRFToken", csrftoken)
        const data = new FormData();
        data.append('names', names);
        data.append('name', name);
        data.append('value',values);
        data.append('id', id);
        data.append('locations',locations);
        data.append('sum',sum);
        data.append('ids',ids);
        requestObject.send(data);
        closePopup();
        var conc_ing = document.getElementsByClassName("yach");
        for (var i = 0; i < conc_ing.length; i++) 
        {
          conc_ing[i].style.visibility='hidden';
        }
        setTimeout('gobacktoConstructor()',3000);
      }
    },
    error: (error) => {
        console.log(error);
    }
});
}
}

function savenewConcreteCake(id)
{
  var name = document.getElementById("cake_name").value;
  if (name=='')
    alert("Не введено название блюда");
  else
  {
    dish_id = document.getElementById("dish_id").value;
  $.ajax({
    url: "/check-dish-name/",
    type: "GET",
    dataType: "json",
    async: false,
    data:{
        'name':name,
        'id':dish_id
      },
    success: (data) => {
      var check=data['check'];
      if (name==document.getElementById("cake_name").getAttribute('oldname')) check=1;
      if (check==0)
      alert("Данное имя уже используется, пожалуйста, выберите другое");
      else
      {
        ing = document.getElementsByClassName("newfullElement");
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        var sum=0;
        let names = [];
        let values = [];
        let ids = [];
        for (var i = 0; i < ing.length; i++)
        {
          sum+=Number(ing[i].getAttribute("value"));
          names.push(ing[i].getAttribute("name"));
          values.push(Number(ing[i].getAttribute("value")));
          ids.push(Number(ing[i].getAttribute("plain_id")));
        }
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const requestObject = new XMLHttpRequest();
        requestObject.open("POST", '/savenewconcretedish/');
        requestObject.setRequestHeader("X-CSRFToken", csrftoken)
        const data = new FormData();
        data.append('names', names);
        data.append('name', name);
        data.append('value',values);
        data.append('sum',sum);
        data.append('ids',ids);
        data.append('id',dish_id);
        data.append('cake_id',id);
        requestObject.send(data);
        closePopup();
        var conc_ing = document.getElementsByClassName("yach");
        for (var i = 0; i < conc_ing.length; i++) 
        {
          conc_ing[i].style.visibility='hidden';
        }
        if(id=='new')
        gobacktoConstructor();
        else
        gobacktoOrders();
      }
    },
    error: (error) => {
        console.log(error);
    }
});
}
}






function saveChangedCake(id)
{
  var name = document.getElementById("cake_name").value;
  if (name=='')
    alert("Не введено название блюда");
  else
  {
  var id = document.getElementById("id").value;
  $.ajax({
    url: "/check-dish-name/",
    type: "GET",
    dataType: "json",
    async: false,
    data:{
        'name':name,
        'id':id
      },
    success: (data) => {
      var check=data['check'];
      if (name==document.getElementById("cake_name").getAttribute('oldname')) check=1;
      if (check==0)
      alert("Данное имя уже используется, пожалуйста, выберите другое");
      else
      {
        ing = document.getElementsByClassName("newElement");
        otkl=0;
        d=[]
        ing1=[]
        for (var i = 0; i <ing.length; i++)
        {
          d.push(Number(ing[i].getAttribute("number")));
        }
        bubbleSortConcept1(d);
        for (var i = 0; i <ing.length; i++)
        {
          for (var j = 0; j <ing.length; j++)
          {
            if(d[i]==Number(ing[j].getAttribute("number")))
            {
              ing1.push(ing[j]);
            }
          }
        }
        for (var i = ing1.length-1; i >=0; i--)
        {
          otkl=Number(ing1[i].getAttribute("number"));
          let compAnimation = anime({
                      targets: ing1[i],
                      translateY: ((otkl-(i+1))*33),
                      duration: 2000,
                      easing: 'linear',
                    });
          ing1[i].setAttribute("location", i);
        }
        var el = document.getElementsByName("csrfmiddlewaretoken");
        csrf_value = el[0].getAttribute("value");
        var sum=0;
        let names = [];
        let values = [];
        let locations = [];
        let ids = [];
        for (var i = 0; i < ing.length; i++)
        {
          sum+=Number(ing[i].getAttribute("value"));
          names.push(ing[i].getAttribute("name"));
          values.push(Number(ing[i].getAttribute("value")));
          locations.push(Number(ing[i].getAttribute("location")));
          ids.push(Number(ing[i].getAttribute("plain_id")));
        }
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const requestObject = new XMLHttpRequest();
        requestObject.open("POST", '/savenewdish/');
        requestObject.setRequestHeader("X-CSRFToken", csrftoken)
        const data = new FormData();
        data.append('names', names);
        data.append('name', name);
        data.append('id', id);
        data.append('value',values);
        data.append('locations',locations);
        data.append('sum',sum);
        data.append('ids',ids);
        requestObject.send(data);
        closePopup();
        var conc_ing = document.getElementsByClassName("yach");
        for (var i = 0; i < conc_ing.length; i++) 
        {
          conc_ing[i].style.visibility='hidden';
        }
        setTimeout('gobacktoOrders()',3000);
      }
    },
    error: (error) => {
        console.log(error);
    }
});
}
}