import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieController = ({movieModel}) => {
    const movieController = new MovieController({movieModel: movieModel });
    
    const moviesRoutes = Router();
    
    moviesRoutes.get("/", movieController.getAll);
    moviesRoutes.get("/:id", movieController.getById);
    moviesRoutes.delete("/:id", movieController.delete);
    moviesRoutes.post("/", movieController.create);
    moviesRoutes.patch("/:id", movieController.update);

    return moviesRoutes;

}

