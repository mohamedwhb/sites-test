from django.core.management.base import BaseCommand
from gallery.models import Testimonial

class Command(BaseCommand):
    help = 'Import sample testimonials for the website'

    def handle(self, *args, **options):
        # Sample testimonials
        testimonials_data = [
            {
                "quote": "Sisters Deko hat unsere Hochzeit in ein Märchen verwandelt. Die Blumenarrangements waren atemberaubend und jedes Detail war perfekt durchdacht.",
                "author": "Julia & Markus",
                "event": "Hochzeit im Schloss Charlottenburg",
                "order": 1
            },
            {
                "quote": "Die Dekoration für unseren Firmenevent war genau das, was wir uns erhofft hatten - professionell, elegant und dennoch innovativ. Unsere Kunden waren beeindruckt!",
                "author": "Thomas Weber",
                "event": "Jahreskonferenz der Weber GmbH",
                "order": 2
            },
            {
                "quote": "Mein 50. Geburtstag wurde dank der wundervollen Dekoration zu einem unvergesslichen Erlebnis. Das Team von Sisters Deko hat meine Vorstellungen nicht nur umgesetzt, sondern übertroffen.",
                "author": "Claudia Meier",
                "event": "50. Geburtstagsfeier",
                "order": 3
            },
            {
                "quote": "Die Tischdekoration war einfach zauberhaft und hat perfekt zu unserem Thema gepasst. Selbst Wochen nach der Veranstaltung sprechen unsere Gäste noch darüber!",
                "author": "Sarah & Daniel",
                "event": "Vintage-Hochzeit im Weingut",
                "order": 4
            },
            {
                "quote": "Professionell, kreativ und höchst zuverlässig. Sisters Deko hat unsere Produktpräsentation mit einer stilvollen Dekoration aufgewertet, die genau unsere Markenidentität widerspiegelte.",
                "author": "Michael Schneider",
                "event": "Produktlaunch der Schneider AG",
                "order": 5
            },
        ]

        # Create testimonials
        for testimonial_data in testimonials_data:
            # Check if this testimonial already exists (by author and event)
            existing = Testimonial.objects.filter(
                author=testimonial_data['author'],
                event=testimonial_data['event']
            ).first()
            
            if not existing:
                testimonial = Testimonial.objects.create(
                    quote=testimonial_data['quote'],
                    author=testimonial_data['author'],
                    event=testimonial_data['event'],
                    order=testimonial_data['order'],
                    is_active=True
                )
                self.stdout.write(self.style.SUCCESS(f"Testimonial von '{testimonial_data['author']}' erstellt"))
            else:
                self.stdout.write(self.style.WARNING(f"Testimonial von '{testimonial_data['author']}' existiert bereits")) 