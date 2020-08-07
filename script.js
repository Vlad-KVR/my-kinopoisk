'use strict';

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

const apiSearch = (e) => {
    e.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=283f38ee982e94c550f5c940d9745ad5&language=ru&query=' + searchText;
    
    movie.innerHTML = 'Загрузка';

    fetch(server)
    .then(val => {
        return val.status === 200 ? val.json() : 
            Promise.reject(val);
    })
    .then(output => {
        let inner = '';
    
        output.results.forEach(element => {
            let nameItem = element.name || element.title;

            inner += `<div class="col-12 col-md-4 col-xl-3 item">
            <img src="${urlPoster + element.poster_path}" alt="${nameItem}">
            <h5>${nameItem}</h5>
            </div>`;
        });

        movie.innerHTML = inner;
    })
    .catch(reason => {
        movie.innerHTML = "Упс, что то пошло не так!";
        console.error('error: ' + reason.status);
    });

    
};

searchForm.addEventListener('submit', apiSearch);

