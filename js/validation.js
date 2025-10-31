export function validateFormElements(form) {
  const errors = [];
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const cpf = form.cpf.value.trim();
  const tel = form.telefone.value.trim();
  const cep = form.cep.value.trim();

  if (nome.length < 3) errors.push({ field: 'nome', message: 'Nome muito curto.' });
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push({ field: 'email', message: 'E-mail inválido.' });
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) errors.push({ field: 'cpf', message: 'CPF inválido.' });
  if (!/\d{8,}/.test(tel)) errors.push({ field: 'telefone', message: 'Telefone inválido.' });
  if (!/^\d{5}-\d{3}$/.test(cep)) errors.push({ field: 'cep', message: 'CEP inválido.' });

  return errors;
}