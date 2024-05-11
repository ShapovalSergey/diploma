function showPopup()
{
    document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:block');
    document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:block');
    const p = document.getElementById("popup");
    p.style.transform=`translateY(70%)`
}
function closePopup()
{
    document.getElementById("userFile").setAttribute('oldImage',"-1");
    document.getElementById("userFile").value="";
    document.getElementById("cake_name").setAttribute('oldName',"");
    document.getElementsByClassName('save_cake_button')[0].setAttribute('onclick',"savenewCake()");
    document.getElementById("cake_name").value="";
    document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:none');
    document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:none');
}

function savenewCake()
{
    var name=document.getElementById("cake_name").value;
    if (name=="")
    {
        alert("Не введено название торта");
    }
    else
    {
        check_cake_name(name,"new")
    }
}

function addCake(name)
{
    $.ajax({
        url: "/get-cake-id/",
        type: "GET",
        dataType: "json",
        async: false,
        data:{
            'name':name,
          },
        success: (data) => {
            const id=data['id'];
            const img=data['img'];
            const rootDiv = document.getElementsByClassName("cake_type_field");
            const elementDiv = document.createElement("div");
            const TextDiv = document.createElement("div");
            const ImageDiv = document.createElement("div");
            const elementImg = document.createElement("img");
            elementDiv.classList.add('cake_type_card');
            elementDiv.onclick=function(){gotoCake(id);}
            elementDiv.setAttribute("id",'cake_'+id);
            elementDiv.setAttribute("plain_id",id);
            ImageDiv.classList.add('cake_type_card_image');
            elementImg.classList.add('image');
            elementImg.setAttribute("id",'card_image_'+id);
            elementImg.setAttribute("src",'static/images/cakes/'+img);
            TextDiv.classList.add('button_text');
            TextDiv.textContent=name;
            TextDiv.setAttribute("id",'card_text_'+id);
            ImageDiv.appendChild(elementImg);
            elementDiv.appendChild(ImageDiv);
            elementDiv.appendChild(TextDiv);
            rootDiv[0].appendChild(elementDiv);
        },
        error: (error) => {
            console.log(error);
        }
      });
}

function gotoCake(id)
{
    $.ajax({
        url: "/get-cake-info/",
        type: "GET",
        dataType: "json",
        async: false,
        data:{
            'id':id,
          },
        success: (data) => {
            const name=data['name'];
            const img=data['img'];
            document.getElementsByClassName("add_cake_back")[0].setAttribute("style",'display:block');
            document.getElementsByClassName("add_cake_window")[0].setAttribute("style",'display:block');
            const p = document.getElementById("popup");
            p.style.transform=`translateY(70%)`
            document.getElementsByClassName('checkbox_text')[0].style.visible='False';
            document.getElementById("cake_name").value=name;
            const myFile = new File(['Hello World!'], img, {
                type: 'text/plain',
                lastModified: new Date(),
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(myFile);
            document.getElementById("userFile").files = dataTransfer.files;
            document.getElementById("userFile").setAttribute('oldImage',img);
            document.getElementById("cake_name").setAttribute('oldName',name);
            document.getElementsByClassName('save_cake_button')[0].setAttribute('onclick',"changeCake("+id+")");
        },
        error: (error) => {
            console.log(error);
        }
      });
}

function changeCake(id)
{
    var name=document.getElementById("cake_name").value;
    if (name=="")
    {
        alert("Не введено название торта");
    }
    else
    {
        check_cake_name(name,id)
    }
}

function changeCakeCard(id,name,img_name)
{
    text_card=document.getElementById("card_text_"+id);
    image_card=document.getElementById("card_image_"+id);
    text_card.textContent=name;
    image_card.setAttribute("src",'static/images/cakes/'+img_name);
}

function check_cake_name(name,id)
{
    img_del=document.getElementById("userFile").getAttribute('oldImage');
    old_name=document.getElementById("cake_name").getAttribute('oldName')
    $.ajax({
        url: "/check-cake-name/",
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
                        url: "/deletefile/",
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
                if (img_name=="") img_name="cake_"+id+".jpg";
                else img_name="cake_"+id+"."+img_name;
                file = document.getElementById("userFile").files[0];
                let formData = new FormData();
                formData.append('photo', file);
                formData.append('img_name', img_name);
                formData.append('name', name);
                formData.append('id', id);
                formData.append('isFileChanged', isFileChanged);

                $.ajax({
                    url: "/savefile/",
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
                console.log(id)
                if(id=="new") 
                {
                    addCake(name);
                }
                else 
                {
                    changeCakeCard(id,name,img_name);
                }
                closePopup();
            }
        },
        error: (error) => {
            console.log(error);
        }
      });
}
