# Generated by Django 3.2.25 on 2024-10-25 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0010_alter_restaurant_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='rating',
            field=models.IntegerField(default=4),
            preserve_default=False,
        ),
    ]
