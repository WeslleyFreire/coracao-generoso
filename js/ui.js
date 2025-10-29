// UI interactions: hamburger, submenu toggle, toasts, modals, form handling & masks
document.addEventListener('DOMContentLoaded', () => {
  const hamburgers = document.querySelectorAll('.hamburger');
  hamburgers.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.closest('.site-header').querySelector('.nav-list');
      if(nav){
        const isOpen = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  document.querySelectorAll('.has-sub').forEach(item => {
    item.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const submenu = item.querySelector('.submenu');
        if(submenu) submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  const toast = document.getElementById('toast');
  const modal = document.getElementById('modal');
  const modalClose = modal?.querySelector('.modal-close');

  function showToast(text, time = 3000){
    if(!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), time);
  }

  function showModal(){
    if(!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });

  function mask(input, pattern){
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g,'');
      let i = 0;
      input.value = pattern.replace(/#/g, _ => v[i++] || '');
    });
  }
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  if(cpf) mask(cpf, '###.###.###-##');
  if(tel) mask(tel, '(##) #####-####');
  if(cep) mask(cep, '#####-###');

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if(!form.checkValidity()){
        form.querySelectorAll('input,select,textarea').forEach(el => {
          if(el.checkValidity()) el.removeAttribute('aria-invalid');
          else el.setAttribute('aria-invalid','true');
        });
        e.preventDefault();
        showToast('Por favor corrija os campos obrigatórios.');
        return;
      }
      e.preventDefault();
      showToast('Formulário enviado com sucesso!');
      showModal();
      form.reset();
    });
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      closeModal();
      document.querySelectorAll('.nav-list.open').forEach(n => n.classList.remove('open'));
      document.querySelectorAll('.hamburger').forEach(h => h.setAttribute('aria-expanded','false'));
    }
  });
});