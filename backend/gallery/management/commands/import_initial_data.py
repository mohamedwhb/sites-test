from django.core.management.base import BaseCommand
from gallery.models import Category, GalleryImage
from django.core.files.base import ContentFile
import requests
import os
import tempfile
import shutil
from pathlib import Path

class Command(BaseCommand):
    help = 'Import initial categories and gallery images from frontend data'

    def handle(self, *args, **options):
        # Initial categories
        categories_data = [
            {"id": "all", "name": "Alle"},
            {"id": "hochzeiten", "name": "Hochzeiten"},
            {"id": "firmenfeiern", "name": "Firmenfeiern"},
            {"id": "geburtstage", "name": "Geburtstage"},
            {"id": "tischdekoration", "name": "Tischdekoration"},
        ]

        # Create categories
        for category_data in categories_data:
            Category.objects.get_or_create(
                id=category_data['id'],
                defaults={'name': category_data['name']}
            )
            self.stdout.write(self.style.SUCCESS(f"Category '{category_data['name']}' created"))

        # Initial gallery images
        gallery_data = [
            {
                "id": 1,
                "src": "/floral-candlelit-centerpiece.png",
                "alt": "Elegante Hochzeitsdekoration mit Blumen und Kerzen",
                "category": "hochzeiten",
                "description": "Romantische Hochzeitsdekoration mit frischen Blumen und stimmungsvollen Kerzen",
            },
            {
                "id": 2,
                "src": "/opulent-dinner.png",
                "alt": "Luxuriöse Tischdekoration mit goldenen Akzenten",
                "category": "tischdekoration",
                "description": "Exquisite Tischdekoration mit feinem Porzellan und goldenen Details",
            },
            {
                "id": 3,
                "src": "/minimalist-corporate-gathering.png",
                "alt": "Firmenevent mit minimalistischer Dekoration",
                "category": "firmenfeiern",
                "description": "Moderne, klare Linien für ein professionelles Firmenevent",
            },
            {
                "id": 4,
                "src": "/elegant-floral-birthday.png",
                "alt": "Geburtstagsfeier mit eleganten Blumendekorationen",
                "category": "geburtstage",
                "description": "Festliche Geburtstagsfeier mit personalisierten Dekorationselementen",
            },
            {
                "id": 5,
                "src": "/white-wedding-arch.png",
                "alt": "Hochzeitsbogen mit weißen Blumen und Stoff",
                "category": "hochzeiten",
                "description": "Traumhafter Hochzeitsbogen für eine unvergessliche Trauungszeremonie",
            },
        ]

        # Create the media/gallery directory if it doesn't exist
        media_dir = Path(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'media', 'gallery'))
        media_dir.mkdir(parents=True, exist_ok=True)

        # Create a temp directory to download images
        with tempfile.TemporaryDirectory() as temp_dir:
            # Create gallery images
            for image_data in gallery_data:
                # Check if image already exists
                if not GalleryImage.objects.filter(id=image_data['id']).exists():
                    # Get the category
                    category = Category.objects.get(id=image_data['category'])
                    
                    # For real imports, you'd download from the actual source
                    # For this example, let's copy from the frontend directory
                    source_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), 'public', image_data['src'].lstrip('/'))
                    
                    if os.path.exists(source_path):
                        # Create a new filename to avoid conflicts
                        filename = os.path.basename(image_data['src'])
                        dest_path = os.path.join(media_dir, filename)
                        
                        # Copy the file
                        shutil.copy2(source_path, dest_path)
                        
                        # Create the gallery image
                        gallery_image = GalleryImage(
                            id=image_data['id'],
                            alt=image_data['alt'],
                            category=category,
                            description=image_data['description'],
                        )
                        gallery_image.src.name = f"gallery/{filename}"
                        gallery_image.save()
                        
                        self.stdout.write(self.style.SUCCESS(f"Gallery image '{image_data['alt']}' created"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Could not find image at {source_path}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Gallery image with ID {image_data['id']} already exists")) 