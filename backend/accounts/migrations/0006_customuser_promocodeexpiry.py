# Generated by Django 3.2.25 on 2024-10-30 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_promocode'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='promoCodeExpiry',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
