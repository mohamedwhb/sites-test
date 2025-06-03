from rest_framework import serializers
from .models import Category, GalleryImage, Testimonial, ContactMessage, WebsiteSection

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    # Add category name to the serialized output
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = GalleryImage
        fields = ['id', 'src', 'alt', 'category', 'category_name', 'description', 
                  'width', 'height', 'span', 'featured', 'created_at']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'quote', 'author', 'event', 'image', 'created_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'event_type', 'event_date', 'message']
        
    def validate_event_date(self, value):
        """
        Check that the event date is not in the past.
        """
        import datetime
        if value and value < datetime.date.today():
            raise serializers.ValidationError("Das Veranstaltungsdatum kann nicht in der Vergangenheit liegen.")
        return value

class WebsiteSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSection
        fields = ['section_id', 'title', 'subtitle', 'is_active'] 