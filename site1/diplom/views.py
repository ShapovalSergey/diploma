from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings as django_settings
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse, FileResponse, HttpResponseRedirect
from .models import Characteristic
from .models import Ingredients, ConcreateIngredients
from .models import IngChar
from .models import IngCT, CIChar
from .models import CIChar
from .models import CakeType
# Create your views here.

def main(request):
    return render(request, "main.html") 

def gotoconstructor(request):
    return render(request, "constructor.html") 

def gotoorders(request):
    return render(request, "orders.html") 

def gotocakes(request):
    cake_types=CakeType.objects.all()
    ct_all = {}
    ct_info=[]
    for ct in cake_types:
        ct_all={'name':ct.name,'id':ct.id,'image':ct.image}
        ct_info.append(ct_all)
    return render(request, "cakes.html",{"ct_info": ct_info,}) 

def gotoingredients(request):
    ing_types=Ingredients.objects.all()
    ing_all = {}
    ing_info=[]
    for i in ing_types:
        ing_all={'name':i.name,'id':i.id,'image':i.image,'IsEssential':i.IsEssential,'IsVisible':i.IsVisible}
        ing_info.append(ing_all)
    return render(request, "ingredients.html",{"ing_info": ing_info,}) 

def gotoconcingredients(request):
    ing_types=Ingredients.objects.all()
    ing_all = {}
    ing_info=[]
    for i in ing_types:
        ing_all={'name':i.name,'id':i.id,'image':i.image,'IsEssential':i.IsEssential,'IsVisible':i.IsVisible}
        ing_info.append(ing_all)
    return render(request, "concingredients.html",{"ing_info": ing_info,}) 

def gotoparameters(request):
    param=Characteristic.objects.all()
    param_all = {}
    param_info=[]
    for p in param:
        param_all={'name':p.name,'id':p.id}
        param_info.append(param_all)
    
    return render(request, "parameters.html",{"param_info": param_info, "saved":1,}) 

def gotoingredientinfo(request,ing_id):
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

def gotoaddconcing(request,ing_id):
    ing = Ingredients.objects.get(id=ing_id)
    ingch=IngChar.objects.filter(Id_ing=ing_id)
    ingch_all = {}
    ingch_info = []
    for i in ingch:
        name = Characteristic.objects.get(id=i.Id_char.id).name
        ingch_all={"id":i.Id_char.id,"name":name}
        ingch_info.append(ingch_all)
    return render(request, "concing_info.html",{"ing_id": ing_id,"id":"new", "isVisible":ing.IsVisible,"ingch_info":ingch_info}) 

def gotoconcing(request,ci_id):
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






def check_param(request):
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

def check_name(request):
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
        
def check_ing_name(request):
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

def check_concing_name(request):
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

def get_cake_id(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'GET':
            name = request.GET.get('name')
            id=CakeType.objects.get(name=name).id
            img=CakeType.objects.get(name=name).image
            return JsonResponse({'id':id,'img':img})     

def get_cake_info(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'GET':
            id = request.GET.get('id')
            cake=CakeType.objects.get(id=id)
            name=cake.name
            img=cake.image
            return JsonResponse({'name':name, 'img': img})   

def get_ingridients(request):
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


@csrf_exempt      
def save_param(request):
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
        
@csrf_exempt      
def delete_param(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'POST':
            id= request.POST.get('id')
            char=Characteristic(id=id)
            char.delete()
            return HttpResponse("POST request")
        
@csrf_exempt      
def savefile(request):
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

@csrf_exempt      
def saveingfile(request):
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
     
@csrf_exempt      
def saveconcingfile(request):
        if request.method == 'POST':
            ing_id = request.POST.get("ing_id") 
            uploaded_file = request.FILES.get('photo')
            img_name = request.POST.get("img_name")
            uploaded_vis_file = request.FILES.get('visible_photo')
            vis_img_name = request.POST.get("vis_img_name") 
            name = request.POST.get("name") 
            id = request.POST.get("id") 
            isFileChanged = request.POST.get("isFileChanged") 
            isVisibleFileChanged = request.POST.get("isVisibleFileChanged") 
            param_ids = request.POST.getlist('param_ids')[0].split(',')
            param_values = request.POST.getlist('param_values')[0].split(',')
            file=default_storage.open('D:\games\diploma\site1\diplom\static\images\ingridients\\test_ing.png')
            if id=="new":
                ing=ConcreateIngredients(name=name,Id_ing=Ingredients.objects.get(id=ing_id))
                ing.Value=param_values[1]
                ing.save()
                ing.image='ing_'+str(ing.id)+'.'+img_name.split(".")[1]  
                ing.image_ready='ing_'+str(ing.id)+'.'+vis_img_name.split(".")[1]  
            else:
                ing=ConcreateIngredients.objects.get(id=id)
                ing.name=name
                ing.image='ing_'+str(id)+"."+img_name.split(".")[1]
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
            if isVisibleFileChanged:
                path = default_storage.save('D:\games\diploma\site1\diplom\static\images\ingready\ing_'+str(ing.id)+"."+ing.image_ready.split(".")[1], ContentFile(uploaded_vis_file.read()))
                uploaded_vis_file.close()                
            file.close()
            return HttpResponse("POST request")  

@csrf_exempt      
def deletefile(request):
        if request.method == 'POST':
            img_del = request.POST.get('img_del')
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\cakes\\'+img_del)
            return HttpResponse("POST request")
        
@csrf_exempt      
def deleteingfile(request):
        if request.method == 'POST':
            img_del = request.POST.get('img_del')
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingridients\\'+img_del)
            return HttpResponse("POST request")

@csrf_exempt      
def deleteconcingfile(request):
        if request.method == 'POST':
            img_del = request.POST.get('img_del')
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\concingridients\\'+img_del)
            return HttpResponse("POST request")      

@csrf_exempt      
def deleteconcingvisfile(request):
        if request.method == 'POST':
            img_del = request.POST.get('img_del')
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingready\\'+img_del)
            return HttpResponse("POST request")        
        
@csrf_exempt    
def delete_ing(request):
    if request.method == 'POST':
            id = request.POST.get('id')
            ing=Ingredients.objects.get(id=id)
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingridients\\'+ing.image)
            ing.delete()
            return HttpResponse("POST request")
    
@csrf_exempt    
def delete_conc_ing(request):
    if request.method == 'POST':
            id = request.POST.get('id')
            ing=ConcreateIngredients.objects.get(id=id)
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\concingridients\\'+ing.image)
            path = default_storage.delete('D:\games\diploma\site1\diplom\static\images\ingready\\'+ing.image_ready)
            ingch=CIChar.objects.filter(Id_conc_ing=ing).delete()
            ing.delete()
            return HttpResponse("POST request")