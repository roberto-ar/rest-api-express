import express from "express";
import { createMovieController } from "./routes/movies.js";
import { corsMiddlewere } from "./middlewares/cors.js";

//const require = createRequire(import.meta.url);
//const movies = require('./movies.json');

//import fs from "node:fs"
//const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

export const runApp = ({movieModel}) =>{
const app = express();
app.disable("x-powered-by");

//midlewers
app.use(corsMiddlewere)
app.use(express.json());
app.use('/movies', createMovieController({movieModel}));


const port = process.env.PORT ?? 1234;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

}
