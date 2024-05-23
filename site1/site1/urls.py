"""
URL configuration for site1 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from diplom import views
urlpatterns = [
    path('', views.main, name="main"),
    path('constructor', views.gotoconstructor, name="gotoconstructor"),
    path('orders', views.gotoorders, name="gotoorders"),
    path('cakes', views.gotocakes, name="gotocakes"),
    path('ingredients', views.gotoingredients, name="gotoingredients"),
    path('concingredients', views.gotoconcingredients, name="gotoconcingredients"),
    path('parameters', views.gotoparameters, name="gotoparameters"),
    path('check-param-deletion/', views.check_param, name="check_param"),
    path('check-cake-name/', views.check_name, name="check_name"),
    path('check-ing-name/', views.check_ing_name, name="check_ing_name"),
    path('check-concing-name/', views.check_concing_name, name="check_concing_name"),
    path('check-dish-name/', views.check_dish_name, name="check_dish_name"),
    path('get-cake-id/', views.get_cake_id, name="get_cake_id"),
    path('get-cake-info/', views.get_cake_info, name="get_cake_info"),
    path('get-ingridients/', views.get_ingridients, name="get_ingridients"),
    path('delete-ing/', views.delete_ing, name="delete_ing"),
    path('save-param-changes/', views.save_param, name="save_param"),
    path('delete-params/', views.delete_param, name="delete_param"),
    path('delete-conc-ing/', views.delete_conc_ing, name="delete_conc_ing"),
    path('savefile/', views.savefile, name="savefile"),
    path('saveingfile/', views.saveingfile, name="saveingfile"),
    path('saveconcingfile/', views.saveconcingfile, name="saveconcingfile"),
    path('savenewdish/', views.savenewdish, name="savenewdish"),
    path('deletefile/', views.deletefile, name="deletefile"),
    path('deleteingfile/', views.deleteingfile, name="deleteingfile"),
    path('deleteconcingfile/', views.deleteconcingfile, name="deleteconcingfile"),
    path('deleteconcingvisfile/', views.deleteconcingvisfile, name="deleteconcingvisfile"),
    path('ingredients/ingredient_<str:ing_id>', views.gotoingredientinfo, name="gotoingredientinfo"),
    path('concingredients/<int:ing_id>/new', views.gotoaddconcing, name="gotoaddconcing"),
    path('concingredients/<int:ci_id>', views.gotoconcing, name="gotoconcing"),
    path('constructor/free_<str:dish_id>', views.gotofreeconstructor, name="gotofreeconstructor"),
    path('constructor/constructor_<int:cake_id>', views.gotoconstructcake, name="gotoconstructcake"),
]
