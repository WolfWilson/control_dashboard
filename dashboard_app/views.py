from django.shortcuts import render
from django.views.generic import TemplateView, FormView
from django.urls import reverse_lazy
from .forms import ExpedienteForm

class DashboardHomeView(TemplateView):
    template_name = 'dashboard_app/dashboard.html'

class ExpedienteView(FormView):
    template_name = 'dashboard_app/expedientes.html'
    form_class = ExpedienteForm
    success_url = reverse_lazy('dashboard_app:expedientes')  # recargar la misma página

    def form_valid(self, form):
        # TODO: llamar al SP y armar dict `expte`
        context = self.get_context_data(form=form, expte=None)
        return self.render_to_response(context)

