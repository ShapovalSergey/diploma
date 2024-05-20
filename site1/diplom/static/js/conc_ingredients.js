$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template +=
      '<span class="custom-select-trigger">' +
      $(this).attr("placeholder") +
      "</span>";
    template += '<div class="custom-options">';
    $(this)
      .find("option")
      .each(function() {
        template +=
          '<span class="custom-option ' +
          $(this).attr("class") +
          '" data-value="' +
          $(this).attr("value") +
          '">' +
          $(this).html() +
          "</span>";
      });
    template += "</div></div>";
  
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".custom-option:first-of-type").hover(
    function() {
      $(this)
        .parents(".custom-options")
        .addClass("option-hover");
    },
    function() {
      $(this)
        .parents(".custom-options")
        .removeClass("option-hover");
    }
  );
  $(".custom-select-trigger").on("click", function() {
    $("html").one("click", function() {
      $(".custom-select").removeClass("opened");
    });
    $(this)
      .parents(".custom-select")
      .toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    const button = document.getElementById("add_ci");
    const name = $(this).text();
    button.style="visibility: visible;";
    const field = document.getElementById("ci_field");
    field.style="visibility: visible;";



    $.ajax({
      url: "/get-ingridients/",
      type: "GET",
      dataType: "json",
      async: false,
      data:{
          'name':name,
        },
      success: (data) => {
        let ci_names=data['ci_names'];
        let ci_ids=data['ci_ids'];
        let ci_images=data['ci_images'];
        var id = data['id'];
        field.innerHTML='';
        button.onclick=function(){addConcIng(id);};
        for (var i = 0; i < ci_ids.length; i++)
        {
          const element = document.createElement("div");
          element.classList.add("conc_ing_row_field");
          const id = ci_ids[i];
          element.onclick=function(){gotoConcreteIngridient(id);}
          const elem_text = document.createElement("div");
          elem_text.classList.add("ing_card_text");
          const text = ci_names[i];
          elem_text.textContent=text;
          elem_image_div = document.createElement("div");
          elem_image_div.classList.add("ing_card_image");
          elem_image = document.createElement("img");
          elem_image.classList.add("image");
          const image = ci_images[i];
          elem_image.setAttribute("src",'/static/images/concingridients/'+image);
          elem_image_div.appendChild(elem_image)
          element.appendChild(elem_text);
          element.appendChild(elem_image_div);
          field.appendChild(element);
        }



      },
      error: (error) => {
          console.log(error);
      }
    });
    $(this)
      .parents(".custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".custom-options")
      .find(".custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this)
      .parents(".custom-select")
      .removeClass("opened");
    $(this)
      .parents(".custom-select")
      .find(".custom-select-trigger")
      .text($(this).text());
  });

function gotoIngredients()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1];
}

function gotoConcreteIngridient(id)
{
  document.location.href+="/"+id;
}

