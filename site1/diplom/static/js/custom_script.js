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


function deleteElem(id,name)
{
  real_id=document.getElementById(id).getAttribute('plain_id');
  const value = JSON.parse(document.getElementById('hello-data').textContent);
  arr = JSON.parse(value);
  for (var i = 0; i < arr.length; i++)
  {
    if (arr[i].id==real_id)
    {
      for (var j = 0; j < arr[i].param.length; j++)
      {
        usedparams=document.getElementsByClassName("param_text");
        for (var l = 0; l < usedparams.length; l++)
          {
            if (arr[i].param[j].param_id==usedparams[l].getAttribute('plain_id'))
            {
              usedparams[l].setAttribute("value", parseFloat(usedparams[l].getAttribute('value'))-parseFloat(arr[i].param[j].param_value))
              usedparams[l].textContent = usedparams[l].getAttribute('name') + " : " + usedparams[l].getAttribute('value');
              if(usedparams[l].getAttribute('value')==0)
              {
                usedparams[l].remove();
              }
            }
          }
      }
    }
  }
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
  plain_id = img.split(/[_.]/)[1];
  elementDiv.setAttribute("plain_id",plain_id);
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
        

    const value = JSON.parse(document.getElementById('hello-data').textContent);
    arr = JSON.parse(value);
    for (var i = 0; i < arr.length; i++)
    {
      if (arr[i].id==id)
      {
        for (var j = 0; j < arr[i].param.length; j++)
        {
          find_param=0;
          usedparams=document.getElementsByClassName("param_text");
          for (var l = 0; l < usedparams.length; l++)
            {
              if (arr[i].param[j].param_id==usedparams[l].getAttribute('plain_id'))
              {
                usedparams[l].setAttribute("value", parseFloat(usedparams[l].getAttribute('value'))+parseFloat(arr[i].param[j].param_value))
                usedparams[l].textContent = usedparams[l].getAttribute('name') + " : " + usedparams[l].getAttribute('value');
                find_param=1;
              }
            }
            if (find_param==0)
            {
              const rootDiv = document.getElementsByClassName("param_text");
              const elementDiv = document.createElement("div");
              elementDiv.setAttribute("id",'param_'+arr[i].param[j].param_id);
              elementDiv.setAttribute("plain_id",arr[i].param[j].param_id);
              elementDiv.setAttribute("name",arr[i].param[j].param_name);
              elementDiv.setAttribute("value",arr[i].param[j].param_value);
              elementDiv.textContent = arr[i].param[j].param_name+" : "+arr[i].param[j].param_value;
              elementDiv.classList.add('param_text');
              rootDiv[0].appendChild(elementDiv);
            }
        }
      }
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

    const value = JSON.parse(document.getElementById('hello-data').textContent);
    arr = JSON.parse(value);
    for (var i = 0; i < arr.length; i++)
    {
      if (arr[i].id==id)
      {
        for (var j = 0; j < arr[i].param.length; j++)
        {
          usedparams=document.getElementsByClassName("param_text");
          for (var l = 0; l < usedparams.length; l++)
            {
              if (arr[i].param[j].param_id==usedparams[l].getAttribute('plain_id'))
              {
                usedparams[l].setAttribute("value", parseFloat(usedparams[l].getAttribute('value'))-parseFloat(arr[i].param[j].param_value))
                usedparams[l].textContent = usedparams[l].getAttribute('name') + " : " + usedparams[l].getAttribute('value');
                if(usedparams[l].getAttribute('value')==0)
                {
                  usedparams[l].remove();
                }
              }
            }
        }
      }
    }
  }
}
