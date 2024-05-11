function addChar()
{
    const new_id=document.getElementById("new").value; 
    const rootDiv = document.getElementsByClassName("chars_field");
    const elementDiv = document.createElement("div");
    const elementInput = document.createElement("input");
    const deleteDiv = document.createElement("div");
    const elementImg = document.createElement("img");
    elementDiv.classList.add('chars_param');
    deleteDiv.classList.add('closebtn');
    elementInput.classList.add('inp');
    elementDiv.setAttribute("id",'param_new_'+new_id);
    deleteDiv.onclick=function(){deleteParameter('new_'+new_id);}
    elementInput.setAttribute("type",'text');
    elementInput.setAttribute("id",'input_new_'+new_id);
    elementInput.setAttribute("plain_id",'new');
    elementInput.setAttribute("value",'');
    elementImg.setAttribute("src",'static/images/close-button.png');
    deleteDiv.appendChild(elementImg);
    elementDiv.appendChild(elementInput);
    elementDiv.appendChild(deleteDiv);
    rootDiv[0].appendChild(elementDiv);
    document.getElementById("new").setAttribute("value",parseInt(new_id)+1)
    document.getElementById("saved").setAttribute("value",0)
}

function gotomaincheck()
{
    check=document.getElementById("saved").value;
    if(check==0)
    {
    if (confirm("У вас остались несохраненные изменения. Нажмите \"отмена\" и сохраните изменения или нажмите \"ок\", чтобы выйти без сохранения."))
    {
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/";
    }
    }
    else
    {
        var local = location.pathname.split("/");
        document.location.href=local[0]+"/"; 
    }
}

function deleteParameter(id)
{
    $.ajax({
        url: "/check-param-deletion/",
        type: "GET",
        dataType: "json",
        async: false,
        data:{
            'id':id,
          },
        success: (data) => {
            var check=data['check'];
            if (check==1)
            {
                if (confirm("Данное свойство используется в некоторых ингредиентах. Вы точно хотите удалить данный параметр?"))
                {
                    if (confirm("Вы точно хотите удалить свойство?"))
                    {
                        hideParam(id);
                    }
                }
            }
            else 
            {
                if (confirm("Вы точно хотите удалить свойство?"))
                    {
                        hideParam(id);
                    }
            }
        },
        error: (error) => {
            console.log(error);
        }
      });
}

function hideParam(id)
{
    console.log("param_"+id);
    let param_row=document.getElementById("param_"+id);
    param_row.innerHTML='';
    param_row.remove();
    if (id.toString().split('_')[0]!="new")
    {
    $.ajax({
        url: "/delete-params/",
        type: "POST",
        dataType: "json",
        async: false,
        data:{
        'id':id,
        },
        success: (data) => {
            console.log(success);
        },
        error: (error) => {
            console.log(error);
        }
    });
    }
}

function saveChars ()
{
    const ParameteresName = document.getElementsByClassName("inp");
    var counter=0;
    for (var i = 0; i < ParameteresName.length; i++)
    {
        if (ParameteresName[i].value=="")
        {
            counter++;
        }
    }
    if (counter>0)
    {
        alert("Пустая характеристика");
    }
    else
    {
        if (confirm("Вы точно хотите сохранить изменения?"))
        {
            ids=[]
            names=[]
            for (var i = 0; i < ParameteresName.length; i++)
            {
                if (ParameteresName[i].value!=ParameteresName[i].getAttribute("value"))
                {
                    names.push(ParameteresName[i].value);
                    ids.push(ParameteresName[i].getAttribute("plain_id"));
                }
            }
            
        $.ajax({
            url: "/save-param-changes/",
            type: "POST",
            dataType: "json",
            async: false,
            data:{
            'names': names,
            'ids':ids,
            },
            success: (data) => {
            
            },
            error: (error) => {
                console.log(error);
            }
        });
        document.getElementById("saved").setAttribute("value",1);
        alert("Сохранено");
        }
    }
}