# Generated by Django 5.0.4 on 2024-04-12 08:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diplom', '0002_dish_issaved'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CICT',
            new_name='IngCT',
        ),
        migrations.RemoveField(
            model_name='ingct',
            name='Id_conc_ing',
        ),
        migrations.AddField(
            model_name='ingct',
            name='Id_ing',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='diplom.ingredients'),
            preserve_default=False,
        ),
        migrations.AlterModelTable(
            name='ingct',
            table='IngCT',
        ),
    ]
