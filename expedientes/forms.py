#dashboard_app/forms.py
from django import forms

class ExpedienteForm(forms.Form):
    letra = forms.CharField(
        label='Letra',
        max_length=1,
        widget=forms.TextInput(attrs={'placeholder': 'E', 'class': 'form-control'})
    )
    actuacion = forms.IntegerField(
        label='Actuación',
        min_value=1,
        widget=forms.NumberInput(attrs={'placeholder': '255', 'class': 'form-control'})
    )
    ejercicio = forms.IntegerField(
        label='Ejercicio',
        min_value=1900, max_value=2100,
        widget=forms.NumberInput(attrs={'placeholder': '2025', 'class': 'form-control'})
    )
