const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");
const cors = require("cors");
const { validateMovie, partialValidateMovie } = require("./schemas/movie");
const { callbackify } = require("node:util");
const { error } = require("node:console");
require("./schemas/movie");

const app = express();
app.disable("x-powered-by");

//midlewers
app.use(cors({
  origin : (origin, callback) =>{
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://192.168.1.107:8080'
    ]
    if(!origin){
      return callback(null, true);
    }
    if(ACCEPTED_ORIGINS.includes(origin)){
      return callback(null, true);
    }
    return callback(new Error('Not allowed by Cors'));

  }
}))
app.use(express.json());
app.options("/movies/:id", (req, res) =>{
  res.send("200");
})

app.delete("/movies/:id", (req, res) =>{
  const id = req.params.id
  const delmovie = movies.findIndex(movie => movie.id == id);
  if(delmovie >= 0){
    movies.splice(delmovie, 1);
    return res.sendStatus(200);
  }
})



app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    return res.json(movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
      ));
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if (movie) return res.json(movie);
  res.status(404).json({
    message: "Error movie not found",
  });
});

app.post("/movies", (req, res) =>{
  const result = validateMovie(req.body);
  if(!result.success){
    res.status(400).json({
      message : result.error.errors
    })
  }
  const movie = {id : crypto.randomUUID(), ...result.data};
  movies.push(movie);
  return res.json(movie);

})

app.patch("/movies/:id", (req, res) => {
  const indexMovie = movies.findIndex(movie => movie.id == req.params.id);
  if(indexMovie == -1){
    return res.status(400).json({
      message : "Error: Movie not found"
    })
  }
  const result = partialValidateMovie(req.body);
  if(!result.success){
    return res.status(422).json({
      message: result.error.errors
    })
  }
  
  movies[indexMovie] = {
    ...movies[indexMovie],
    ...result.data
  };
  res.json(movies[indexMovie]);
})

const port = process.env.PORT ?? 1234;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
