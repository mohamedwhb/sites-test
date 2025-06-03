from django.db import models

# Create your models here.

class Category(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class GalleryImage(models.Model):
    id = models.AutoField(primary_key=True)
    src = models.ImageField(upload_to='gallery/')
    alt = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='images')
    description = models.TextField()
    width = models.IntegerField(default=800, help_text="Breite des Bildes")
    height = models.IntegerField(default=600, help_text="Höhe des Bildes")
    span = models.CharField(max_length=50, default="col-span-1", help_text="Grid-Span-Klasse (z.B. 'col-span-1 md:col-span-2')")
    featured = models.BooleanField(default=False, help_text="Auf der Startseite anzeigen?")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.alt

    class Meta:
        ordering = ['-featured', '-created_at']

class Testimonial(models.Model):
    id = models.AutoField(primary_key=True)
    quote = models.TextField(help_text="Das Kundenzitat")
    author = models.CharField(max_length=100, help_text="Name des Kunden")
    event = models.CharField(max_length=200, help_text="Art des Events (z.B. 'Hochzeit im Schloss Bellevue')")
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True, help_text="Profilbild des Kunden")
    is_active = models.BooleanField(default=True, help_text="Testimonial auf der Webseite anzeigen?")
    order = models.PositiveIntegerField(default=0, help_text="Reihenfolge (niedrigere Zahlen erscheinen zuerst)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Testimonial von {self.author}"

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

class ContactMessage(models.Model):
    STATUS_CHOICES = (
        ('neu', 'Neu'),
        ('in_bearbeitung', 'In Bearbeitung'),
        ('beantwortet', 'Beantwortet'),
        ('archiviert', 'Archiviert'),
    )
    
    EVENT_TYPE_CHOICES = (
        ('hochzeit', 'Hochzeit'),
        ('firmenfeier', 'Firmenfeier'),
        ('geburtstag', 'Geburtstag'),
        ('andere', 'Andere'),
    )
    
    name = models.CharField(max_length=100, help_text="Name des Kunden")
    email = models.EmailField(help_text="E-Mail-Adresse des Kunden")
    phone = models.CharField(max_length=50, blank=True, null=True, help_text="Telefonnummer des Kunden")
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='andere', help_text="Art des Events")
    event_date = models.DateField(blank=True, null=True, help_text="Datum des Events")
    message = models.TextField(help_text="Nachricht des Kunden")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='neu', help_text="Bearbeitungsstatus")
    admin_notes = models.TextField(blank=True, null=True, help_text="Interne Notizen (für den Kunden nicht sichtbar)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Anfrage von {self.name} ({self.created_at.strftime('%d.%m.%Y')})"
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Kontaktanfrage"
        verbose_name_plural = "Kontaktanfragen"

class WebsiteSection(models.Model):
    SECTION_CHOICES = (
        ('gallery', 'Galerie'),
        ('services', 'Leistungen'),
        ('testimonials', 'Testimonials'),
        ('about', 'Über Uns'),
        ('contact', 'Kontakt'),
    )
    
    section_id = models.CharField(max_length=50, choices=SECTION_CHOICES, unique=True, help_text="Abschnitt der Website")
    title = models.CharField(max_length=200, help_text="Titel des Abschnitts")
    subtitle = models.TextField(blank=True, null=True, help_text="Untertitel/Beschreibung des Abschnitts")
    is_active = models.BooleanField(default=True, help_text="Abschnitt anzeigen?")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.get_section_id_display()} - {self.title}"
    
    class Meta:
        verbose_name = "Website Abschnitt"
        verbose_name_plural = "Website Abschnitte"
