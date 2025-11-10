from django.db import models
from django.contrib.auth.hashers import make_password


class Member(models.Model):
    email = models.EmailField(unique=True, verbose_name='Email')
    first_name = models.CharField(max_length=150, verbose_name='First Name')
    last_name = models.CharField(max_length=150, verbose_name='Last Name')
    password = models.CharField(max_length=128, verbose_name='Password')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def save(self, *args, **kwargs):
        if self.pk is None or 'password' in kwargs.get('update_fields', []):
            if not self.password.startswith('pbkdf2_sha256$'):
                self.password = make_password(self.password)
        super().save(*args, **kwargs)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False