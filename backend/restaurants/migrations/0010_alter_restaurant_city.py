# Generated by Django 3.2.25 on 2024-10-25 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0009_auto_20241025_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='city',
            field=models.CharField(choices=[('Madrid', 'Madrid'), ('Barcelona', 'Barcelona')], default='Madrid', max_length=100),
        ),
    ]