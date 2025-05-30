// Toggle sidebar UX
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu_bar');
  const aside = document.querySelector('aside');
  if (btn && aside) {
    btn.addEventListener('click', () => aside.classList.toggle('expanded'));
  }
});

form.addEventListener('submit', () => toggleLoading(true));
window.addEventListener('pageshow', () => toggleLoading(false));


document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.getElementById('menu_bar');
  const aside = document.getElementById('sidebar') || document.querySelector('aside');
  const cont  = document.getElementById('main-container');

  if (btn && aside && cont) {
    btn.addEventListener('click', () => {
      aside.classList.toggle('expanded');
      cont.classList.toggle('expanded-main');
    });
  }
});
