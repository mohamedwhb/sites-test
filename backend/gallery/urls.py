from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'images', views.GalleryImageViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'contact', views.ContactMessageViewSet, basename='contact')
router.register(r'sections', views.WebsiteSectionViewSet)

urlpatterns = [
    path('', views.api_root),
    path('', include(router.urls)),
] 