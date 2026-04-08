/* eslint-env browser */
(function() {
  const input = document.querySelector('[data-ajax-search="input"]');
  const resultsContainer =
    document.querySelector('[data-ajax-search="results"]');
  const status = document.querySelector('[data-ajax-search="status"]');

  if (!input || !resultsContainer || !status) {
    return;
  }

  const endpoint = '/personajes/search/ajax';
  let timeoutId = null;
  let requestCounter = 0;

  const escapeHtml = (text) => {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('\'', '&#39;')
        .replaceAll('"', '&quot;');
  };

  const renderCards = (personajes) => {
    if (personajes.length === 0) {
      resultsContainer.innerHTML = '<p>No characters found.</p>';
      return;
    }

    const cards = personajes.map((personaje) => {
      const image = personaje.imagen ?
        `<div class="card-image">
          <figure class="image is-4by3">
            <img
              src="${escapeHtml(personaje.imagen)}"
              alt="${escapeHtml(personaje.nombre)}"
            >
          </figure>
        </div>` :
        '';

      const editButton = personaje.canEdit ?
        `<a class="button is-warning is-small mt-2"
          href="/personajes/${personaje.id}/edit">Edit</a>` :
        '';

      return `<div class="column is-one-third">
        <div class="card">
          ${image}
          <div class="card-content">
            <p class="title is-5">${escapeHtml(personaje.nombre)}</p>
            <p class="subtitle is-6">${escapeHtml(personaje.tipo)}</p>
            <p>${escapeHtml(personaje.descripcion)}</p>
            ${editButton}
          </div>
        </div>
      </div>`;
    }).join('');

    resultsContainer.innerHTML = cards;
  };

  const fetchResults = async (query) => {
    requestCounter += 1;
    const currentRequest = requestCounter;

    status.textContent = 'Searching...';

    try {
      const url = `${endpoint}?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      if (currentRequest !== requestCounter) {
        return;
      }

      renderCards(data.personajes);
      status.textContent = `${data.count} result(s) for "${data.query}"`;
    } catch (error) {
      console.error(error);
      if (currentRequest !== requestCounter) {
        return;
      }
      status.textContent =
        'Search failed. You can still submit with the Go button.';
    }
  };

  input.addEventListener('input', (event) => {
    const query = event.target.value.trim();

    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      fetchResults(query);
    }, 300);
  });
})();
