import { Router } from "express";
import { validateMovie, partialValidateMovie } from "../schemas/movie.js";
import { movieModel } from "../models/movies.js";
import { movieController } from "../controllers/movies.js";

export const moviesRoutes = Router();

moviesRoutes.get("/", movieController.getAll);
moviesRoutes.get("/:id", movieController.getById);
moviesRoutes.delete("/:id", movieController.delete);
moviesRoutes.post("/", movieController.create)
moviesRoutes.patch("/:id", movieController.update)

