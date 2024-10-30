# Generated by Django 3.2.25 on 2024-10-24 16:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('password', models.CharField(default='pbkdf2_sha256$260000$5d0KuOp3suRcBz9NefCYpr$L2hAU/ZVIvcJQCUNys94OyV49hcL4pELuSaZOFFHj2g=', max_length=128)),
                ('phoneNumber', models.CharField(max_length=15)),
                ('average_ticket', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('countryCode', models.CharField(default='+34', max_length=10)),
                ('restaurant_address', models.CharField(max_length=255)),
                ('restaurant_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('website', models.URLField(blank=True, null=True)),
                ('opening_hours', models.CharField(max_length=255)),
                ('menu_pdf', models.FileField(blank=True, null=True, upload_to='menus/')),
                ('cuisine_type', models.CharField(max_length=100)),
                ('reviews', models.TextField(blank=True, null=True)),
                ('price_level', models.IntegerField(choices=[(1, '€'), (2, '€€'), (3, '€€€'), (4, '€€€€')])),
                ('rating', models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.owner')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservation_date', models.DateField()),
                ('time', models.TimeField()),
                ('party_size', models.IntegerField()),
                ('seat_preference', models.CharField(blank=True, max_length=255, null=True)),
                ('special_request', models.TextField(blank=True, null=True)),
                ('offer_code', models.CharField(blank=True, max_length=50, null=True)),
                ('receive_offers', models.BooleanField(default=False)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.restaurant')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]