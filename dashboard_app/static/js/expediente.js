/* expediente.js – versión final con toggle OK */
(() => {
  'use strict';

  /* ---------- Selectores ---------- */
  const $form    = document.getElementById('expediente-form');
  const $loading = document.getElementById('loading');

  const $tbody       = document.querySelector('#routes-table tbody');
  const $toggleBtn   = document.getElementById('toggle-routes');
  const $toggleIcon  = document.getElementById('toggle-icon');
  const $toggleText  = $toggleBtn.querySelector('.btn-text');
  const $printBtn    = document.getElementById('print-routes');

  /* spans de detalle */
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
/* ---------- Datos demo (15 movimientos) ---------- */
/* ---------- Datos demo (15 movimientos con columnas completas) ---------- */
const fakeRoutes = [
  { ingreso:'05/06/2019', area:'310310', areaOrigen:'GESTIÓN DE BENEFICIOS',
    ope:'889', operador:'LOPEZ ELIZABETH LILIAN', obs:'PARA DAR CURSO A LO SOLICITADO EN AS Nº 25134/19*-', remito:'-' },

  { ingreso:'22/05/2019', area:'100520', areaOrigen:'VERIFICACIÓN DE HABERES',
    ope:'41', operador:'GARCIA DE LA PAZ LAURA', obs:'PARA VERIFICAR', remito:'4174512' },

  { ingreso:'03/04/2017', area:'310200', areaOrigen:'ARCHIVO GENERAL DSP',
    ope:'804', operador:'ASCONA ROLANDO ARIEL', obs:'P/ARCHIVAR', remito:'4168772' },

  { ingreso:'03/04/2017', area:'330130', areaOrigen:'NOVEDADES',
    ope:'65', operador:'JIMENEZ MARTA', obs:'PASE POR INVENTARIO', remito:'3921314' },

  { ingreso:'03/02/2017', area:'330130', areaOrigen:'NOVEDADES',
    ope:'603', operador:'ELENA JUAN FRANCISCO', obs:'P/CARGA', remito:'999999' },

  { ingreso:'01/02/2017', area:'310310', areaOrigen:'GESTIÓN DE BENEFICIOS',
    ope:'915', operador:'GIMENEZ GABRIELA SUZA', obs:'CON RESOL. Nº 0046/17 A.718 P.01', remito:'3903549' },

  { ingreso:'01/02/2017', area:'100100', areaOrigen:'SECRETARÍA DE DIRECTORIO',
    ope:'459', operador:'INSARRUALDE ALFREDO', obs:'PASE POR INVENTARIO', remito:'3903394' },

  { ingreso:'27/12/2016', area:'100100', areaOrigen:'SECRETARÍA DE DIRECTORIO',
    ope:'713', operador:'BULACIO ALICIA', obs:'P/FIRM', remito:'999999' },

  { ingreso:'21/12/2016', area:'310320', areaOrigen:'RESOLUCIONES',
    ope:'—', operador:'', obs:'PARA RESOLUCIÓN', remito:'-' },

  { ingreso:'21/12/2016', area:'330330', areaOrigen:'LIQUIDACIÓN GENERAL',
    ope:'—', operador:'', obs:'-', remito:'-' },

  { ingreso:'21/12/2016', area:'300001', areaOrigen:'SUB GERENCIA DE JUBILACIONES RETIRO',
    ope:'—', operador:'', obs:'.', remito:'-' },

  { ingreso:'20/12/2016', area:'330000', areaOrigen:'DEPTO. DE LIQUIDACIONES',
    ope:'—', operador:'', obs:'CONTROL Y FIRMA', remito:'-' },

  { ingreso:'18/11/2016', area:'330330', areaOrigen:'LIQUIDACIÓN GENERAL',
    ope:'—', operador:'', obs:'LIQ', remito:'-' },

  { ingreso:'18/11/2016', area:'310230', areaOrigen:'FICHERO DE BENEFICIOS',
    ope:'—', operador:'', obs:'PASE POR INVENTARIO', remito:'-' },

  { ingreso:'25/08/2016', area:'310230', areaOrigen:'FICHERO DE BENEFICIOS',
    ope:'—', operador:'', obs:'INF. FAV. P/BAJA A INSSSEP - 25/08/16.-', remito:'-' }
];


  const buildFakeData = ({ letra, actuacion, ejercicio }) => ({
    expediente:`${letra.toUpperCase()}-${actuacion}/${ejercicio}`,
    fecha:'03/06/2025', extracto:'Solicitud de beneficios',
    dni:'12.345.678', nombre:'Juan Pérez', afiliado:'456789',
    area:'Mesa de Entradas', estado:'En trámite'
  });

  /* ---------- Helpers ---------- */
  const fillDetails = data =>
    Object.entries(data).forEach(([k, v]) => { $detail[k].textContent = v; });

  const rowHTML = (r, extra='') => `
    <tr class="${extra}">
      <td>${r.ingreso}</td><td>${r.area}</td><td>${r.areaOrigen}</td>
      <td>${r.ope}</td><td>${r.operador}</td><td>${r.obs}</td><td>${r.remito}</td>
    </tr>`;

  /* Renderiza tabla; si collapsed = true, oculta filas i > 0 */
  const renderRoutes = (routes, collapsed = true) => {
    $tbody.innerHTML = routes.map((r, i) =>
      rowHTML(r, collapsed && i > 0 ? 'hidden-row' : '')
    ).join('');
  };

  const toggleRoutes = () => {
    const currentlyCollapsed = $tbody.querySelector('.hidden-row') !== null;
    /* → Si hay filas ocultas, expandir; si no, colapsar */
    $tbody.querySelectorAll('tr').forEach((tr, i) => {
      if (i > 0) tr.classList.toggle('hidden-row', !currentlyCollapsed);
    });

    $toggleText.textContent = currentlyCollapsed ? 'Ocultar' : 'Ver todo';
    $toggleIcon.textContent  = currentlyCollapsed ? 'unfold_less' : 'unfold_more';
  };

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    /* Datos demo iniciales */
    fillDetails(buildFakeData({ letra:'E', actuacion:'255', ejercicio:'2025' }));
    renderRoutes(fakeRoutes, true);  // sólo última ruta visible

    /* Listeners */
    $toggleBtn.addEventListener('click', toggleRoutes);
    $printBtn.addEventListener('click', () => window.print());

    $form.addEventListener('submit', async e => {
      e.preventDefault();
      $loading.classList.remove('hidden');

      const payload = {
        letra:     $form.letra.value  || 'E',
        actuacion: $form.actuacion.value || '255',
        ejercicio: $form.ejercicio.value || '2025'
      };

      await new Promise(r => setTimeout(r, 600)); // Simula fetch
      fillDetails(buildFakeData(payload));
      renderRoutes(fakeRoutes, true);

      $loading.classList.add('hidden');
    });
  });
})();
