let APIKey = "6e93d49a";
let searchInput = document.getElementById("movie-search-box");
let searchList = document.getElementById("search-list");
let resultGrid = document.getElementById('result-grid');

const getData = async(movie) => {

    // let fetchData = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${APIKey}&t=${movie}`);
    let fetchData = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${APIKey}`);
    let jsonData = await fetchData.json();
    if (jsonData.Response == "True") displyMovie(jsonData.Search);

}


function findMovies() {
    let searchTerm = (searchInput.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        getData(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }


}







function displyMovie(movies) {
    searchList.innerHTML = '';
    for (let idx = 0; idx < movies.length; idx++) {
        let movieList = document.createElement('div');
        movieList.dataset.id = movies[idx].imdbID; //
        movieList.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;
        } else {
            moviePoster = '<h1>Image not found</h1>'
        }

        movieList.innerHTML = `
        <div class = "search-item-thumbnail">
        
        <img src = "${moviePoster}">
        <div>
        <div class = "search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
        </div>
        
        `;
        searchList.appendChild(movieList);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async() => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            searchInput.value = "";
            const movieId = movie.dataset.id;
            window.location.href = `movie.html?id=${movieId}`;


        });
    });
}

// function displayMovieDetails(details) {
//     resultGrid.innerHTML = `
//     <div class = "movie-poster">
//         <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
//     </div>
//     <div class = "movie-info">
//         <h3 class = "movie-title">${details.Title}</h3>
//         <ul class = "movie-misc-info">
//             <li class = "year">Year: ${details.Year}</li>
//             <li class = "rated">Ratings: ${details.Rated}</li>
//             <li class = "released">Released: ${details.Released}</li>
//         </ul>
//         <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
//         <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
//         <p class = "actors"><b>Actors: </b>${details.Actors}</p>
//         <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
//         <p class = "language"><b>Language:</b> ${details.Language}</p>
//         <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
//     </div>
//     `;
// }



window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});