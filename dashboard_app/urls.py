# dashboard_app/urls.py
from django.urls import path
from .views import (
    DashboardHomeView,
    BlankView,
)

app_name = 'dashboard_app'

urlpatterns = [
    path('', DashboardHomeView.as_view(), name='dashboard'),

    #  vistas placeholder
    path('usuario/',       BlankView.as_view(), name='usuario'),
    path('informes/',      BlankView.as_view(), name='informes'),
    path('graficos/',      BlankView.as_view(), name='graficos'),
    path('correo/',        BlankView.as_view(), name='correo'),
    path('configuracion/', BlankView.as_view(), name='configuracion'),
]
