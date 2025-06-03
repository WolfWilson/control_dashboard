#dashboard_app/urls.py
from django.urls import path
from django.views.generic import TemplateView
from .views import DashboardHomeView, ExpedienteView, BlankView

app_name = 'dashboard_app'

urlpatterns = [
    path('', DashboardHomeView.as_view(), name='dashboard'),
    path('expedientes/', TemplateView.as_view(
         template_name='dashboard_app/expediente.html'), name='expedientes'),
    # ----  Placeholders  ----
    path('usuario/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='usuario'),
    #path('expediente/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='expediente'),
    path('informes/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='informes'),
    path('graficos/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='graficos'),
    path('correo/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='correo'),
    path('configuracion/', TemplateView.as_view(template_name='dashboard_app/blank.html'), name='configuracion'),
    #path('usuario/', BlankView.as_view(), name='usuario'),

]