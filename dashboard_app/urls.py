from django.urls import path
from .views import (
    DashboardHomeView,
    ExpedienteView,
    BlankView,          # ← ya incluye LoginRequiredMixin
)

app_name = 'dashboard_app'

urlpatterns = [
    # Home (dashboard)
    path('', DashboardHomeView.as_view(), name='dashboard'),

    # Vista real de expedientes (protegida)
    path('expedientes/', ExpedienteView.as_view(), name='expedientes'),

    # ----  Secciones aún en blanco (todas protegidas)  ----
    path('usuario/',       BlankView.as_view(), name='usuario'),
    path('informes/',      BlankView.as_view(), name='informes'),
    path('graficos/',      BlankView.as_view(), name='graficos'),
    path('correo/',        BlankView.as_view(), name='correo'),
    path('configuracion/', BlankView.as_view(), name='configuracion'),
]
