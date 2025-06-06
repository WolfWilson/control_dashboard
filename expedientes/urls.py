from django.urls import path
from .views import ExpedienteView

app_name = 'expedientes'
urlpatterns = [
    path('', ExpedienteView.as_view(), name='consulta'),
]
