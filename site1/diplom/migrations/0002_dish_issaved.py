# Generated by Django 5.0.4 on 2024-04-09 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diplom', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='IsSaved',
            field=models.BooleanField(default='True'),
            preserve_default=False,
        ),
    ]
