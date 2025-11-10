from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('first_name', models.CharField(max_length=150, verbose_name='First Name')),
                ('last_name', models.CharField(max_length=150, verbose_name='Last Name')),
                ('password', models.CharField(max_length=128, verbose_name='Password')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
            ],
            options={
                'verbose_name': 'Member',
                'verbose_name_plural': 'Members',
                'ordering': ['-created_at'],
            },
        ),
    ]
