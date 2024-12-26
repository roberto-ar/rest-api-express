import { validateMovie, partialValidateMovie } from "../schemas/movie.js";
import { movieModel } from "../models/movies.js";
export class movieController{
    static async getAll (req, res) {
        const { genre } = req.query;
        res.json(await movieModel.getAll({genre}));
    }

    static async getById (req, res){
      const { id } = req.params;
      const movie = await movieModel.getById(id);
      if(movie.error) return res.status(404).json(movie)
        res.json(movie);
    }
    
    static async delete (req, res){
        const { id } = req.params
        const delMovie = await movieModel.delete({id});
        if(delMovie){
          return res.status(200).json(delMovie);
        }
        res.status(404).json({
          Error: "Error movie not found"
        });
    }

    static async create (req, res){
          const result = validateMovie(req.body);
          if(!result.success){
            return res.status(400).json({
              message : result.error.errors
            })
          }
          res.json(await movieModel.create(result.data));
    }

    static async update (req, res){
        const input = partialValidateMovie(req.body);
        const { id } = req.params;
        if(!input.success){
         return res.json({
           Error: data.error.errors
         })
        }
        const updateMovie = await movieModel.update({id, input})
         if(!updateMovie){
           console.log(updateMovie)
           return res.status(400).json({
             message : "Movie not found"
           })
         }
         res.status(201).json(updateMovie);
    }
    
}