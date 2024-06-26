# Generated by Django 5.0.4 on 2024-05-26 15:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diplom', '0010_orderstatus_order_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='Id_dish',
        ),
        migrations.CreateModel(
            name='OrderDish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Value', models.IntegerField()),
                ('Id_dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diplom.dish')),
                ('Id_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diplom.order')),
            ],
            options={
                'db_table': 'OrderDish',
                'managed': True,
            },
        ),
    ]
