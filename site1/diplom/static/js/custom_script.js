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
  decreaseCharacteristics(real_id);
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
    elementText.style.cssText='margin-top:5px; margin-left: 400px; font-size: 30px; width: 250px;';
    elementDelete.style.cssText='background-image:url(http://127.0.0.1:8000/static/images/close-button1.png); margin-top: -40px;margin-left: 640px;;background-repeat: no-repeat;background-position: center;height: 40px; width: 40px; border-color:#ffffff;color:#ffffff;';
  }
  else 
  {
    elementText.style.cssText='margin-top:5px; margin-left: -250px; font-size: 30px; width: 250px;';
    elementDelete.style.cssText='background-image:url(http://127.0.0.1:8000/static/images/close-button1.png); margin-top: -40px;margin-left: -280px;;background-repeat: no-repeat;background-position: center;height: 40px;width: 40px;border-color:#ffffff;color:#ffffff;';
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
  elementDiv.style.cssText+='background-image:url(http://127.0.0.1:8000/static/images/ingready/'+img+');background-repeat: no-repeat;background-position: center;margin-top:'+(430-30*otstup)+'px;opacity: 0.99;animation: ani 1s forwards;z-index:'+otstup+';';
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
    
    addChaarcteristics(id);


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

function addChaarcteristics(id)
{
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
              var stroka = usedparams[l].getAttribute('value').split('.');
              if (stroka[1]!=undefined) {if (stroka[1].length>2) stroka[1] = stroka[1].substr(0,2);}
              else stroka[1] = 0;
              const val = stroka[0]+'.'+stroka[1];
              usedparams[l].textContent = usedparams[l].getAttribute('name') + " : " + val;
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
            var stroka = arr[i].param[j].param_value.split('.');
            if (stroka[1]!=undefined) {if (stroka[1].length>2) stroka[1] = stroka[1].substr(0,2);}
            else stroka[1] = 0;
            const val = stroka[0]+'.'+stroka[1];
            elementDiv.textContent = arr[i].param[j].param_name+" : "+val;
            elementDiv.classList.add('param_text');
            rootDiv[0].appendChild(elementDiv);
          }
      }
    }
  }
}

function decreaseCharacteristics(id)
{
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
              usedparams[l].setAttribute("value", parseFloat(usedparams[l].getAttribute('value'))-parseFloat(arr[i].param[j].param_value));
              var stroka = usedparams[l].getAttribute('value').split('.');
              if (stroka[1]!=undefined) {if (stroka[1].length>2) stroka[1] = stroka[1].substr(0,2);}
              else stroka[1] = 0;
              const val = stroka[0]+'.'+stroka[1];
              usedparams[l].textContent = usedparams[l].getAttribute('name') + " : " + val;
              if(usedparams[l].getAttribute('value')<=0)
              {
                usedparams[l].remove();
              }
            }
          }
      }
    }
  }
}


function editcake(id,images,name)
{
  document.getElementById("sectitle").textContent+="("+name+")";
  for (var i = 0; i < id.length; i++)
  {
    addConcIng(id[i],images[i]);
  }
}

function editDish(id)
{
  $.ajax({
          url: "/getdish/",
          type: "GET",
          dataType: "json",
          data:{
              'id': id,
          },
          success: (data) => {
              editcake(data['id'],data['images'],data['name']);
          },
          error: (error) => {
              console.log(error);
          }
          });
}






if (document.getElementById('type').value=="cake")
{
  id = document.getElementById('dish_id').value;
  if(id!='new')
  {
    window.onload = createStartCakePosition();
  }
  else
  {
    window.onload = createStartPosition();
  }
}
else 
{
  id = document.getElementById('id').value;
  if(id!='new')
  {
    editDish(id);
  }
}

