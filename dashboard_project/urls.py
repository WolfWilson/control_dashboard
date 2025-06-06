# dashboard_project/urls.py
from django.contrib import admin
from django.urls import path, include   # ← agrega include

urlpatterns = [
    path('admin/', admin.site.urls),     # opcional, pero conviene dejarlo
     # auth built-ins (login, logout, password change, etc.)
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('dashboard_app.urls')),
    path('expedientes/', include('expedientes.urls')),  # ← ESTA línea
]
