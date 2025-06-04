/* expediente.js — versión corregida */
(() => {
  'use strict';

  /* ---------- Selectores ---------- */
  const $form    = document.getElementById('expediente-form');
  const $loading = document.getElementById('loading');
  const $preview = document.querySelector('#routes-preview tbody');
  const $full    = document.querySelector('#routes-full tbody');
  const $toggle  = document.getElementById('toggle-routes');

  /* Mapeo de spans */
  const $detail = {
    expediente : document.getElementById('expediente-info'),
    fecha      : document.getElementById('fecha-alta'),
    extracto   : document.getElementById('extracto'),
    dni        : document.getElementById('dni'),
    nombre     : document.getElementById('nombre'),
    afiliado   : document.getElementById('nro-afiliado'),
    area       : document.getElementById('area'),
    estado     : document.getElementById('estado')
  };

  /* ---------- Datos demo ---------- */
  const fakeRoutes = [
    { ingreso:'28/02/2025', area:'720012', areaOrigen:'DEPTO PERSONAL', ope:'79',
      operador:'VEGA MONICA', obs:'CON RESOL… 0808/25 ACTA 1074', remito:'-' },
    { ingreso:'27/02/2025', area:'100100', areaOrigen:'SEC. DIRECTORIO', ope:'684',
      operador:'MARTINEZ M. EZEQ', obs:'PASE POR INVENTARIO', remito:'-' },
  ];

  const buildFakeData = ({ letra, actuacion, ejercicio }) => ({
    expediente:`${letra.toUpperCase()}-${actuacion}/${ejercicio}`,
    fecha:'03/06/2025',
    extracto:'Solicitud de beneficios',
    dni:'12.345.678',
    nombre:'Juan Pérez',
    afiliado:'456789',
    area:'Mesa de Entradas',
    estado:'En trámite'
  });

  /* ---------- Helpers ---------- */
  const fillDetails = data =>
    Object.entries(data).forEach(([k, v]) => { $detail[k].textContent = v; });

  const rowHTML  = r => `<tr><td>${r.ingreso}</td><td>${r.areaOrigen}</td><td>${r.operador}</td><td>${r.obs}</td></tr>`;
  const fullHTML = r => `<tr><td>${r.ingreso}</td><td>${r.area}</td><td>${r.areaOrigen}</td><td>${r.ope}</td><td>${r.operador}</td><td>${r.obs}</td><td>${r.remito}</td></tr>`;

  const renderRoutes = routes => {
    $preview.innerHTML = rowHTML(routes[0]);                 // última ruta
    $full.innerHTML    = routes.map(fullHTML).join('');      // todas
  };

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    /* 1) Pintar datos demo */
    fillDetails(buildFakeData({ letra:'E', actuacion:'255', ejercicio:'2025' }));
    renderRoutes(fakeRoutes);

    /* 2) Toggle tabla completa */
    $toggle.addEventListener('click', () => {
      document.getElementById('routes-full').classList.toggle('hidden');
      $toggle.textContent = $toggle.textContent === 'Ver todo' ? 'Ocultar' : 'Ver todo';
    });

    /* 3) Manejar búsqueda */
    $form.addEventListener('submit', async e => {
      e.preventDefault();
      $loading.classList.remove('hidden');

      const payload = {
        letra:     $form.letra.value || 'E',
        actuacion: $form.actuacion.value || '255',
        ejercicio: $form.ejercicio.value || '2025'
      };

      await new Promise(r => setTimeout(r, 600)); // Simula fetch
      fillDetails(buildFakeData(payload));
      renderRoutes(fakeRoutes);

      $loading.classList.add('hidden');
    });
  });
})();
