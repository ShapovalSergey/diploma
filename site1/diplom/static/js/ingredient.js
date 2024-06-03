function gotoIngredients()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/"+local[2];
}

function gotoIngredientInfo(id)
{
    document.location.href+="/ingredient_"+id;
}

function SaveIngredient(id)
{
    var name=document.getElementById("input_"+id).value;
    if (name=="")
    {
        alert("Отсутствует название ингредиента");
    }
    else
    {
        const visible = document.getElementById('isVisible');
        const essential = document.getElementById('isEssential');
        const construct = document.getElementById('isConstruct');
        var isVisible = visible.checked;
        var isEssential = essential.checked;
        var isConstruct = construct.checked;
        let param_ids=[];
        let param_isUsed=[];
        let cakes_ids=[];
        let cakes_isUsed=[];
        const params=document.getElementsByClassName("param_input");
        const cakes=document.getElementsByClassName("cake_input");
        for (var i = 0; i < params.length; i++)
        {
            param_ids.push(params[i].getAttribute("plain_id"));
            param_isUsed.push(params[i].checked);
            console.log(param_ids[i]);
        }
        for (var i = 0; i < cakes.length; i++)
        {
            cakes_ids.push(cakes[i].getAttribute("plain_id"));
            cakes_isUsed.push(cakes[i].checked);
        }

        img_del=document.getElementById("userFile").getAttribute('oldImage');
        old_name=document.getElementById("input_"+id).getAttribute('oldName');
        $.ajax({
            url: "/check-ing-name/",
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
                    img_name = document.getElementById("userFile").value;
                    img_name=img_name.split('\\').pop();
                    isFileChanged=false;
                    if((img_del!=img_name)&&(id!="new"))
                    {
                        $.ajax({
                            url: "/deleteingfile/",
                            type: "POST",
                            dataType: "json",
                            async: false,
                            data:{
                            'img_del':img_del,
                            },
                            success: (data) => {
                                console.log(success);
                            },
                            error: (error) => {
                                console.log(error);
                            }
                        });
    
                        isFileChanged=true;
                    }
                    if (id=="new") isFileChanged=true;
                    img_name=img_name.split('\\').pop().split('/').pop().split('.').pop();
                    if (img_name=="") img_name="ing_"+id+".png";
                    else img_name="ing_"+id+"."+img_name;
                    file = document.getElementById("userFile").files[0];
                    let formData = new FormData();
                    formData.append('photo', file);
                    formData.append('img_name', img_name);
                    formData.append('name', name);
                    formData.append('id', id);
                    formData.append('isFileChanged', isFileChanged);
                    formData.append('param_ids', param_ids);
                    formData.append('param_isUsed', param_isUsed);
                    formData.append('cakes_ids', cakes_ids);
                    formData.append('cakes_isUsed', cakes_isUsed);
                    formData.append('isEssential', isEssential);
                    formData.append('isVisible', isVisible);
                    formData.append('isConstruct', isConstruct);
    
                    $.ajax({
                        url: "/saveingfile/",
                        type: "POST",
                        processData: false,
                        contentType: false,
                        async: false,
                        data:formData,
                        success: (data) => {
                            console.log(id);
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                    gotoIngredients();
                }
            },
            error: (error) => {
                console.log(error);
            }
          });
        
    }
}


function DeleteIngredient(id)
{
    if (confirm("Вы точно хотите удалить ингредиент?\n(Данное действие нельзя отменить)"))
    {
        $.ajax({
            url: "/delete-ing/",
            type: "POST",
            dataType: "json",
            async: false,
            data:{'id':id},
            success: (data) => {
                console.log(id);
            },
            error: (error) => {
                console.log(error);
            }
        });
        var local = location.pathname.split("/");
        document.location.href=local[0]+"/"+local[1];
    }
}

function CheckParam(id)
{
    var inp = document.getElementById("param_"+id);
    if (inp.checked)
    {
        inp.checked=false;
    }
    else
    {
        inp.checked=true;
    }
}

function CheckCake(id)
{
    var inp = document.getElementById("cake_"+id);
    if (inp.checked)
    {
        inp.checked=false;
    }
    else
    {
        inp.checked=true;
    }
}