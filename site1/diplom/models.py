from django.db import models

# Create your models here.

class Ingredients(models.Model):
    name=models.TextField(max_length=60)
    image=models.TextField(max_length=100)
    IsVisible=models.BooleanField()
    IsEssential=models.BooleanField()
    IsConstruct=models.BooleanField()
    class Meta:
        managed = True
        db_table = 'Ingredients'


class ConcreateIngredients(models.Model):
    name=models.TextField(max_length=60)
    image=models.TextField(max_length=100)
    image_ready=models.TextField(max_length=100)
    Value=models.FloatField(blank=True)
    Id_ing=models.ForeignKey(Ingredients, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'ConcreateIngredients'

class Characteristic(models.Model):
    name=models.TextField(max_length=60)

    class Meta:
        managed = True
        db_table = 'Characteristic'

class CakeType(models.Model):
    name=models.TextField(max_length=60)
    image=models.TextField(max_length=100)

    class Meta:
        managed = True
        db_table = 'CakeType'

class IngCT(models.Model):
    Id_ing=models.ForeignKey(Ingredients, on_delete=models.CASCADE) 
    Id_cake_type=models.ForeignKey(CakeType, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'IngCT'

class IngChar(models.Model):
    Id_ing=models.ForeignKey(Ingredients, on_delete=models.CASCADE) 
    Id_char=models.ForeignKey(Characteristic, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'IngChar'

class CIChar(models.Model):
    Id_conc_ing=models.ForeignKey(ConcreateIngredients, on_delete=models.CASCADE) 
    Id_char=models.ForeignKey(Characteristic, on_delete=models.CASCADE)
    Value=models.TextField(max_length=100)

    class Meta:
        managed = True
        db_table = 'CIChar'

class Dish(models.Model):
    name=models.TextField(max_length=60)
    Id_cake_type=models.ForeignKey(CakeType, on_delete=models.CASCADE,null=True)
    IsSaved=models.BooleanField(null=True)
    IsConstructed=models.BooleanField(null=True)

    class Meta:
        managed = True
        db_table = 'Dish'

class DishIng(models.Model):
    Id_conc_ing=models.ForeignKey(ConcreateIngredients, on_delete=models.CASCADE)
    Id_dish=models.ForeignKey(Dish, on_delete=models.CASCADE)
    Location=models.IntegerField()
    class Meta:
        managed = True
        db_table = 'DishIng'

class OrderStatus(models.Model):
    name = models.TextField(max_length=60)
    class Meta:
        managed = True
        db_table = 'OrderStatus'

class Order(models.Model):
    phone=models.TextField(max_length=12)
    customer_name=models.TextField(max_length=50)
    order_date=models.DateField()
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE)
    class Meta:
        managed = True
        db_table = 'Order'

class OrderDish(models.Model):
    Id_order=models.ForeignKey(Order, on_delete=models.CASCADE)
    Id_dish=models.ForeignKey(Dish, on_delete=models.CASCADE)
    Value=models.IntegerField()
    class Meta:
        managed = True
        db_table = 'OrderDish'

class User(models.Model):
    login = models.CharField(unique=True, max_length=50) 
    password = models.CharField(max_length=100) 

    class Meta:
        managed = True
        db_table = 'User'

class Token(models.Model):
    token = models.CharField(max_length=200)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        managed = True
        db_table = 'Token'