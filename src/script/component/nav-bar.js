class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="flex h-40 w-100 pt-5 md:pl-16 pl-10 bg-purple-900 shadow-lg rounded-b-lg">
        <span class="font-comic font-bold text-gray-100 sm:text-4xl text-3xl inline-block align-top">News Finder</span>
      </div>
    `;
  }
}

customElements.define('nav-bar', NavBar);
