import os
from pathlib import Path
import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from gallery.models import Category, GalleryImage

class Command(BaseCommand):
    help = 'Import featured gallery images for the homepage'

    def handle(self, *args, **options):
        # Ensure default category exists
        default_category, created = Category.objects.get_or_create(
            id='all',
            defaults={'name': 'Alle'}
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f"Created default category 'Alle'"))
        
        # Featured gallery images
        featured_images = [
            {
                "src": "/floral-candlelit-centerpiece.png",
                "alt": "Elegante Hochzeitsdekoration",
                "width": 800,
                "height": 600,
                "span": "col-span-1 md:col-span-2",
                "description": "Elegante Hochzeitsdekoration mit Blumen und Kerzen."
            },
            {
                "src": "/opulent-dinner.png",
                "alt": "Luxuriöse Tischdekoration",
                "width": 400,
                "height": 600,
                "span": "col-span-1",
                "description": "Luxuriöse Tischdekoration für ein exklusives Dinner."
            },
            {
                "src": "/minimalist-corporate-gathering.png",
                "alt": "Firmenevent Dekoration",
                "width": 600,
                "height": 400,
                "span": "col-span-1",
                "description": "Minimalistische Dekoration für Firmenevents und Geschäftstreffen."
            },
            {
                "src": "/elegant-floral-birthday.png",
                "alt": "Geburtstagsfeier Dekoration",
                "width": 400,
                "height": 600,
                "span": "col-span-1",
                "description": "Elegante Blumendekoration für Geburtstagsfeiern."
            },
            {
                "src": "/white-wedding-arch.png",
                "alt": "Hochzeitsbogen",
                "width": 800,
                "height": 400,
                "span": "col-span-1 md:col-span-2",
                "description": "Weißer Hochzeitsbogen für eine traumhafte Zeremonie."
            },
        ]
        
        # Create the media/gallery directory if it doesn't exist
        media_dir = Path(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'media', 'gallery'))
        media_dir.mkdir(parents=True, exist_ok=True)
        
        base_url = "http://localhost:3000"  # Assuming Next.js server is running locally
        
        # Create gallery images
        for image_data in featured_images:
            image_src = image_data["src"]
            filename = os.path.basename(image_src)
            
            # Check if image with this alt text already exists
            if not GalleryImage.objects.filter(alt=image_data['alt'], featured=True).exists():
                try:
                    # Download the image from the Next.js server
                    image_url = f"{base_url}{image_src}"
                    response = requests.get(image_url, stream=True)
                    response.raise_for_status()
                    
                    # Create the gallery image
                    gallery_image = GalleryImage(
                        alt=image_data['alt'],
                        category=default_category,
                        description=image_data['description'],
                        width=image_data['width'],
                        height=image_data['height'],
                        span=image_data['span'],
                        featured=True
                    )
                    
                    # Save the image content
                    gallery_image.src.save(filename, ContentFile(response.content), save=True)
                    
                    self.stdout.write(self.style.SUCCESS(f"Featured gallery image '{image_data['alt']}' created"))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Error creating image {image_src}: {e}"))
            else:
                self.stdout.write(self.style.WARNING(f"Featured gallery image '{image_data['alt']}' already exists"))
        
        self.stdout.write(self.style.SUCCESS("Featured gallery images import completed")) 