document.addEventListener("DOMContentLoaded", () => {
  const routes = {
    "/": "index.html",
    "/projetos": "projetos.html",
    "/cadastro": "cadastro.html",
  };

  const container = document.getElementById("main-content");

  if (!container) {
    console.error("❌ Elemento #main-content não encontrado!");
    return;
  }

  async function loadPage(path) {
    const route = routes[path] || routes["/"];
    try {
      const response = await fetch(route);
      if (!response.ok) throw new Error("Erro ao carregar a página");
      const html = await response.text();

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;


      const newContent =
        tempDiv.querySelector("main") || tempDiv.querySelector("body");

      container.innerHTML = newContent ? newContent.innerHTML : html;
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p style="color:red;">Erro ao carregar a página.</p>`;
    }
  }

 
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.getAttribute("href")?.startsWith("/")) {
      e.preventDefault();
      const path = link.getAttribute("href");
      history.pushState({}, "", path);
      loadPage(path);
    }
  });

  
  window.addEventListener("popstate", () => {
    loadPage(location.pathname);
  });

  
  loadPage(location.pathname);
});
