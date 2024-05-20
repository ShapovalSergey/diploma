const elem = document.querySelector('.main'); 
var buttons = document.getElementsByClassName("components");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(e) {
      if (document.getElementById('yach'+ this.getAttribute("id")).style.visibility=='visible')
      {document.getElementById('yach'+ this.getAttribute("id")).style.visibility='hidden'}
      else {
          var op = this.getAttribute("id");
          document.getElementById('yach'+ this.getAttribute("id")).style.visibility='visible';
          for (var j = 0; j < buttons.length; j++) {
              if  ((document.getElementById('yach'+ buttons[j].id).style.visibility=='visible')&&(op!=buttons[j].id))
              {document.getElementById('yach'+ buttons[j].id).style.visibility='hidden'}
          }
      };
  };
} 


function saveEdited(name)
{
  saveEdited1(name);
  setTimeout('secondstep()',3000);
}

function editburger(id,images,name)
{
  document.getElementById("sectitle").textContent+="("+name+")";
  let test = document.querySelectorAll('.newElement');
  for (var j = 0; j < test.length; j++)
  {
    deleteElem(test[j].getAttribute("id"),test[j].getAttribute("name"));
  }
  document.getElementById('butadd').style.visibility='hidden';
  document.getElementById('butdel').style.visibility='hidden';
  document.getElementById('counter').style.visibility='hidden';
  document.getElementById('butsecord').style.visibility='hidden';
  document.getElementById('basicon1').style.visibility='hidden';
  document.getElementById('basicon2').style.visibility='hidden';
  const rootDiv = document.getElementsByClassName("secondpage");
  const elementDiv = document.createElement("div");
  const elementText = document.createElement("div");
  elementDiv.setAttribute("id","butsave");
  elementDiv.onclick=function(){saveEdited(name);}
  elementText.style.cssText+='padding-top: 14px; padding-bottom: 17px; padding-left: 70px; padding-right: 76px;';
  elementDiv.style.visibility='visible';
  elementText.textContent="Сохранить";
  elementDiv.appendChild(elementText);
  elementDiv.classList.add('buttonsave');
  elementText.classList.add('secondordertext');
  rootDiv[0].appendChild(elementDiv);
  closeNav();
  for (var i = 0; i < id.length; i++)
  {
    addConcIng(id[i],images[i]);
  }
}
  
function editDish(name)
{
  $.ajax({
          url: "/getdish/",
          type: "GET",
          dataType: "json",
          data:{
              'name': name,
          },
          success: (data) => {
              editburger(data['id'],data['images'],name);
          },
          error: (error) => {
              console.log(error);
          }
          });
}
  
function clearBin()
{  
  document.getElementById("ryad").innerHTML = '';
}
  
function basket_menu(value,kolvo,dishnames,dishimages,dishvalues)
{
  if(kolvo==0)
  {
    document.getElementById("menutitle").textContent="В вашей корзине пусто((";
  }
  else
  {
    document.getElementById("menutitle").textContent="Товаров - (" + kolvo+") на сумму: " + value+" ₽";
  }
  document.getElementById("dish_count").textContent=kolvo+ " шт";
  document.getElementById("basket_sum").textContent= value + " ₽";
  for (var i = 0; i < dishnames.length; i++)
  {
  const rootDiv = document.getElementsByClassName("ryad");
  const elementDiv = document.createElement("div");
  const elementImage = document.createElement("div");
  const elementDelete = document.createElement("div"); 
  const elementChange = document.createElement("div");
  const elementCost = document.createElement("div");
  const elementName = document.createElement("div");
  elementName.textContent=dishnames[i];
  elementChange.textContent="Изменить";
  elementDelete.textContent="Удалить";
  elementCost.textContent="Цена: "+dishvalues[i]+" ₽";
  elementDiv.setAttribute("id","menu_pos"+(i+1));
  elementChange.setAttribute("id","dish_menu_change"+(i+1));
  elementDelete.setAttribute("id","dish_menu_delete"+(i+1));
  elementImage.style.cssText+='background-image:url(static/images/dishes/'+dishimages[i]+');';
  const iname = dishnames[i]
  elementDelete.onclick=function(){deleteDish(iname);}
  elementChange.onclick=function(){editDish(iname);}
  elementImage.classList.add('dish_image');
  elementChange.classList.add('dish_change');
  elementDelete.classList.add('dish_delete');
  elementCost.classList.add('dish_cost');
  elementName.classList.add('dish_name');
  elementDiv.appendChild(elementImage);
  elementDiv.appendChild(elementDelete);
  elementDiv.appendChild(elementChange);
  elementDiv.appendChild(elementCost);
  elementDiv.appendChild(elementName);
  elementDiv.classList.add('menu_position');
  rootDiv[0].appendChild(elementDiv);
  }
}
  
