fetch('http://localhost:1234/movies')
    .then(res => res.json())
    .then(movies => {
        const html = movies.map(movie => {
            return `
            <article data-id="${movie.id}">
                <h1>${movie.title}</h1>
                <img src="${movie.poster}">
                <p>Duracion :${movie.duration}</p>
                <p>Director :${movie.director}</p>

                <button class="del-button">Eliminar</button>
            </article>
            `
        }).join("")
        document.querySelector(".container").innerHTML = html;
    })


    document.addEventListener("click", (e)=>{
        const article = e.target.closest("article");
        const id = article.dataset.id;
        if(e.target.matches(".del-button")){
            eliminarArticulo(id, article)
        }
    })

    function eliminarArticulo(id, article) {
        fetch(`http://localhost:1234/movies/${id}`, {method : "DELETE"})
        .then(res => {
            if(res.status == 200) article.remove();
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
    }