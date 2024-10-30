# Generated by Django 3.2.25 on 2024-10-25 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0008_remove_restaurant_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='city',
            field=models.CharField(default='Madrid', max_length=100),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='country',
            field=models.CharField(default='España', max_length=100),
        ),
    ]