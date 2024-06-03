function DeleteDish(id)
{
    if (confirm("Вы точно хотите удалить блюдо?\n(Данное действие нельзя отменить)"))
        {
            $.ajax({
                url: "/delete-dish/",
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
            document.getElementById("dish_row_"+id).remove();
        }
}

function ChangeFreeDish(id_dish)
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/constructor/free_"+id_dish;
}

function ChangeCakeDish(id_dish,id_ct)
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/"+local[1]+"/constructor/constructor_"+id_ct+"_"+id_dish;
}

function CreatenewOrder(id)
{
    document.location.href+="/order_"+id;
}

$(".small-custom-select").each(function() {
    var classes = $(this).attr("class"),
      id = $(this).attr("id"),
      name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template +=
      '<span class="small-custom-select-trigger">' +
      $(this).attr("placeholder") +
      "</span>";
    template += '<div class="small-custom-options">';
    $(this)
      .find("option")
      .each(function() {
        template +=
          '<span class="small-custom-option ' +
          $(this).attr("class") +
          '" data-value="' +
          $(this).attr("value") +
          '">' +
          $(this).html() +
          "</span>";
      });
    template += "</div></div>";
    $(this).wrap('<div class="small-custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
  });
  $(".small-custom-option:first-of-type").hover(
    function() {
      $(this)
        .parents(".small-custom-options")
        .addClass("option-hover");
    },
    function() {
      $(this)
        .parents(".small-custom-options")
        .removeClass("option-hover");
    }
  );
  $(".small-custom-select-trigger").on("click", function() {
    $("html").one("click", function() {
      $(".small-custom-select").removeClass("opened");
    });
    $(this)
      .parents(".small-custom-select")
      .toggleClass("opened");
    event.stopPropagation();
  });
  $(".small-custom-option").on("click", function() {
    $(this)
      .parents(".small-custom-select-wrapper")
      .find("select")
      .val($(this).data("value"));
    $(this)
      .parents(".small-custom-options")
      .find(".small-custom-option")
      .removeClass("selection");
    $(this).addClass("selection");
    $(this)
      .parents(".small-custom-select")
      .removeClass("opened");
    $(this)
      .parents(".small-custom-select")
      .find(".small-custom-select-trigger")
      .text($(this).text());
  });

  function CheckDish(id)
{
    var inp = document.getElementById("input_value_"+id);
    const field = document.getElementById("input_"+id);
    if (inp.checked)
    {
        field.style.visibility='hidden';
        inp.checked=false;
    }
    else
    {
        field.style.visibility='visible';
        inp.checked=true;
    }
}

inps = document.getElementsByClassName("checkb");
for (var i = 0; i < inps.length; i++) {
    inps[i].change = function(e) 
    {
        id = inps[i].getAttribute("plain_id");
        field = document.getElementById("input_"+id);
        if(this.checked) {
            field.style.visibillity="true";
        }
        else
        {
            field.style.visibillity="false";
        }
    };
  } 

  function SaveOrder(id)
  {
    var name = document.getElementById("input_name").value;
    var phone = document.getElementById("input_phone").value;
    var status = document.getElementById("status_type").value;
    var date = document.getElementById("input_date").value;
    var checkboxes = document.getElementsByClassName("checkb");
    var cb_count=0;
    var mistakes_count=0;
    for (var i = 0; i < checkboxes.length;i++)
    {
        if(checkboxes[i].checked) 
            {
                cb_count++;
                if ((isNaN(document.getElementById("input_"+checkboxes[i].getAttribute("plain_id")).value))||(document.getElementById("input_"+checkboxes[i].getAttribute("plain_id")).value==''))
                {
                    mistakes_count++;
                }
                else if (parseInt(document.getElementById("input_"+checkboxes[i].getAttribute("plain_id")).value)<1) mistakes_count++;
            }
    }
    if (name=="")
        {
            alert("Отсутствует имя клиента");
        }
        else
        {
            if (phone=="")
                {
                    alert("Отсутствует номер телефона клиента");
                }
                else
                {
                    if (date=="")
                        {
                            alert("Отсутствует дата");
                        }
                        else
                        {
                            if (cb_count==0)
                                {
                                    alert("Отсутствуют блюда в заказе");
                                }
                                else
                                {
                                    if (mistakes_count!=0)
                                        {
                                            alert("Введено неверное количество блюд");
                                        }
                                        else
                                        {
                                            let cakes_ids=[];
                                            let cakes_values=[];
                                            for (var i = 0; i < checkboxes.length;i++)
                                                {
                                                    if (checkboxes[i].checked)
                                                        {
                                                            val = document.getElementById("input_"+checkboxes[i].getAttribute("plain_id")).value;
                                                            cakes_ids.push(checkboxes[i].getAttribute("plain_id"));
                                                            cakes_values.push(val);
                                                        }
                                                }

                                                let formData = new FormData();
                                                formData.append('name', name);
                                                formData.append('phone', phone);
                                                formData.append('id', id);
                                                formData.append('date', date);
                                                formData.append('status', status);
                                                formData.append('cakes_ids', cakes_ids);
                                                formData.append('cakes_values', cakes_values);
                                
                                                $.ajax({
                                                    url: "/saveorder/",
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
                                                gobacktoOrders();
                                        }
                                }
                        }
                }
        }
  }

  function CheckOrder(id)
  {
    document.location.href+="/order_"+id;
  }

  function DeleteOrder(id)
  {
    if (confirm("Вы точно хотите удалить заказ?\n(Данное действие нельзя отменить)"))
        {
            $.ajax({
                url: "/delete-order/",
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
            gobacktoOrders();
        }
}