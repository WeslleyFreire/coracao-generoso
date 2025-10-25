// Simple input masks for CPF, telefone, CEP and form submit handling
document.addEventListener('DOMContentLoaded', function() {
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('cadastro-form');

  function setCursorToEnd(el){
    if (el.setSelectionRange) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }

  function maskCPF(value){
    return value
      .replace(/\D/g,'')
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d)/,'$1.$2')
      .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
      .slice(0,14);
  }

  function maskTel(value){
    return value
      .replace(/\D/g,'')
      .replace(/^0+/,'')
      .replace(/(\d{2})(\d)/,'($1) $2')
      .replace(/(\d{5})(\d)/,'$1-$2')
      .slice(0,15);
  }

  function maskCEP(value){
    return value
      .replace(/\D/g,'')
      .replace(/(\d{5})(\d)/,'$1-$2')
      .slice(0,9);
  }

  if(cpf){
    cpf.addEventListener('input', e => {
      const pos = cpf.selectionStart;
      cpf.value = maskCPF(cpf.value);
      setCursorToEnd(cpf);
    });
  }
  if(tel){
    tel.addEventListener('input', e => {
      tel.value = maskTel(tel.value);
      setCursorToEnd(tel);
    });
  }
  if(cep){
    cep.addEventListener('input', e => {
      cep.value = maskCEP(cep.value);
      setCursorToEnd(cep);
    });
  }

  // Enhance native validation feedback
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
        return;
      }
      e.preventDefault();
      // Demo: show success message (in real case send to server)
      alert('Cadastro enviado com sucesso! Obrigado por contribuir com o Coração Generoso.');
      form.reset();
    });
  }
});
