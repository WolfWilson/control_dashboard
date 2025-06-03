/* expediente.js
   ——— Vista "Consulta de Expedientes" ———
*/
(() => {
  'use strict';

  /* -------------------- Selectores -------------------- */
  const $form     = document.getElementById('expediente-form');
  const $loading  = document.getElementById('loading');

  /* Spans de detalle mapeados por clave lógica */
  const $detail = {
    expediente: document.getElementById('expediente-info'),
    fecha:      document.getElementById('fecha-alta'),
    extracto:   document.getElementById('extracto'),
    dni:        document.getElementById('dni'),
    nombre:     document.getElementById('nombre'),
    afiliado:   document.getElementById('nro-afiliado'),
    area:       document.getElementById('area'),
    estado:     document.getElementById('estado')
  };

  /* -------------------- Datos demo -------------------- */
  //  Función que genera un objeto “ficticio” a partir de los valores del formulario.
  const buildFakeData = ({ letra, actuacion, ejercicio }) => ({
    expediente: `${letra.toUpperCase()}-${actuacion}/${ejercicio}`,
    fecha:      '03/06/2025',
    extracto:   'Solicitud de beneficios',
    dni:        '12.345.678',
    nombre:     'Juan Pérez',
    afiliado:   '456789',
    area:       'Mesa de Entradas',
    estado:     'En trámite'
  });

  /* -------------------- Relleno en la UI -------------------- */
  const fillDetails = data => {
    Object.entries(data).forEach(([key, value]) => {
      if ($detail[key]) $detail[key].textContent = value;
    });
  };

  /* -------------------- Init -------------------- */
  const init = () => {
    /* Mostrar estado inicial para que el usuario vea la maqueta */
    fillDetails(buildFakeData({ letra: 'E', actuacion: '255', ejercicio: '2025' }));

    /* Manejador de envío */
    $form.addEventListener('submit', async evt => {
      evt.preventDefault();
      $loading.classList.remove('hidden');

      // Capturamos valores del formulario
      const payload = {
        letra:     $form.letra.value.trim()     || '-',
        actuacion: $form.actuacion.value.trim() || '-',
        ejercicio: $form.ejercicio.value.trim() || '-'
      };

      /*  Simulación de “llamada” al backend  */
      await new Promise(r => setTimeout(r, 600)); // delay ilustrativo

      /* Mostramos datos ficticios basados en la entrada */
      fillDetails(buildFakeData(payload));

      $loading.classList.add('hidden');
    });
  };

  /* Ejecutamos cuando el DOM esté listo */
  document.addEventListener('DOMContentLoaded', init);
})();
