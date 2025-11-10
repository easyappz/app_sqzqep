from django.contrib import admin
from .models import Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Personal Information', {
            'fields': ('email', 'first_name', 'last_name')
        }),
        ('Security', {
            'fields': ('password',)
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )
