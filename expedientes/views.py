# expedientes/views.py
from django.views.generic import FormView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import ExpedienteForm               # ← copiá o mové tu form aquí
# expedientes/views.py
# from .services.db import exec_sp_datos_expte


class ExpedienteView(LoginRequiredMixin, FormView):
    """
    Vista principal de consulta de expedientes.
    """
    template_name = 'expedientes/expediente.html'   # nueva ubicación de la plantilla
    form_class    = ExpedienteForm
    success_url   = reverse_lazy('expedientes:consulta')

    def form_valid(self, form):
        letra     = form.cleaned_data['letra']
        actuacion = form.cleaned_data['actuacion']
        ejercicio = form.cleaned_data['ejercicio']

        #expte = exec_sp_datos_expte(letra, actuacion, ejercicio)  # puede ser None
        expte = None  # TODO: llamar exec_sp_datos_expte cuando lo tengas

        context = self.get_context_data(form=form, expte=expte)
        return self.render_to_response(context)
