export default class Router {
  constructor(rootId = 'app') {
    this.routes = {};
    this.root = document.getElementById(rootId);
    window.addEventListener('hashchange', () => this._onRouteChange());
    window.addEventListener('load', () => this._onRouteChange());
  }

  add(route, handler) {
    this.routes[route] = handler;
  }

  async _onRouteChange() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const handler = this.routes[hash] || this.routes['/404'] || this.routes['/'];
    if (!handler) return;
    const content = await handler();
    this._render(content);
  }

  _render(content) {
    if (typeof content === 'string') this.root.innerHTML = content;
    else if (content instanceof HTMLElement) {
      this.root.innerHTML = '';
      this.root.appendChild(content);
    }
  }
}