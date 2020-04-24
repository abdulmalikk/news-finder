import '../component/search-bar.js';
import Swal from 'sweetalert2';

export default function main() {
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  const infoText = document.querySelector('.info-text');
  const newsContainer = document.querySelector('.news-container');

  searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    infoText.innerText = '';
    renderLoading();
    try {
      const news = await searchNews(searchInput.value);
      renderResult(news);
      infoText.innerText = `Result from '${searchInput.value}'`;
      searchInput.value = '';
    } catch (err) {
      renderError(err);
      infoText.innerText = '';
      newsContainer.innerHTML = '';
    }
  });

  function searchNews(keyword) {
    return fetch(
      `https://newsapi.org/v2/everything?apiKey=11fb8c12e20f44a9a8939bdec4cb8ad1&q=${keyword}`
    )
      .then((response) => response.json())
      .then((results) => {
        if (results.totalResults === 0) {
          throw new Error('News is not found!');
        }
        return results.articles;
      });
  }

  function renderLoading() {
    newsContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      newsContainer.innerHTML += `
        <div class="rounded-lg overflow-hidden mx-5 mt-10 sm:w-auto bg-white shadow-lg">
          <div class="shimmer">
            <div class="animate w-full h-48 bg-gray-500"></div>
            <div class="px-3 pt-3 pb-5">
              <div class="animate w-full h-4 bg-gray-400 mb-1"></div>
              <div class="animate w-56 h-4 bg-gray-400 mb-6"></div>
              <div class="animate w-32 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderResult(news) {
    let list = '';
    const newsFiltered = news.filter((n, i) => i < 18);
    newsFiltered.forEach((news) => (list += showCards(news)));
    newsContainer.innerHTML = list;
  }

  function renderError(message) {
    Swal.fire({
      title: message,
      icon: 'error',
      confirmButtonText: 'Close',
    });
  }

  function showCards(news) {
    return `
      <div class="rounded-lg overflow-hidden m-5 mt-0 sm:w-auto bg-white shadow-lg">
        <img class="w-full" src="${news.urlToImage ||'https://dummyimage.com/848x480/ababab/000000&text=image+not+found'}" alt="${news.source.name}">
        <div class="px-3 pt-3 pb-5">
          <div class="font-bold text-gray-900 text-md mb-2">${news.title}</div>
          <p class="text-gray-700 text-base align-baseline inline-block">${news.source.name}</p>
        </div>
      </div>
    `;
  }
}
