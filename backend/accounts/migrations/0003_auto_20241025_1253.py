# Generated by Django 3.2.25 on 2024-10-25 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_auto_20241025_1253'),
        ('accounts', '0002_customuser_is_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='favorite_restaurants',
            field=models.ManyToManyField(related_name='favorited_by', to='restaurants.Restaurant'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='points',
            field=models.IntegerField(default=0),
        ),
    ]
