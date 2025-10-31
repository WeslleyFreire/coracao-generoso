const KEY = 'coracaoGenerosoCadastros';

export function saveRegistration(data) {
  const list = JSON.parse(localStorage.getItem(KEY) || '[]');
  list.push(data);
  localStorage.setItem(KEY, JSON.stringify(list));
}