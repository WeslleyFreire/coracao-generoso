export const templates = {
  home: ({ title, lead }) => `
    <section class="hero">
      <h1>${title}</h1>
      <p>${lead}</p>
      <div class="actions">
        <a class="btn" href="#/projetos">Nossos Projetos</a>
        <a class="btn btn--outline" href="#/cadastro">Quero Ajudar</a>
      </div>
    </section>
  `,
  projetos: () => `
    <section>
      <h1>Projetos</h1>
      <div id="projects-list"></div>
    </section>
  `,
  cadastro: () => `
    <section>
      <h1>Cadastro</h1>
      <form id="cad-form">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <input name="nome" id="nome" placeholder="Nome completo" required>
          <input name="email" id="email" type="email" placeholder="E-mail" required>
          <input name="cpf" id="cpf" placeholder="CPF" required>
          <input name="telefone" id="telefone" placeholder="Telefone" required>
          <input name="nascimento" id="nascimento" type="date" required>
        </fieldset>
        <fieldset>
          <legend>Endereço</legend>
          <input name="endereco" id="endereco" placeholder="Endereço" required>
          <input name="cep" id="cep" placeholder="CEP" required>
          <input name="cidade" id="cidade" placeholder="Cidade" required>
          <select name="estado" id="estado" required>
            <option value="">Estado</option><option>SP</option><option>RJ</option><option>MG</option>
          </select>
        </fieldset>
        <button class="btn">Enviar</button>
      </form>
    </section>
  `
};