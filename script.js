'use strict';

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

const apiSearch = (e) => {
    e.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=283f38ee982e94c550f5c940d9745ad5&language=ru&query=' + searchText;
    requestApi('GET', server);
    
};

searchForm.addEventListener('submit', apiSearch);


const requestApi = (method, url) => {

    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if(request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        
        let inner = '';

        output.results.forEach(element => {
            let nameItem = element.name || element.title;
            inner += `<div class="col-12 col-md-4 col-xl-3">${nameItem}</div>`;
        });

        movie.innerHTML = inner;

    });
};