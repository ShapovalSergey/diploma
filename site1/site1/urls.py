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
    path('get-cake-id/', views.get_cake_id, name="get_cake_id"),
    path('get-cake-info/', views.get_cake_info, name="get_cake_info"),
    path('delete-ing/', views.delete_ing, name="delete_ing"),
    path('save-param-changes/', views.save_param, name="save_param"),
    path('delete-params/', views.delete_param, name="delete_param"),
    path('savefile/', views.savefile, name="savefile"),
    path('saveingfile/', views.saveingfile, name="saveingfile"),
    path('deletefile/', views.deletefile, name="deletefile"),
    path('deleteingfile/', views.deleteingfile, name="deleteingfile"),
    path('ingredients/ingredient_<str:ing_id>', views.gotoingredientinfo, name="gotoingredientinfo"),
]
