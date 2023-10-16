const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=69f84a7d&s=";
const API_URL_SEARCH ="http://www.omdbapi.com/?apikey=69f84a7d&i=";

var search_input = document.getElementById("search_input");                 
var moviecard = document.getElementsByClassName("movie_cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click",function(){
    // console.log(search_input.value);
    const query = search_input.value;
    if(query){
        getMovies(API_URL+query);
    }
         
});

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log("respData",respData);           
    showMovies(respData.Search);
}

function showMovies(movies){
    moviecard.innerHTML = "";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}
function movie_display(imovie){
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML =`
    <div class="card">
        <Img src = "${imovie.Poster}" alt="Poster" width="300px" height="300px"/>
        <br>
        <div class="movie-description">
            <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
            <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
            <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
            <span class="movie-title"><b>Released</b><span class="value">${imovie.Released}</span></span>
            <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>

        </div>

    </div>
    `;
    moviecard.appendChild(movieElm);
      
}
