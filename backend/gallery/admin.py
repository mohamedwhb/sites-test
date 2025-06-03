from django.contrib import admin
from .models import Category, GalleryImage, Testimonial, ContactMessage, WebsiteSection

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'alt', 'category', 'featured', 'created_at')
    list_filter = ('category', 'featured', 'created_at')
    search_fields = ('alt', 'description')
    list_editable = ('featured',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('src', 'alt', 'category', 'description')
        }),
        ('Darstellung', {
            'fields': ('width', 'height', 'span', 'featured')
        }),
        ('Zeitstempel', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'event', 'is_active', 'order', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('author', 'quote', 'event')
    list_editable = ('is_active', 'order')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('quote', 'author', 'event', 'image')
        }),
        ('Einstellungen', {
            'fields': ('is_active', 'order')
        }),
        ('Zeitstempel', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'event_type', 'event_date', 'status', 'created_at')
    list_filter = ('status', 'event_type', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('status',)
    
    fieldsets = (
        ('Kundeninformation', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Veranstaltungsdetails', {
            'fields': ('event_type', 'event_date', 'message')
        }),
        ('Interne Informationen', {
            'fields': ('status', 'admin_notes')
        }),
        ('Zeitstempel', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def has_delete_permission(self, request, obj=None):
        # Only superusers can delete messages
        return request.user.is_superuser

@admin.register(WebsiteSection)
class WebsiteSectionAdmin(admin.ModelAdmin):
    list_display = ('section_id', 'title', 'is_active', 'updated_at')
    list_filter = ('is_active', 'section_id')
    search_fields = ('title', 'subtitle')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('section_id', 'title', 'subtitle', 'is_active')
        }),
        ('Zeitstempel', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