function get_bin()
{
  $.ajax({
          url: "/getbin/",
          type: "GET",
          dataType: "json",
          success: (data) => {
            basket_menu(data['value'],data['kolvo'],data['dnames'],data['dimages'],data['dvalue']);
          },
          error: (error) => {
              console.log(error);
          }
        });
}
  
function makeorder ()
{
  firststep();
  setTimeout('secondstep()',3000);
}
  
function secondstep()
{
  document.getElementById("sectitle").textContent="Конструктор";
  document.getElementById('butadd').style.visibility='visible';
  document.getElementById('butdel').style.visibility='visible';
  document.getElementById('counter').style.visibility='visible';
  document.getElementById('butsecord').style.visibility='visible';
  document.getElementById('basicon1').style.visibility='visible';
  document.getElementById('basicon2').style.visibility='visible';
  document.getElementById('itogvalue').style.visibility='visible';
  ing = document.getElementsByClassName("newElement");
  const elem=document.getElementById("topbread")
  let test = document.querySelectorAll('.newElement');
  for (var j = 0; j < test.length; j++)
  {
    deleteElem(test[j].getAttribute("id"),test[j].getAttribute("name"));
  }
  let myAnimation = anime ({
          targets: elem,
          translateY: 0,
          duration: 2000,
          easing: 'linear',
  });
  hide = document.getElementsByClassName("yach");
  for (var j = 0; j < hide.length; j++)
  {
    hide[j].style.visibility='hidden';
  }
}

function deleteElem(id,name)
{
  document.getElementById(id).remove();
  cell=document.getElementsByClassName("yach1");
  for (var i = 0; i < cell.length; i++)
  {
  if(cell[i].getAttribute("name")==name)
  {
    cell[i].setAttribute("count",Number(cell[i].getAttribute("count"))-1);
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(cell[i].getAttribute("value")));
    document.getElementById("itogvalue").setAttribute('value',price-addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    if(Number(cell[i].getAttribute('count'))<1)
    {
      document.getElementById('smbutdelete_'+ cell[i].getAttribute('name')).style.cursor='default';
    }
  }
  }
}

function createElementsInside(id,value,name,img,otstup) 
{
  const rootDiv = document.getElementsByClassName("fishka_additional");
  const elementDiv = document.createElement("div");
  const elementText = document.createElement("div");
  const elementDelete = document.createElement("div");
  if(otstup%2==1)
  {
    elementText.style.cssText='margin-top: 40px; margin-left: 450px; font-size: 30px; width: 200px;';
    elementDelete.style.cssText='background-image:url(http://127.0.0.1:8000/static/images/close-button1.png);margin-top: -38px; margin-left: 660px;;background-repeat: no-repeat;background-position: center;height: 40px; width: 40px; border-color:#ffffff;color:#ffffff;';
  }
  else 
  {
    elementText.style.cssText='margin-top: 40px; margin-left: -150px; font-size: 30px; width: 200px;';
    elementDelete.style.cssText='background-image:url(http://127.0.0.1:8000/static/images/close-button1.png);margin-top: -38px; margin-left: -200px;;background-repeat: no-repeat;background-position: center;height: 40px;width: 40px;border-color:#ffffff;color:#ffffff;';
  }
  elementDelete.setAttribute("id",'butdel_'+id);
  elementDelete.setAttribute("name",name);
  elementDelete.onclick=function(){deleteElem(id,name);}
  elementDiv.setAttribute("id",id);
  elementDiv.setAttribute("value",value);
  elementDiv.setAttribute("name",name);
  elementDiv.setAttribute("number",otstup);
  elementDiv.style.cssText+='background-image:url(http://127.0.0.1:8000/static/images/ingready/'+img+');background-repeat: no-repeat;background-position: center;margin-top:'+(430-30*otstup)+'px;opacity: 0;animation: ani 1s forwards;z-index:'+otstup+';';
  elementText.style.cssText+='opacity: 0;animation: ani 1s forwards;';
  elementDelete.style.cssText+='opacity: 0;animation: ani 1s forwards;cursor:pointer;';
  elementText.textContent=name+': '+value+'₽';
  elementDelete.classList.add('closebtn');
  elementText.classList.add('CIname');
  elementDiv.appendChild(elementText);
  elementDiv.appendChild(elementDelete);
  elementDiv.classList.add('newElement');
  rootDiv[0].appendChild(elementDiv);
}

function addConcIng(id,kar)
{
  const k = document.getElementsByClassName("newElement");
  if (k.length<=13)
  {
    var k1;
    if(k.length>0)
    {
      let arr=[];
      var log;
      for (var j = 1; j <= 14; j++)
      {
        log=true;
        for (var i = 0; i <k.length; i++)
        {
          if(Number(k[i].getAttribute("number"))==j)
          {
            log = false;
          } 
        }
        if(log==true)
        {
          arr.push(j);
        }
      }
      k1 = arr[0];
    }
    else {k1=1;}
    document.getElementById('yach1_'+ id).setAttribute('count',(Number(document.getElementById('yach1_'+ id).getAttribute('count')))+1);
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(document.getElementById('yach1_'+ id).getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price+addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    createElementsInside((document.getElementById('yach1_'+ id).getAttribute('name'))+k1,(Number(document.getElementById('yach1_'+ id).getAttribute('value'))),(document.getElementById('yach1_'+ id).getAttribute('name')),kar,k1);
    if(Number(document.getElementById('yach1_'+ id).getAttribute('count'))>0)
    {
      document.getElementById('smbutdelete_'+ document.getElementById('yach1_'+ id).getAttribute('name')).style.cursor='pointer';
    }
                
  }
}

function bubbleSortConcept1(arr) 
{
  for (let j = arr.length - 1; j > 0; j--) 
  {
    for (let i = 0; i < j; i++) 
    {
      if (arr[i] > arr[i + 1]) 
      {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
}

function reduceConcIng(id,name)
{
  if((Number(document.getElementById('yach1_'+ id).getAttribute('count')))>0)
  {
    const k = document.getElementsByClassName("newElement");
    var f;
    for (var i = 0; i <k.length; i++)
    {
      if(k[i].getAttribute("name")==name)
      {
        f=k[i].getAttribute("id");  
      } 
    }
    deleteElem(f,name);
    if(Number(document.getElementById('yach1_'+ id).getAttribute('count'))<1)
    {
      document.getElementById('smbutdelete_'+ document.getElementById('yach1_'+ id).getAttribute('name')).style.cursor='default';
    }
  }
}

function deleteDish(name)
{
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const requestObject = new XMLHttpRequest();
  requestObject.open("POST", '/deletedish/',false);
  requestObject.setRequestHeader("X-CSRFToken", csrftoken)
  const data = new FormData();
  data.append('name', name);
  requestObject.send(data);
  clearBin();
  get_bin();
}

function saveEdited1(name)
{
  const elem=document.getElementById("topbread")
  document.getElementById("butsave").remove();
  ing = document.getElementsByClassName("newElement");
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const requestObject = new XMLHttpRequest();
  requestObject.open("POST", '/savedish/',false);
  requestObject.setRequestHeader("X-CSRFToken", csrftoken)
  const data = new FormData();
  data.append('name', name);
  var sum=75;
  let names = [];
  for (var i = 0; i < ing.length; i++)
  {
    sum+=Number(ing[i].getAttribute("value"));
    names.push(ing[i].getAttribute("name"));
  }
  data.append('sum', sum);
  data.append('CInames', names);
  requestObject.send(data);
  hide = document.getElementsByClassName("yach");
  for (var j = 0; j < hide.length; j++)
  {
    hide[j].style.visibility='hidden';
  }
  ing = document.getElementsByClassName("newElement");
  otkl=0;
  d=[]
  ing1=[]
  for (var i = ing.length-1; i >=0; i--)
  {
    d.push(Number(ing[i].getAttribute("number")));
  }
  bubbleSortConcept1(d);
  for (var i = 0; i <d.length; i++)
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
                })
  }
  let myAnimation1 = anime ({
                  targets: elem,
                  translateY: ((14-ing.length)*33),
                  duration: 2000,
                  easing: 'linear',
                  });
}

  
function firststep()
{
  document.getElementById('butadd').style.visibility='hidden';
  document.getElementById('butdel').style.visibility='hidden';
  document.getElementById('counter').style.visibility='hidden';
  document.getElementById('butsecord').style.visibility='hidden';
  document.getElementById('basicon1').style.visibility='hidden';
  document.getElementById('basicon2').style.visibility='hidden';
  document.getElementById('itogvalue').style.visibility='hidden';
  ing = document.getElementsByClassName("newElement");
  const elem=document.getElementById("topbread")
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
              })
  }
  var el = document.getElementsByName("csrfmiddlewaretoken");
  csrf_value = el[0].getAttribute("value");
  ing = document.getElementsByClassName("newElement");
  var sum=75;
  let names = [];
  let values = [];
  for (var i = 0; i < ing.length; i++)
  {
    sum+=Number(ing[i].getAttribute("value"));
    names.push(ing[i].getAttribute("name"));
    values.push(Number(ing[i].getAttribute("value")));
  }
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const requestObject = new XMLHttpRequest();
  requestObject.open("POST", '/addtobin/');
  requestObject.setRequestHeader("X-CSRFToken", csrftoken)
  const data = new FormData();
  data.append('names', names);
  data.append('value',values);
  data.append('sum',sum);
  data.append('kol_vo',kol_vo);
  requestObject.send(data);
  document.getElementById("itogvalue").textContent="Итоговая стоимость: 75 ₽";
  let myAnimation = anime ({
              targets: elem,
              translateY: ((14-ing.length)*33),
              duration: 2000,
              easing: 'linear',
              });
}