function createStartCakePosition()
{
  const rootDiv = document.getElementsByClassName("ing_text");
  const ding = JSON.parse(document.getElementById('ding').textContent);
  ding_arr = JSON.parse(ding);
  const dcing = JSON.parse(document.getElementById('dcing').textContent);
  dcing_arr = JSON.parse(dcing);
  var k = 0;
  const value = JSON.parse(document.getElementById('hello-data').textContent);
  arr = JSON.parse(value);
  for (var i = 0; i < ding_arr.length; i++)
  {
    yach = document.getElementsByClassName("yach1 "+ding_arr[i].ingname);
    for (var j = 0; j < yach.length; j++)
    {
      if (yach[j].getAttribute('plain_id')==ding_arr[i].id) 
      {
        k=j;
      }
    }
    yach[k].setAttribute("isactive",'true');
    var divs1 = document.getElementsByClassName("yach1 extra_components "+ding_arr[i].ingname);
    document.getElementById("extra_components_"+ding_arr[i].id).setAttribute("style","border: 2px solid #5fe46a;");
    var plain_id = parseInt(yach[k].getAttribute("plain_id"));
    var name = yach[k].getAttribute("name");
    addChaarcteristics(plain_id);
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(yach[0].getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price+addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    for (var j = 0; j < arr.length; j++)
    {
      if (arr[j].id==plain_id)
      {
        var kar = arr[j].img;
        const elementDiv = document.createElement("div");
        elementDiv.setAttribute("id",'ing_'+arr[j].ingid);
        elementDiv.setAttribute("plain_id",arr[j].id);
        elementDiv.setAttribute("name",arr[j].name);
        elementDiv.textContent = arr[j].ingname+" : "+arr[j].name;
        elementDiv.classList.add('param_text');
        rootDiv[0].appendChild(elementDiv);
        createFullElementsInside(arr[j].ingname,addprice,name,kar,1);
      }
    }
  }
  const title = document.createElement("div");
  title.classList.add('param_block_title');
  title.setAttribute("style","margin-left:-25px;position:relative;margin-top:10px;")
  title.textContent="Дополнительно:";
  rootDiv[0].appendChild(title);
  for (var i = 0; i < dcing_arr.length; i++)
  {
    changeNonEssential(dcing_arr[i].id)
  }
  }


function createFullElementsInside(id,value,name,img,index) 
{
  const rootDiv = document.getElementsByClassName("fishka_additional");
  const elementDiv = document.createElement("div");
  

  elementDiv.setAttribute("id","ing_image_"+id);
  plain_id = img.split(/[_.]/)[1];
  elementDiv.setAttribute("plain_id",plain_id);
  elementDiv.setAttribute("value",value);
  elementDiv.setAttribute("name",name);
  elementDiv.style.cssText+='background-image:url(http://127.0.0.1:8000/static/images/ingready/'+img+');background-repeat: no-repeat;background-position: center;opacity: 0.99;animation: ani 1s forwards;';
  if (index==-1) 
    {elementDiv.style.cssText+='z-index:0;opacity:0.99;';}
  else elementDiv.style.cssText+='z-index:'+100-id+';';
  elementDiv.style.opacity=100-id;
  elementDiv.classList.add('newfullElement');
  rootDiv[0].appendChild(elementDiv);
}




function createStartPosition()
{
  const rootDiv = document.getElementsByClassName("ing_text");
  var divs = document.getElementsByClassName("yach essential");
  for (var i = 0; i < divs.length; i++)
  {
    yach = document.getElementsByClassName("yach1 "+divs[i].getAttribute("name"));
    yach[0].setAttribute("isactive",'true');
    var divs1 = document.getElementsByClassName("yach1 extra_components "+divs[i].getAttribute("name"));
    divs1[0].setAttribute("style","border: 2px solid #5fe46a;");
    var plain_id = parseInt(yach[0].getAttribute("plain_id"));
    var name = yach[0].getAttribute("name");
    addChaarcteristics(plain_id);
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(yach[0].getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price+addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    const value = JSON.parse(document.getElementById('hello-data').textContent);
    arr = JSON.parse(value);
    for (var j = 0; j < arr.length; j++)
    {
      if (arr[j].id==plain_id)
      {
        var kar = arr[j].img;
        const elementDiv = document.createElement("div");
        elementDiv.setAttribute("id",'ing_'+arr[j].ingid);
        elementDiv.setAttribute("plain_id",arr[j].id);
        elementDiv.setAttribute("name",arr[j].name);
        elementDiv.textContent = arr[j].ingname+" : "+arr[j].name;
        elementDiv.classList.add('param_text');
        rootDiv[0].appendChild(elementDiv);
        createFullElementsInside(arr[j].ingname,addprice,name,kar,1);
      }
    }
  }
  const title = document.createElement("div");
  title.classList.add('param_block_title');
  title.setAttribute("style","margin-left:-25px;position:relative;margin-top:10px;")
  title.textContent="Дополнительно:";
  rootDiv[0].appendChild(title);
}

function changeIngInfo(id,index)
{
  const value = JSON.parse(document.getElementById('hello-data').textContent);
  arr = JSON.parse(value);
  for (var i = 0; i < arr.length; i++)
    {
      if (arr[i].id==id)
      {
        var kar = arr[i].img;
        document.getElementById("ing_"+arr[i].ingid).textContent = arr[i].ingname+" : "+arr[i].name;
        document.getElementById("ing_image_"+arr[i].ingname).setAttribute("style",'background-image:url(http://127.0.0.1:8000/static/images/ingready/'+arr[i].img+');background-repeat: no-repeat;background-position: center;opacity: 0.99;animation: ani 1s forwards;');
        if (index==-1) 
          {document.getElementById("ing_image_"+arr[i].ingname).style.cssText+='z-index:0;opacity:0.99;';}
        else document.getElementById("ing_image_"+arr[i].ingname).style.cssText+='z-index:'+100-id+';';
        document.getElementById("ing_image_"+arr[i].ingname).setAttribute("plain_id",id);
      }
    }
}

function changeEssential(id)
{
  const elem = document.getElementById("yach1_"+id);
  isActive = elem.getAttribute("isactive");
  if(isActive=='false')
  {
    var className = elem.className;
    divs = document.getElementsByClassName(className);
    for (var i = 0; i < divs.length; i++)
    {
      if (divs[i].getAttribute("isactive")=='true')
      {
        divs[i].setAttribute("isactive",'false');
        var plain_id = parseInt(divs[i].getAttribute("plain_id"));
        document.getElementById("extra_components_"+plain_id).setAttribute("style","border: 2px solid #fff;");
        decreaseCharacteristics(plain_id);
        var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
        var addprice =  (Number(divs[i].getAttribute('value')));
        document.getElementById("itogvalue").setAttribute('value',price-addprice);
        var itog = document.getElementById("itogvalue").getAttribute('value');
        val1 = parseFloat(itog);
        document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
      }
    }
    elem.setAttribute("isactive",'true');
    document.getElementById("extra_components_"+elem.getAttribute("plain_id")).setAttribute("style","border: 2px solid #5fe46a;");
    addChaarcteristics(elem.getAttribute("plain_id"));
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(elem.getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price+addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    changeIngInfo(elem.getAttribute("plain_id"),1);
  }
}



function changeNonEssential(id)
{
  const rootDiv = document.getElementsByClassName("ing_text");
  const elem = document.getElementById("yach1_"+id);
  isActive = elem.getAttribute("isactive");
  const value = JSON.parse(document.getElementById('hello-data').textContent);
  arr = JSON.parse(value);
  for (var j = 0; j < arr.length; j++)
  {
    if (arr[j].id==elem.getAttribute("plain_id"))
    {
      var number = j;
    }
  }
  const ingname=arr[number].ingname;
  const img = arr[number].img;
  const ingid = arr[number].ingid;
  if(isActive=='false')
  {
    var counter=0;
    var className = elem.className;
    divs = document.getElementsByClassName(className);
    for (var i = 0; i < divs.length; i++)
    {
      if (divs[i].getAttribute("isactive")=='true')
      {
        divs[i].setAttribute("isactive",'false');
        var plain_id = parseInt(divs[i].getAttribute("plain_id"));
        document.getElementById("extra_components_"+plain_id).setAttribute("style","border: 2px solid #fff;");
        decreaseCharacteristics(plain_id);
        var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
        var addprice =  (Number(divs[i].getAttribute('value')));
        document.getElementById("itogvalue").setAttribute('value',price-addprice);
        var itog = document.getElementById("itogvalue").getAttribute('value');
        val1 = parseFloat(itog);
        document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
        counter++;
      }
    }
    if (counter==0)
    {
      const elementDiv = document.createElement("div");
      elementDiv.setAttribute("id",'ing_'+arr[number].ingid);
      elementDiv.setAttribute("plain_id",arr[number].id);
      elementDiv.setAttribute("name",arr[number].name);
      elementDiv.textContent = arr[number].ingname+" : "+arr[number].name;
      elementDiv.classList.add('ing_text');
      rootDiv[0].appendChild(elementDiv);
    }
    else 
    {
      document.getElementById("ing_"+ingid).textContent=arr[number].ingname+" : "+arr[number].name;
      document.getElementById("ing_image_"+ingname).remove();
    }
    createFullElementsInside(ingname,elem.getAttribute('value'),elem.getAttribute('name'),img,-1);
    elem.setAttribute("isactive",'true');
    document.getElementById("extra_components_"+elem.getAttribute("plain_id")).setAttribute("style","border: 2px solid #5fe46a;");
    addChaarcteristics(elem.getAttribute("plain_id"));
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(elem.getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price+addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    changeIngInfo(elem.getAttribute("plain_id"),-1);
  }
  else
  {
    elem.setAttribute("isactive",'false');
    document.getElementById("extra_components_"+elem.getAttribute('plain_id')).setAttribute("style","border: 2px solid #fff;");
    decreaseCharacteristics(elem.getAttribute("plain_id"));
    var price = parseFloat(document.getElementById("itogvalue").getAttribute('value'));
    var addprice =  (Number(elem.getAttribute('value')));
    document.getElementById("itogvalue").setAttribute('value',price-addprice);
    var itog = document.getElementById("itogvalue").getAttribute('value');
    val1 = parseFloat(itog);
    document.getElementById("itogvalue").textContent="Итоговая стоимость: "+val1+" ₽";
    document.getElementById("ing_"+ingid).remove();
    document.getElementById("ing_image_"+ingname).remove();
  }
}