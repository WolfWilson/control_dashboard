// static/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('menu_bar');
  const root = document.documentElement;           // <html>

  // Listener de toggle
  btn?.addEventListener('click', () => {
    root.classList.toggle('sidebar-expanded');
    localStorage.setItem(
      'sidebarExpanded',
      root.classList.contains('sidebar-expanded')
    );
  });
});
