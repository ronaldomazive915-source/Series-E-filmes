const API_KEY = 'SUA_API_KEY_AQUI'; // TMDB API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchData(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=pt-BR`);
    return res.json();
}

async function loadTrending() {
    const data = await fetchData('/trending/all/week');
    const list = document.getElementById('trending-list');
    data.results.slice(0,20).forEach(item => {
        const div = createCard(item);
        list.appendChild(div);
    });
}

async function loadMovies() {
    const data = await fetchData('/movie/popular?page=1');
    const list = document.getElementById('movies-list');
    data.results.forEach(item => list.appendChild(createCard(item)));
}

function createCard(item) {
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${IMG_URL + item.poster_path}" alt="${item.title || item.name}" onclick="playVideo('${item.id}', '${item.title || item.name}')">
        <h3>${item.title || item.name}</h3>
        <p>⭐ ${item.vote_average.toFixed(1)} (${item.release_date?.split('-')[0] || 'N/A'})</p>
    `;
    return div;
}

function playVideo(id, title) {
    // Embed seu link dublado (ex: Mixdrop)
    const player = document.getElementById('video-player');
    const synopsisEl = document.getElementById('synopsis');
    const embedUrl = `https://seuhostdublado.com/embed/${id}`; // Substitua pelos seus embeds
    player.src = embedUrl;
    document.getElementById('title').textContent = title;
    synopsisEl.textContent = 'Sinopse: Filme dublado em PT-BR HD. Baixe o app RONY para mais!';
    window.location.href = 'watch.html'; // Redireciona pro player
}

// Busca
function doSearch() {
    const q = document.getElementById('query').value;
    window.location.href = `search.html?q=${q}`;
}

// Adapte loadSeries(), loadCategories() similarmente com /tv/popular, genre=28 (ação), etc.
