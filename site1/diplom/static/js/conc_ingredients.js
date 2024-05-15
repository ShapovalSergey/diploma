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
    button.onclick=function(){addConcIng(name);};
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
        field.innerHTML='';
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

  


function addConcIng(name)
{
  alert(name);
}