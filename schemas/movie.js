import z from "zod";

const movieSchema = z.object({
        title : z.string(),
        year : z.number().int().positive(),
        director : z.string(),
        duration : z.number().int().positive(),
        poster : z.string().url(),
        genre : z.array(z.enum(['Drama', 'Action', 'Crime', 'Sci-Fi', 'Adventure', 'Romance', 'Biography', 'Fantasy'])),
        rate : z.number().min(0).max(10)
});

export function validateMovie(object){
        return movieSchema.safeParse(object);
}

export function partialValidateMovie(object){
    return movieSchema.partial().safeParse(object);
}
