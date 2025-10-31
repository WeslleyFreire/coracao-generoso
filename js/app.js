import Router from './router.js';
import { templates } from './templates.js';
import { validateFormElements } from './validation.js';
import { saveRegistration } from './storage.js';
import { showToast, openModal } from './ui.js';

const router = new Router('app');

router.add('/', async () => {
  return templates.home({ title: 'Transformando vidas com solidariedade', lead: 'Apoio a famílias em situação de vulnerabilidade.' });
});
router.add('/projetos', async () => templates.projetos());
router.add('/cadastro', async () => templates.cadastro());
router.add('/404', () => `<h2>Página não encontrada</h2>`);

window.addEventListener('hashchange', attachBehaviors);
window.addEventListener('load', attachBehaviors);

function attachBehaviors() {
  const form = document.getElementById('cad-form');
  if (form) {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    function mask(input, pattern) {
      if (!input) return;
      input.addEventListener('input', () => {
        let v = input.value.replace(/\D/g, '');
        let i = 0;
        input.value = pattern.replace(/#/g, _ => v[i++] || '');
      });
    }
    mask(cpf, '###.###.###-##');
    mask(tel, '(##) #####-####');
    mask(cep, '#####-###');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const errors = validateFormElements(form);
      form.querySelectorAll('input,select,textarea').forEach(el => el.removeAttribute('aria-invalid'));

      if (errors.length) {
        errors.forEach(err => {
          const el = form.querySelector(`[name="${err.field}"]`);
          if (el) el.setAttribute('aria-invalid', 'true');
        });
        showToast('Existem campos com problemas. Veja os destaques e corrija.');
        openModal('Erros no formulário', errors.map(e => `<li>${e.message}</li>`).join(''));
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      saveRegistration(data);
      showToast('Cadastro salvo com sucesso!');
      openModal('Obrigado', 'Recebemos seu cadastro. Entraremos em contato.');
      form.reset();
    });
  }

  const projectsList = document.getElementById('projects-list');
  if (projectsList) {
    const projects = [
      { title: 'Banco de Alimentos', desc: 'Distribuição quinzenal a famílias.' },
      { title: 'Oficinas de Capacitação', desc: 'Cursos para geração de renda.' }
    ];
    projectsList.innerHTML = projects.map(p => `
      <article class="card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <a href="#/cadastro" class="btn">Participar</a>
      </article>
    `).join('');
  }
}