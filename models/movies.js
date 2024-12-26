import movies from '../movies.json' with { type: 'json' };
import { randomUUID } from 'node:crypto';
export class movieModel{
    static async getAll({genre}) {
        if (genre) {
            return movies.filter((movie) =>
                movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
              );
          }
          return movies
    }
    static async getById(id){
        const result = movies.find((movie) => movie.id == id);
        if(result) return result;
        return {
            Error : "Movie not found"
        }
    }
    static async create(input){
        const movie = {id : randomUUID(), ...input};
        movies.push(movie)
        return movie;
    }
    static async update({id, input}){
        const indexMovie = movies.findIndex(movie => movie.id == id);
        if (indexMovie < 0) return false;
        movies[indexMovie] = {
            ...movies[indexMovie],
            ...input.data
          };

        return movies[indexMovie];
    }
    static async delete({id}){
        const delmovie = movies.findIndex(movie => movie.id == id);

        if(delmovie >= 0){
          return movies.splice(delmovie, 1);
        }

        return false;
    }
}