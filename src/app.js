const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

function init() {

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ', registration);
          registration.pushManager.subscribe({userVisibleOnly: true});
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }

    let manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/manifest.json';
    document.head.appendChild(manifest);
    let title = document.createElement('h1');
    title.textContent = 'All Chuck Norris Quotes:';
    document.body.appendChild(title);
    let list = document.createElement('ol');
    document.body.appendChild(list);
    fetchTop10().then(stories => renderTop10(stories));
}

function fetchTop10() {
    return fetch(TOP_STORIES_URL).then(response => {
        return response.json();
    }).then(ids => {
        let top10Ids = ids.slice(0, 10);
        let urls = top10Ids.map(
            id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        let requests = urls.map(url => fetch(url).then(response => response.json()));
        return Promise.all(requests);
    });
}

function renderTop10(stories) {
    let list = document.querySelector('ol');
    list.innerHTML = '';
    stories.forEach(story => {
        let item = document.createElement('li');
        item.textContent = story.title;
        list.appendChild(item);
    });
}

init();