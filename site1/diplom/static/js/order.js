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
    document.location.href=local[0]+"/constructor/free_"+id_dish;
}

function ChangeCakeDish(id_dish,id_ct)
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/constructor/constructor_"+id_ct+"_"+id_dish;
}