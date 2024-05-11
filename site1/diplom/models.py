from django.db import models

# Create your models here.

class Ingredients(models.Model):
    name=models.TextField(max_length=60)
    image=models.TextField(max_length=100)
    IsVisible=models.BooleanField()
    IsEssential=models.BooleanField()
    class Meta:
        managed = True
        db_table = 'Ingredients'


class ConcreateIngredients(models.Model):
    name=models.TextField(max_length=60)
    image=models.TextField(max_length=100)
    image_ready=models.TextField(max_length=100)
    Value=models.FloatField(blank=True)
    Id_ing=models.ForeignKey(Ingredients, on_delete=models.RESTRICT)

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
    Id_cake_type=models.ForeignKey(CakeType, on_delete=models.CASCADE)
    IsSaved=models.BooleanField()

    class Meta:
        managed = True
        db_table = 'Dish'

class DishIng(models.Model):
    Id_conc_ing=models.ForeignKey(ConcreateIngredients, on_delete=models.CASCADE)
    Id_dish=models.ForeignKey(Dish, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'DishIng'

class Order(models.Model):
    Id_dish=models.ForeignKey(Dish, on_delete=models.CASCADE)
    phone=models.TextField(max_length=12)
    customer_name=models.TextField(max_length=50)
    order_date=models.DateField()

    class Meta:
        managed = True
        db_table = 'Order'