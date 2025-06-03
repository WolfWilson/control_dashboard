document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('expediente-form');
  const loading  = document.getElementById('loading');
  const detailSpans = {
    expediente:  document.getElementById('expediente-info'),
    fecha:       document.getElementById('fecha-alta'),
    extracto:    document.getElementById('extracto'),
    dni:         document.getElementById('dni'),
    nombre:      document.getElementById('nombre'),
    afiliado:    document.getElementById('nro-afiliado'),
    area:        document.getElementById('area'),
    estado:      document.getElementById('estado'),
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loading.classList.remove('hidden');

    // ---- Lógica real: fetch al backend (demo con setTimeout) -------
    await new Promise(r => setTimeout(r, 800));

    // Demo de datos
    detailSpans.expediente.textContent = `E-${form.actuacion.value}/${form.ejercicio.value}`;
    detailSpans.fecha.textContent      = '03/06/2025';
    detailSpans.extracto.textContent   = 'Solicitud de beneficios';
    detailSpans.dni.textContent        = '12.345.678';
    detailSpans.nombre.textContent     = 'Juan Pérez';
    detailSpans.afiliado.textContent   = '456789';
    detailSpans.area.textContent       = 'Mesa de Entradas';
    detailSpans.estado.textContent     = 'En trámite';
    // ----------------------------------------------------------------

    loading.classList.add('hidden');
  });
});
