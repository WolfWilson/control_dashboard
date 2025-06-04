from django.views.generic import TemplateView, FormView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import ExpedienteForm
from .services.db import exec_sp_datos_expte   # <- cuando lo implementes

class DashboardHomeView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard_app/dashboard.html'


class ExpedienteView(LoginRequiredMixin, FormView):
    template_name = 'dashboard_app/expediente.html'   # ←  singular, el que ya tenías
    form_class    = ExpedienteForm
    success_url   = reverse_lazy('dashboard_app:expedientes')

    def form_valid(self, form):
        # TODO: ejecutar el SP y armar dict expte
        letra     = form.cleaned_data['letra']
        actuacion = form.cleaned_data['actuacion']
        ejercicio = form.cleaned_data['ejercicio']

        expte = exec_sp_datos_expte(letra, actuacion, ejercicio)  # puede devolver None
        context = self.get_context_data(form=form, expte=expte)
        return self.render_to_response(context)


class BlankView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard_app/blank.html'
