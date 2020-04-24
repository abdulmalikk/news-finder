class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="sm:-mt-16 -mt-12 sm:w-3/5 w-10/12 mx-auto p-5 rounded-lg text-center bg-white shadow-lg">
        <h1 class="md:text-2xl text-xl text-gray-900 mb-5">News Finder App</h1>
        <form id="searchForm" class="flex">
          <input id="searchInput"
            class="w-1/4 bg-gray-300 focus:bg-white focus:outline-none focus:shadow-outline rounded-lg py-2 px-4 w-full appearance-none leading-normal"
            type="text" placeholder="search keyword" autocomplete="off" required>
          <button type="submit" class="bg-purple-900 hover:bg-purple-700 transition duration-300 text-gray-100 px-5 py-2 ml-2 rounded-lg">Search</button>
        </form>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);
