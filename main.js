//http://www.omdbapi.com/?apikey=[yourkey]&
//Initial References

let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = async () => {
  let movieName = movieNameRef.value;
  let API_KEY = "f01db207";
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;

  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    try {
      let resp = await fetch(url);
      let data = await resp.json();

      //If movie exists in database
      if (data.Response == "True") {
        result.innerHTML = `
          <div class="info">
              <img src=${data.Poster} class="poster">
              <div>
                  <h2>${data.Title}</h2>
                  <div class="rating">
                      <img src="star.gif">
                      <h4>${data.imdbRating}</h4>
                  </div>
                  <div class="details">
                      <span>${data.Rated}</span>
                      <span>${data.Year}</span>
                      <span>${data.Runtime}</span>
                  </div>
                  <div class="genre">
                      <div>${data.Genre.split(",").join("</div><div>")}</div>
                  </div>
              </div>
          </div>
          <h3>Plot:</h3>
          <p>${data.Plot}</p>
          <h3>Cast:</h3>
          <p>${data.Actors}</p>
        `;
      }
      //If movie does NOT exists in database
      else {
        result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
      }
    } catch (error) {
      //If error occurs
      result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
    }
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
