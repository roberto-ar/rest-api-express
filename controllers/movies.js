import { validateMovie, partialValidateMovie } from "../schemas/movie.js";
export class MovieController{
  constructor({movieModel}){
    this.movieModel = movieModel; 
  }

  getAll = async (req, res) =>{
        const { genre } = req.query;
        res.json(await this.movieModel.getAll({genre}));
    }

  getById = async (req, res) =>{
      const { id } = req.params;
      const movie = await this.movieModel.getById(id);
      if(movie.error) return res.status(404).json(movie)
        res.json(movie);
    }
    
   delete = async (req, res) =>{
        const { id } = req.params
        const delMovie = await this.movieModel.delete({id});
        if(delMovie){
          return res.status(200).json(delMovie);
        }
        res.status(404).json({
          Error: "Error movie not found"
        });
    }

   create = async (req, res) =>{
          const result = validateMovie(req.body);
          if(!result.success){
            return res.status(400).json({
              message : result.error.errors
            })
          }
          res.json(await this.movieModel.create(result.data));
    }

   update = async (req, res) =>{
        const input = partialValidateMovie(req.body);
        const { id } = req.params;
        if(!input.success){
         return res.json({
           Error: data.error.errors
         })
        }
        const updateMovie = await this.movieModel.update({id, input})
         if(!updateMovie){
           console.log(updateMovie)
           return res.status(400).json({
             message : "Movie not found"
           })
         }
         res.status(201).json(updateMovie);
    }
    
}