function addConcIng(id)
{
  document.location.href+="/"+id+"/new";
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

function SaveConcIngredient(id)
{
  var image = document.getElementById("userFile").value;
  var image_ready = document.getElementById("VisibleUserFile").value;
  var name=document.getElementById("input_"+id).value;
    if (name=="")
    {
        alert("Отсутствует название ингредиента");
    }
    else
    {
    let inps = document.getElementsByClassName("inp");
    var check = 0;
    let names=[];
    let values=[];
    for(var i = 0; i < inps.length; i++)
    {
      if((inps[i].value=='')||(inps[i].value=='undefined'))
      {
        names.push(inps[i].getAttribute('name'));
        check++;
      }
      values.push(inps[i].value);
    }
    var check1 = 0;
    let names1=[];
    for(var i = 0; i < inps.length; i++)
    {
      if((!IsFloat_mine(inps[i].value))&&(inps[i].getAttribute('name')!='Название'))
      {
        names1.push(inps[i].getAttribute('name'));
        check1++;
      }
    }
    if ((image=='')||(image=='C:\\fakepath\\')) alert("Не выбрано изображение ингредиента");
    else{
    if ((image_ready=='')||(image_ready=='C:\\fakepath\\')) alert("Не выбрано отображаемое изображение ингредиента");
    else{
    if (check!=0) alert("Не введено значение параметра: "+names[0]);
    else{
    if (check1!=0) alert("Неверный формат значения параметра: "+names1[0]+"\n(Необходимо число)");
    else
    {
      ing_id=document.getElementById("id_ing").value;
      let values=[];
      let ids=[];
      for(var i = 0; i < inps.length; i++)
      {
        values.push(inps[i].value);
        ids.push(inps[i].getAttribute('plain_id'));
      }
      
      



      img_del=document.getElementById("userFile").getAttribute('oldImage');
      vis_img_del=document.getElementById("VisibleUserFile").getAttribute('oldImage');
      old_name=document.getElementById("input_"+id).getAttribute('oldName');
      $.ajax({
          url: "/check-concing-name/",
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
                          url: "/deleteconcingfile/",
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
                  img_name=img_name.split('\\').pop().split('/').pop().split('.').pop();
                  if (img_name=="") img_name="ing_"+id+".png";
                  else img_name="ing_"+id+"."+img_name;
                  file = document.getElementById("userFile").files[0];
                  /*Удаление отображаемой в конструкторе картинки*/
                  vis_img_name = document.getElementById("VisibleUserFile").value;
                  vis_img_name=vis_img_name.split('\\').pop();
                  isVisibleFileChanged=false;
                  if((vis_img_del!=vis_img_name)&&(id!="new"))
                  {
                      $.ajax({
                          url: "/deleteconcingvisfile/",
                          type: "POST",
                          dataType: "json",
                          async: false,
                          data:{
                          'img_del':vis_img_del,
                          },
                          success: (data) => {
                              console.log(success);
                          },
                          error: (error) => {
                              console.log(error);
                          }
                      });
  
                      isVisibleFileChanged=true;
                  }
                  vis_img_name=vis_img_name.split('\\').pop().split('/').pop().split('.').pop();
                  if (vis_img_name=="") vis_img_name="ing_"+id+".png";
                  else vis_img_name="ing_"+id+"."+vis_img_name;
                  file1 = document.getElementById("VisibleUserFile").files[0];
                  /*Сохранение данных*/
                  let formData = new FormData();
                  formData.append('photo', file);
                  formData.append('visible_photo', file1);
                  formData.append('img_name', img_name);
                  formData.append('vis_img_name', vis_img_name);
                  formData.append('name', name);
                  formData.append('id', id);
                  formData.append('isFileChanged', isFileChanged);
                  formData.append('isVisibleFileChanged', isVisibleFileChanged);
                  formData.append('param_ids', ids);
                  formData.append('param_values', values);
                  formData.append('ing_id', ing_id);
                  $.ajax({
                      url: "/saveconcingfile/",
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
}
}
}
}

function DeleteConcIngredient(id)
{
  if (confirm("Вы точно хотите удалить ингредиент?\n(Данное действие нельзя отменить)"))
    {
        $.ajax({
            url: "/delete-conc-ing/",
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
        gotoIngredients();
    }
}









function IsFloat_mine(string)
{
  var str=string.split(/[,.]/);
  var numbers1 = 0;
  var numbers2 = 0;
  for(var i = 0; i < str[0].length; i++)
  {
    if(!isNaN(str[0][i])) numbers1++;
  }
  if(str.length>1)
  {
  for(var i = 0; i < str[1].length; i++)
  {
    if(!isNaN(str[1][i])) numbers2++;
  }
  if((str.length>2)||(numbers1!=str[0].length)||(numbers2!=str[1].length))
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  else 
  {
    if((str.length>2)||(numbers1!=str[0].length))
    {
      return false;
    }
    else
    {
      return true;
    }
  }
}