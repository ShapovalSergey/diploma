from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings as django_settings
import os
import json
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse, FileResponse, HttpResponseRedirect
from .models import Characteristic
from .models import Ingredients, ConcreateIngredients
from .models import IngChar
from .models import IngCT, CIChar
from .models import CIChar
from .models import User, Token
from .models import CakeType
from .models import Dish, DishIng
from .models import Order,OrderStatus, OrderDish
import string
import secrets
# Create your views here.
def enter(request): 
    return render(request, "enter.html")  

def main(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            return render(request, "main.html") 
        else:
            return HttpResponseRedirect('/enter')  

def gotoconstructor(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            cake_types=CakeType.objects.all()
            ct_all = {}
            ct_info=[]
            for ct in cake_types:
                ct_all={'name':ct.name,'id':ct.id,'image':ct.image}
                ct_info.append(ct_all)
            return render(request, "constructor.html",{"ct_info": ct_info,}) 
        else:
            return HttpResponseRedirect('/enter')  

def gotoorders(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            st = OrderStatus.objects.get(name="В работе")
            orders = Order.objects.filter(status=st).order_by('order_date')
            dishes = Dish.objects.all()
            return render(request, "orders.html",{"orders": orders,"dishes":dishes}) 
        else:
            return HttpResponseRedirect('/enter')  

def gotoorderinfo(request,order_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            status=OrderStatus.objects.all()
            status_all = {}
            status_info=[]
            dishes = Dish.objects.all()
            name=''
            date=''
            current_status='Выберите статус заказа'
            phone=''
            cake_all=[]
            cake_info={}
            if order_id!='new':
                order=Order.objects.get(id=order_id)
                name = order.customer_name
                phone = order.phone
                date=order.order_date
                current_status=order.status.name
                for d in dishes:
                    if OrderDish.objects.filter(Id_order=order,Id_dish=d).count()==0:
                        if d.Id_cake_type==None:
                            cake_info={"id":d.id,"value":0,"isUsed":False,"ctname":"Свободный","name":d.name}
                        else:
                            cake_info={"id":d.id,"value":0,"isUsed":False,"ctname":d.Id_cake_type.name,"name":d.name}
                    else:
                        if d.Id_cake_type==None:
                            cake_info={"id":d.id,"value":OrderDish.objects.get(Id_order=order,Id_dish=d).Value,"isUsed":True,"ctname":"Свободный","name":d.name}
                        else:
                            cake_info={"id":d.id,"value":OrderDish.objects.get(Id_order=order,Id_dish=d).Value,"isUsed":True,"ctname":d.Id_cake_type.name,"name":d.name}
                    cake_all.append(cake_info)
            else:
                for d in dishes:
                    if d.Id_cake_type==None:
                        cake_info={"id":d.id,"value":'',"isUsed":False,"ctname":"Свободный","name":d.name}
                    else:
                        cake_info={"id":d.id,"value":'',"isUsed":False,"ctname":d.Id_cake_type.name,"name":d.name}
                    cake_all.append(cake_info)
            for s in status:
                status_all={'name':s.name,'id':s.id,}
                status_info.append(status_all)
            print(dishes)
            return render(request, "order_info.html",{"status_info": status_info,"id":order_id,"dishes":dishes,"name":name,"date":date,"current_status":current_status,"phone":phone,"cake_all":cake_all,}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotocakes(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            cake_types=CakeType.objects.all()
            ct_all = {}
            ct_info=[]
            for ct in cake_types:
                ct_all={'name':ct.name,'id':ct.id,'image':ct.image}
                ct_info.append(ct_all)
            return render(request, "cakes.html",{"ct_info": ct_info,}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoingredients(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ing_types=Ingredients.objects.all()
            ing_all = {}
            ing_info=[]
            for i in ing_types:
                ing_all={'name':i.name,'id':i.id,'image':i.image,'IsEssential':i.IsEssential,'IsVisible':i.IsVisible}
                ing_info.append(ing_all)
            return render(request, "ingredients.html",{"ing_info": ing_info,}) 
        else:
            return HttpResponseRedirect('/enter')  

def gotoconcingredients(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ing_types=Ingredients.objects.all()
            ing_all = {}
            ing_info=[]
            for i in ing_types:
                ing_all={'name':i.name,'id':i.id,'image':i.image,'IsEssential':i.IsEssential,'IsVisible':i.IsVisible}
                ing_info.append(ing_all)
            return render(request, "concingredients.html",{"ing_info": ing_info,}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoparameters(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            param=Characteristic.objects.all()
            param_all = {}
            param_info=[]
            for p in param:
                param_all={'name':p.name,'id':p.id}
                param_info.append(param_all)
            
            return render(request, "parameters.html",{"param_info": param_info, "saved":1,}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoingredientinfo(request,ing_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            cakes = CakeType.objects.all()
            parametres = Characteristic.objects.all()
            isVisible = False
            isEssential = False
            isConstruct = False
            name = ""
            image = ""
            cakes_all = {}
            parametres_all = {}
            cakes_info = []
            parametres_info = []
            if ing_id=="new":
                for c in cakes:
                    cakes_all={'name':c.name,'id':c.id,'isUsed':False,'image':c.image}
                    cakes_info.append(cakes_all) 
                for p in parametres:
                    parametres_all={'name':p.name,'id':p.id,'isUsed':False}
                    parametres_info.append(parametres_all) 
            else: 
                ing = Ingredients.objects.get(id=ing_id)
                isEssential=ing.IsEssential
                isVisible=ing.IsVisible
                isConstruct=ing.IsConstruct
                name=ing.name
                image=ing.image
                for c in cakes:
                    if IngCT.objects.filter(Id_ing=ing_id,Id_cake_type=c.id).count()==0:
                        cakes_all={'name':c.name,'id':c.id,'isUsed':False,'image':c.image}
                    else: 
                        cakes_all={'name':c.name,'id':c.id,'isUsed':True,'image':c.image}
                    cakes_info.append(cakes_all) 
                for p in parametres:
                    if IngChar.objects.filter(Id_ing=ing_id,Id_char=p.id).count()==0:
                        parametres_all={'name':p.name,'id':p.id,'isUsed':False}
                    else:
                        parametres_all={'name':p.name,'id':p.id,'isUsed':True}
                    parametres_info.append(parametres_all)        
                
            
            return render(request, "ing_info.html",{"parametres_info": parametres_info, "cakes_info":cakes_info,'id':ing_id,"isEssential":isEssential,"isVisible":isVisible,"isConstruct":isConstruct,"name":name,"image":image}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoaddconcing(request,ing_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ing = Ingredients.objects.get(id=ing_id)
            ingch=IngChar.objects.filter(Id_ing=ing_id)
            ingch_all = {}
            ingch_info = []
            for i in ingch:
                name = Characteristic.objects.get(id=i.Id_char.id).name
                ingch_all={"id":i.Id_char.id,"name":name}
                ingch_info.append(ingch_all)
            return render(request, "concing_info.html",{"ing_id": ing_id,"id":"new", "isVisible":ing.IsVisible,"ingch_info":ingch_info}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoconcing(request,ci_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ci=ConcreateIngredients.objects.get(id=ci_id)
            Name=ci.name
            image=ci.image
            visibleimage=ci.image_ready
            Value=ci.Value
            ing = Ingredients.objects.get(id=ci.Id_ing.id)
            ingch=IngChar.objects.filter(Id_ing=ci.Id_ing.id)
            ingch_all = {}
            ingch_info = []
            for i in ingch:
                name = Characteristic.objects.get(id=i.Id_char.id).name
                if CIChar.objects.filter(Id_conc_ing=ci,Id_char=i.Id_char).count()!=0:
                    value = CIChar.objects.get(Id_conc_ing=ci,Id_char=i.Id_char).Value
                else: 
                    value = 'undefined'
                ingch_all={"id":i.Id_char.id,"name":name,"value":value}
                ingch_info.append(ingch_all)
            return render(request, "concing_info.html",{"ing_id": ci.Id_ing.id,"id":ci_id, "isVisible":ing.IsVisible,"ingch_info":ingch_info,"name":Name,"image":image,"visibleimage":visibleimage,"value":Value}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotofreeconstructor(request,dish_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ing=Ingredients.objects.filter(IsConstruct=True)
            ci = ConcreateIngredients.objects.all()
            ci_count_array=[]
            ci_param_info=[]
            name=0
            if dish_id!='new':
                name = Dish.objects.get(id=dish_id).name
            for i in ing:
                ci_count_array.append({"id":i.id,"count":ConcreateIngredients.objects.filter(Id_ing=i).count()})
            for c in ci:
                if c.Id_ing.IsConstruct==True:
                    id=c.id 
                    param_info=[]
                    params=CIChar.objects.filter(Id_conc_ing=c)
                    for p in params:
                        param_id=p.Id_char.id 
                        param_name=p.Id_char.name
                        param_value=p.Value
                        param_info.append({"param_id":param_id,"param_name":param_name,"param_value":param_value})
                    ci_param_info.append({"id":id,"param":param_info})

            return render(request, "free_constructor.html", {"ing": ing, "ci":ci,"ci_count_array":ci_count_array,"ci_param_info":json.dumps(ci_param_info,ensure_ascii=False),"id":dish_id,"name":name}) 
        else:
            return HttpResponseRedirect('/enter')  
    
def gotoconstructcake(request,cake_id,dish_id):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            ingct = IngCT.objects.filter(Id_cake_type=CakeType.objects.get(id=cake_id))
            id_ing=[]
            for i in ingct:
                id_ing.append(i.Id_ing.id)
            ing=Ingredients.objects.filter(id__in=id_ing)
            ci = ConcreateIngredients.objects.all()
            dcing = []
            ding=[]
            dish_name=''
            if dish_id !='new':
                dishing = DishIng.objects.filter(Id_dish=Dish.objects.get(id=dish_id))
                for d in dishing:
                    if d.Id_conc_ing.Id_ing.IsEssential==True:
                        ding.append({"id":d.Id_conc_ing.id,"ingname":d.Id_conc_ing.Id_ing.name})
                    else:
                        dcing.append({"id":d.Id_conc_ing.id})
                dish_name=Dish.objects.get(id=dish_id).name
            ci_count_array=[]
            ci_param_info=[]
            for i in ing:
                ci_count_array.append({"id":i.id,"count":ConcreateIngredients.objects.filter(Id_ing=i).count()})
            for c in ci:
                if IngCT.objects.filter(Id_cake_type=CakeType.objects.get(id=cake_id),Id_ing=c.Id_ing).count()>0:
                    id=c.id 
                    param_info=[]
                    params=CIChar.objects.filter(Id_conc_ing=c)
                    img = c.image_ready
                    ingname = c.Id_ing.name
                    name = c.name
                    ingid = c.Id_ing.id
                    for p in params:
                        param_id=p.Id_char.id 
                        param_name=p.Id_char.name
                        param_value=p.Value
                        param_info.append({"param_id":param_id,"param_name":param_name,"param_value":param_value})
                    ci_param_info.append({"id":id,"param":param_info,"img":img,"ingname":ingname,"name":name,"ingid":ingid})

            return render(request, "cake_constructor.html", {"ing": ing, "ci":ci,"ci_count_array":ci_count_array,"ci_param_info":json.dumps(ci_param_info,ensure_ascii=False),"id":cake_id, "dish_id":dish_id,"ding":json.dumps(ding),"name":dish_name,"dcing":json.dumps(dcing)}) 
        else:
            return HttpResponseRedirect('/enter')  

def get_dish(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    id = request.GET.get('id')
                    elem=Dish.objects.get(id=id)
                    ding = DishIng.objects.filter(Id_dish=elem).order_by('Location')
                    name=elem.name
                    ingid = []
                    ingimages = []
                    for d in ding:
                        ingid.append(ConcreateIngredients.objects.only('id').get(name=d.Id_conc_ing.name).id)
                        ingimages.append(ConcreateIngredients.objects.only('image_ready').get(name=d.Id_conc_ing.name).image_ready)
                    return JsonResponse({'id':ingid,'images':ingimages,'name':name })
        else:
            return HttpResponseRedirect('/enter')  
    
def check_param(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    id = request.GET.get('id')
                    try:
                        check_id = int(id)
                        if CIChar.objects.filter(Id_char=check_id).count()==0:
                            check=0
                        else:
                            check=1
                    except ValueError:
                        check=0
                    
                    return JsonResponse({'check':check, })
        else:
            return HttpResponseRedirect('/enter')  
    
def check_name(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    name = request.GET.get('name')
                    id = request.GET.get('id')
                    ct=CakeType.objects.filter(name=name)
                    if ct.count()==0:
                        check=1
                    else:
                        print(ct[0].id)
                        print(id)
                        if id=="new":
                            check=0
                        else:
                            check=1
                    return JsonResponse({'check':check, })        
        else:
            return HttpResponseRedirect('/enter')  
            
def check_ing_name(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    name = request.GET.get('name')
                    id = request.GET.get('id')
                    ing=Ingredients.objects.filter(name=name)
                    if ing.count()==0:
                        check=1
                    else:
                        if id=="new":
                            check=0
                        else:
                            check=1
                    return JsonResponse({'check':check, })   
        else:
            return HttpResponseRedirect('/enter')  
    
def check_dish_name(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    name = request.GET.get("name")
                    id = request.GET.get("id") 
                    dishes = Dish.objects.filter(name=name)
                    if id=='new':
                        check=True
                    else: 
                        if dishes.count()!=0:
                            check=False
                        else: 
                            check=True
                    return JsonResponse({'check':check, }) 
        else:
            return HttpResponseRedirect('/enter')  
    
def getlogpass(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'GET':
            log = request.GET.get('login')
            pas = request.GET.get('password')
            log1=User.objects.filter(login=log)
            usrid=-1
            if log1.count()>0:
                if log1[0].password==pas:
                    pas1=1
                    usrid=User.objects.only('id').get(login=log).id
                else:
                    pas1=0
            else:
                pas1=0
            return JsonResponse({'login':log1.count(),'password':pas1,'id':usrid})

def check_concing_name(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    name = request.GET.get('name')
                    id = request.GET.get('id')
                    ing=ConcreateIngredients.objects.filter(name=name)
                    if ing.count()==0:
                        check=1
                    else:
                        if id=="new":
                            check=0
                        else:
                            check=1
                    return JsonResponse({'check':check, })          
        else:
            return HttpResponseRedirect('/enter')  
    
def get_cake_id(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    name = request.GET.get('name')
                    id=CakeType.objects.get(name=name).id
                    img=CakeType.objects.get(name=name).image
                    return JsonResponse({'id':id,'img':img})     
        else:
            return HttpResponseRedirect('/enter')  
    
def get_cake_info(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    id = request.GET.get('id')
                    cake=CakeType.objects.get(id=id)
                    name=cake.name
                    img=cake.image
                    return JsonResponse({'name':name, 'img': img})   
        else:
            return HttpResponseRedirect('/enter')  
    
def get_ingridients(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'GET':
                    ci_ids = []
                    ci_images = []
                    ci_names = []
                    name = request.GET.get('name')
                    ing=Ingredients.objects.get(name=name)
                    id=ing.id   
                    ci = ConcreateIngredients.objects.filter(Id_ing=ing)
                    for c in ci:
                        ci_ids.append(c.id)
                        ci_images.append(c.image)
                        ci_names.append(c.name)
                    return JsonResponse({'ci_ids':ci_ids,'ci_images':ci_images,'ci_names':ci_names,'id':id})            
        else:
            return HttpResponseRedirect('/enter')  

@csrf_exempt      
def save_param(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'POST':
                    ids= request.POST.getlist('ids[]')
                    names= request.POST.getlist('names[]')  
                    for i in enumerate(ids):
                        if i[1]=="new":
                            char=Characteristic(name=names[i[0]])
                            char.save()
                        else:
                            char=Characteristic.objects.get(id=i[1])
                            char.name=names[i[0]]
                            char.save()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
            
@csrf_exempt      
def delete_param(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'POST':
                    id= request.POST.get('id')
                    char=Characteristic(id=id)
                    char.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def delete_order(request):

        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'POST':
                    id= request.POST.get('id')
                    ord=Order(id=id)
                    ord.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def delete_cake(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
            if is_ajax:
                if request.method == 'POST':
                    id= request.POST.get('id')
                    cake=CakeType(id=id)
                    cake.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
       
@csrf_exempt      
def savefile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                uploaded_file = request.FILES.get('photo')
                img_name= request.POST.get("img_name") 
                name= request.POST.get("name") 
                id=request.POST.get("id") 
                isFileChanged= request.POST.get("isFileChanged") 
                file=default_storage.open('D:\games\diploma\site1\diplom\static\images\cakes\\test_cake.jpg')
                if id=="new":
                    ct=CakeType(name=name)
                    ct.save()
                    ct.image='cake_'+str(ct.id)+"."+img_name.split(".")[1]  
                else:
                    ct=CakeType.objects.get(id=id)
                    ct.name=name
                    ct.image='cake_'+str(id)+"."+img_name.split(".")[1]
                if isFileChanged:
                    if str(uploaded_file)!="None":
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\cakes\cake_'+str(ct.id)+"."+ct.image.split(".")[1], ContentFile(uploaded_file.read()))
                        uploaded_file.close()   
                        ct.image='cake_'+str(ct.id)+"."+img_name.split(".")[1]             
                    else:
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\cakes\cake_'+str(ct.id)+".jpg", file)
                        ct.image='cake_'+str(ct.id)+".jpg"
                ct.save()
                file.close()
                return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def savenewdish(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            newdict = request.POST.dict()
            name=newdict['name']
            id=newdict['id']
            if id == 'new':
                new_dish = Dish(name=name)
                new_dish.save()
            else: 
                new_dish = Dish.objects.get(id=id)
                DishIng.objects.filter(Id_dish=new_dish).delete()
            location = str(newdict['locations']).split(",")
            ids=str(newdict['ids']).split(",")
            for index,i in enumerate(ids):
                new_zap = DishIng(Id_conc_ing=ConcreateIngredients.objects.get(id=int(ids[index])),Id_dish=new_dish,Location=int(location[index]))
                new_zap.save()
            return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  

@csrf_exempt      
def savenewconcretedish(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            newdict = request.POST.dict()
            name=newdict['name']
            id=newdict['id']
            cake_id=newdict['cake_id']
            if id =='new':
                new_dish = Dish(name=name,Id_cake_type=CakeType.objects.get(id=cake_id))
                new_dish.save()
            else:
                new_dish = Dish.objects.get(id=id)
                DishIng.objects.filter(Id_dish=new_dish).delete()
            ids=str(newdict['ids']).split(",")
            for index,i in enumerate(ids):
                new_zap = DishIng(Id_conc_ing=ConcreateIngredients.objects.get(id=int(ids[index])),Id_dish=new_dish,Location=0)
                new_zap.save()
            return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  


@csrf_exempt      
def saveingfile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                uploaded_file = request.FILES.get('photo')
                img_name = request.POST.get("img_name") 
                name = request.POST.get("name") 
                id = request.POST.get("id") 
                isFileChanged = request.POST.get("isFileChanged") 
                param_ids = request.POST.getlist('param_ids')[0].split(',')
                param_isUsed = request.POST.getlist('param_isUsed')[0].split(',')
                cakes_ids = request.POST.getlist('cakes_ids')[0].split(',')
                cakes_isUsed = request.POST.getlist('cakes_isUsed')[0].split(',')
                isVisible = request.POST.get("isVisible") 
                isEssential = request.POST.get("isEssential")
                isConstruct = request.POST.get("isConstruct")
                if isVisible=="true":
                    isVisible=True
                else:
                    isVisible=False
                if isEssential=="true":
                    isEssential=True
                else:
                    isEssential=False 
                if isConstruct=="true":
                    isConstruct=True
                else:
                    isConstruct=False 
                if isFileChanged=="true":
                    isFileChanged=True
                else:
                    isFileChanged=False 
                file=default_storage.open('D:\games\diploma\site1\diplom\static\images\ingridients\\test_ing.png')
                if id=="new":
                    ing=Ingredients(name=name,IsEssential=isEssential,IsVisible=isVisible,IsConstruct=isConstruct)
                    ing.save()
                    ing.image='ing_'+str(ing.id)+"."+img_name.split(".")[1]   
                else:
                    ing=Ingredients.objects.get(id=id)
                    ing.name=name
                    ing.image='ing_'+str(id)+"."+img_name.split(".")[1]
                    ing.IsVisible=isVisible
                    ing.IsEssential=isEssential
                    ing.IsConstruct=isConstruct
                    ingch=IngChar.objects.filter(Id_ing=id).delete()
                    ingct=IngCT.objects.filter(Id_ing=id).delete()
                for index, p in enumerate(param_ids):
                    if param_isUsed[index]=='true':
                        newingchar=IngChar(Id_ing=Ingredients.objects.get(id=ing.id),Id_char=Characteristic.objects.get(id=p))
                        newingchar.save()
                for index, c in enumerate(cakes_ids):
                    if cakes_isUsed[index]=='true':
                        newingcake=IngCT(Id_ing=Ingredients.objects.get(id=ing.id),Id_cake_type=CakeType.objects.get(id=c))
                        newingcake.save()
                if isFileChanged:
                    if str(uploaded_file)!="None":
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\ingridients\ing_'+str(ing.id)+"."+ing.image.split(".")[1], ContentFile(uploaded_file.read()))
                        uploaded_file.close()   
                        ing.image='ing_'+str(ing.id)+"."+img_name.split(".")[1]             
                    else:
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\ingridients\ing_'+str(ing.id)+".png", file)
                        ing.image='ing_'+str(ing.id)+".png"
                ing.save()
                file.close()
                return HttpResponse("POST request")     
        else:
            return HttpResponseRedirect('/enter')  
            
@csrf_exempt      
def saveorder(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                name = request.POST.get("name") 
                id = request.POST.get("id") 
                phone = request.POST.get("phone") 
                cakes_ids = request.POST.getlist('cakes_ids')[0].split(',')
                cakes_values = request.POST.getlist('cakes_values')[0].split(',')
                status = request.POST.get("status")  
                date = request.POST.get("date")  
                if id=='new':
                    order = Order(phone=phone,customer_name=name,order_date=date,status=OrderStatus.objects.get(id=status))
                    order.save()
                else:
                    order = Order.objects.get(id=id)
                    order.customer_name=name
                    order.order_date=date
                    order.phone=phone
                    order.status=OrderStatus.objects.get(id=status)
                    order.save()
                    OrderDish.objects.filter(Id_order=order).delete()
                for index, c in enumerate(cakes_ids):
                    neworddish=OrderDish(Id_order=order,Id_dish=Dish.objects.get(id=cakes_ids[index]),Value=cakes_values[index])
                    neworddish.save()
                return HttpResponse("POST request")   
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def saveconcingfile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                ing_id = request.POST.get("ing_id") 
                uploaded_file = request.FILES.get('photo')
                img_name = request.POST.get("img_name")
                uploaded_vis_file = request.FILES.get('visible_photo')
                vis_img_name = request.POST.get("vis_img_name") 
                name = request.POST.get("name") 
                id = request.POST.get("id") 
                isFileChanged = request.POST.get("isFileChanged") 
                if isFileChanged=="true":
                    isFileChanged=True
                else:
                    isFileChanged=False 
                isVisibleFileChanged = request.POST.get("isVisibleFileChanged") 
                if isVisibleFileChanged=="true":
                    isVisibleFileChanged=True
                else:
                    isVisibleFileChanged=False 
                param_ids = request.POST.getlist('param_ids')[0].split(',')
                param_values = request.POST.getlist('param_values')[0].split(',')
                file=default_storage.open('D:\games\diploma\site1\diplom\static\images\ingridients\\test_ing.png')
                if id=="new":
                    ing=ConcreateIngredients(name=name,Id_ing=Ingredients.objects.get(id=ing_id))
                    ing.Value=param_values[1]
                    ing.save()
                    ing.image='ing_'+str(ing.id)+'.'+img_name.split(".")[1] 
                    if ing.Id_ing.IsVisible==True: 
                        ing.image_ready='ing_'+str(ing.id)+'.'+vis_img_name.split(".")[1]  
                else:
                    ing=ConcreateIngredients.objects.get(id=id)
                    ing.name=name
                    ing.image='ing_'+str(id)+"."+img_name.split(".")[1]
                    if ing.Id_ing.IsVisible==True: 
                        ing.image_ready='ing_'+str(ing.id)+'.'+vis_img_name.split(".")[1]  
                    ing.Value=param_values[1]
                    ingch=CIChar.objects.filter(Id_conc_ing=ing).delete()
                param_ids.pop(0)
                param_ids.pop(0)
                param_values.pop(0)
                param_values.pop(0)
                for index, p in enumerate(param_ids):
                    newingchar=CIChar(Id_conc_ing=ing,Id_char=Characteristic.objects.get(id=p), Value=param_values[index])
                    newingchar.save()
                ing.save()
                if isFileChanged:
                    if str(uploaded_file)!="None":
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\concingridients\ing_'+str(ing.id)+"."+ing.image.split(".")[1], ContentFile(uploaded_file.read()))
                        uploaded_file.close()       
                        ing.image='ing_'+str(ing.id)+"."+img_name.split(".")[1]           
                    else:
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\concingridients\ing_'+str(ing.id)+".png", file)
                        ing.image='ing_'+str(ing.id)+".png"
                if ing.Id_ing.IsVisible==True: 
                    if isVisibleFileChanged:
                        path = default_storage.save('D:\games\diploma\site1\diplom\static\images\ingready\ing_'+str(ing.id)+"."+ing.image_ready.split(".")[1], ContentFile(uploaded_vis_file.read()))
                        uploaded_vis_file.close()                
                file.close()
                return HttpResponse("POST request")  
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def deletefile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                img_del = request.POST.get('img_del')
                path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\cakes\\'+img_del)
                return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  

          
@csrf_exempt      
def deleteingfile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                img_del = request.POST.get('img_del')
                path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingridients\\'+img_del)
                return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def deleteconcingfile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                img_del = request.POST.get('img_del')
                path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\concingridients\\'+img_del)
                return HttpResponse("POST request")      
        else:
            return HttpResponseRedirect('/enter')  
    
@csrf_exempt      
def deleteconcingvisfile(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                img_del = request.POST.get('img_del')
                path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingready\\'+img_del)
                return HttpResponse("POST request")        
        else:
            return HttpResponseRedirect('/enter')  
            
@csrf_exempt    
def delete_ing(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                    id = request.POST.get('id')
                    ing=Ingredients.objects.get(id=id)
                    path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingridients\\'+ing.image)
                    ing.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  
        
@csrf_exempt    
def delete_dish(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                    id = request.POST.get('id')
                    dish=Dish.objects.get(id=id)
                    dish.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  

    
@csrf_exempt    
def delete_conc_ing(request):
        if Token.objects.filter(token=request.COOKIES.get('token')).count()>0:
            if request.method == 'POST':
                    id = request.POST.get('id')
                    ing=ConcreateIngredients.objects.get(id=id)
                    path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\concingridients\\'+ing.image)
                    path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingready\\'+ing.image_ready)
                    ingch=CIChar.objects.filter(Id_conc_ing=ing).delete()
                    ing.delete()
                    return HttpResponse("POST request")
        else:
            return HttpResponseRedirect('/enter')  

def create_token(request):
    id = request.GET.get('id')
    print(id)
    usr = User.objects.get(id=id)
    tokens=Token.objects.filter(id_user=usr)
    for tok in tokens:
        tok.delete()
    alphabet = string.ascii_letters + string.digits
    token=''.join(secrets.choice(alphabet) for i in range(200))
    t = Token(id_user=usr,token=token)
    t.save()
    return JsonResponse({'token':token,'id':id })