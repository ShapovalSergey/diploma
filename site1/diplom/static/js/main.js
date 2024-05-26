function gotoConstructor()
{
    document.location.href+="constructor";
}

function gotoOrders()
{
    document.location.href+="orders";
}

function gobacktoOrders()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/orders";
}

function gotoCakes()
{
    document.location.href+="cakes";
}

function gotoIngredients()
{
    document.location.href+="ingredients";
}

function gotoConcIngredients()
{
    document.location.href+="concingredients";
}

function gotoParameteres()
{
    document.location.href+="parameters";
}

function gotomain()
{
    var local = location.pathname.split("/");
    document.location.href=local[0]+"/";
}

