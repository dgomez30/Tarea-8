var apiKey = "?api_key=ad28a0a835cb406266fa225bc5ad24a5";
var peliculasCatergoria = "https://api.themoviedb.org/3/movie/";
var urlImage = "https://www.themoviedb.org/t/p/original/";
var lenguage = "&language=es";
var endPointBase = "https://api.themoviedb.org/3/genre/movie/list";

function cargarInformacion() {
    fetch(endPointBase + apiKey + lenguage)
        .then(res => res.json())
        .then(res => cargarList(res));
}

function cargarList(peticion) {
    var sel = document.getElementById('ddlCategorias');

    var array = Object.values(peticion.genres);
    console.log(array);

    array.forEach(item => {
        var opt = document.createElement('option');
        opt.innerHTML = opt.value = item.id;
        opt.innerHTML = opt.text = item.name;

        sel.appendChild(opt);
    });

    cambiarCategoria(sel.value);
}

function cambiarCategoria(valor) {
    let url = peliculasCatergoria + valor + "/lists" + apiKey + lenguage;
    fetch(url)
        .then(res => res.json())
        .then(res => cargarListPeliculas(res));
}

function cargarListPeliculas(peticion) {
    var sel = document.getElementById('ddlPeliculas');

    var array = Object.values(peticion.results);
    console.log(array);

    array.forEach(item => {
        var opt = document.createElement('option');
        opt.innerHTML = opt.value = item.id;
        opt.innerHTML = opt.text = item.name;

        sel.appendChild(opt);
    });
}

function cambiarPelicula(valor) {
    let url = peliculasCatergoria + valor + apiKey + lenguage;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(res => cargarInfoPelicula(res));
}

function cargarInfoPelicula(peticion) {
    var sel = document.getElementById('ddlPelicula');
    console.log(peticion);

    let image = urlImage + peticion.poster_path;

    var cardDinamico = '<div class="card" style="width: 40rem;">' +
        '<img src="' + image + '" class="card-img-top" height="450px" alt="...">' +
        '<h5 class="card-title">' + peticion.title + '</h5>' +
        '<div class="card-body">' +
        '<p class="card-text">' + peticion.overview + '</p>' +
        '<p class="card-text"><small class="text-muted">Lanzmiento: ' + peticion.release_date + '</small></p>'
    '</div>' +
    '</div>';

    document.getElementById("lblCards").innerHTML = cardDinamico;
    document.getElementById("divContenido").style.visibility = 'visible';
}