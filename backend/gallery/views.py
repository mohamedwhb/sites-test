from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import Category, GalleryImage, Testimonial, ContactMessage, WebsiteSection
from .serializers import CategorySerializer, GalleryImageSerializer, TestimonialSerializer, ContactMessageSerializer, WebsiteSectionSerializer

# Create your views here.

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for gallery categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for gallery images
    """
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['alt', 'description']
    ordering_fields = ['created_at', 'id']
    ordering = ['-created_at']

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for customer testimonials
    """
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    ordering = ['order', '-created_at']

class ContactMessageViewSet(viewsets.GenericViewSet):
    """
    API endpoint for contact form submissions
    """
    serializer_class = ContactMessageSerializer
    
    @action(detail=False, methods=['post'])
    def submit(self, request):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Save the contact message
            contact_message = serializer.save()
            
            # Send confirmation email to the customer
            self.send_confirmation_email(contact_message)
            
            # Send notification email to the admin
            self.send_admin_notification(contact_message)
            
            return Response(
                {"message": "Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden."},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def send_confirmation_email(self, contact_message):
        """Send confirmation email to the customer"""
        subject = 'Ihre Anfrage bei Sisters Deko'
        message = f"""Liebe(r) {contact_message.name},

vielen Dank für Ihre Anfrage bei Sisters Deko. 

Wir haben Ihre Nachricht erhalten und werden uns innerhalb der nächsten 24-48 Stunden bei Ihnen melden.

Hier ist eine Zusammenfassung Ihrer Anfrage:
- Event-Typ: {contact_message.get_event_type_display()}
- Event-Datum: {contact_message.event_date.strftime('%d.%m.%Y') if contact_message.event_date else 'Nicht angegeben'}

Mit freundlichen Grüßen,
Ihr Sisters Deko Team
"""
        try:
            send_mail(
                subject,
                message,
                'sisters.deko@gmx.at',  # From email
                [contact_message.email],  # To email
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't break the flow
            print(f"Error sending confirmation email: {e}")
    
    def send_admin_notification(self, contact_message):
        """Send notification email to the admin"""
        subject = f'Neue Kontaktanfrage: {contact_message.name}'
        message = f"""Eine neue Kontaktanfrage wurde eingereicht:

Name: {contact_message.name}
E-Mail: {contact_message.email}
Telefon: {contact_message.phone or 'Nicht angegeben'}
Event-Typ: {contact_message.get_event_type_display()}
Event-Datum: {contact_message.event_date.strftime('%d.%m.%Y') if contact_message.event_date else 'Nicht angegeben'}

Nachricht:
{contact_message.message}

Sie können diese Anfrage in der Admin-Oberfläche verwalten.
"""
        try:
            send_mail(
                subject,
                message,
                'sisters.deko@gmx.at',  # From email
                ['sisters.deko@gmx.at'],  # Admin email
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't break the flow
            print(f"Error sending admin notification email: {e}")

class WebsiteSectionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for website sections
    """
    queryset = WebsiteSection.objects.filter(is_active=True)
    serializer_class = WebsiteSectionSerializer
    
    def get_queryset(self):
        queryset = WebsiteSection.objects.filter(is_active=True)
        section_id = self.request.query_params.get('section_id', None)
        if section_id is not None:
            queryset = queryset.filter(section_id=section_id)
        return queryset

@api_view(['GET'])
def api_root(request, format=None):
    """
    Root API endpoint with links to all available endpoints
    """
    return Response({
        'categories': 'api/categories/',
        'images': 'api/images/',
        'testimonials': 'api/testimonials/',
        'contact': 'api/contact/submit/',
    })
