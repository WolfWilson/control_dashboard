# dashboard_app/views.py
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

class DashboardHomeView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard_app/dashboard.html'


class BlankView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard_app/blank.html'
