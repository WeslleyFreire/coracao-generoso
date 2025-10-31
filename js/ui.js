export function showToast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.position = 'fixed';
    el.style.bottom = '20px';
    el.style.right = '20px';
    el.style.background = '#333';
    el.style.color = '#fff';
    el.style.padding = '10px 16px';
    el.style.borderRadius = '6px';
    el.style.zIndex = '9999';
    document.body.appendChild(el);
  }
  el.innerText = msg;
  el.style.display = 'block';
  setTimeout(() => (el.style.display = 'none'), 3500);
}

export function openModal(title, content) {
  alert(`${title}\n\n${content.replace(/<[^>]*>/g, '')}`);
}