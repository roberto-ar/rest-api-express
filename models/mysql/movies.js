import mysql from "mysql2/promise";

const config = {
    host : "localhost",
    user : "root",
    port : "3306",
    database : "moviesdb",
    password : "2005"
}

const connection = await mysql.createConnection(config);
export class movieModel{
    static async getAll({genre}) {
        if (genre){
            const [movies] = await connection.query(`
                SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate 
                FROM movie m
                LEFT JOIN movie_genres mg 
                ON mg.movie_id = m.id 
                WHERE mg.genre_id = (SELECT id FROM genre WHERE name = ?);`, [genre]);
                
                return movies;
        }
        const [movies] = await connection.query('SELECT * FROM movie');
        return movies;
    }
    static async getById(id){
        const [movies] = await connection.query('SELECT * FROM movie WHERE id = ?;', [id]);
        return movies;
    }
    static async create(input){
        const {title, year, director, duration, poster, rate, genre} = input;
        try{
            const [result] = await connection.query('INSERT INTO movie (title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?);',
                [title, year, director, duration, poster, rate,]
               );
            const id = result.insertId;
            for(let i = 0; i < genre.length ; i++){
                connection.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES ("${id}",(SELECT id from genre where name = ?));`, genre[i])
                const [ movie ] = await connection.query(`SELECT * FROM movie WHERE id = ${id};`);
            }
        }catch(e){
            throw new Error('Error creating movie');
        }        return input;
    }
    static async update({id, input}){
        const values = [...Object.values(input.data), id]
        const updates = Object.keys(input.data).map(key => `${key} = ?`).join(", ");
        try{
            const [result] = await connection.query(`UPDATE movie SET ${updates} WHERE id = ?;`, values);
            if(result.affectedRows == 0){
                throw new Error("Error: None column updated")
            }
            const [movie] = await connection.query('SELECT * FROM movie WHERE id = ?;', id);
            return movie;
        }catch(e){
            throw new Error("Error: Movie not updated");
        }

    }
    static async delete({id}){
        const [movie] = await connection.query('SELECT * FROM movie WHERE id = ?;', [id]);
        connection.query('DELETE FROM movie WHERE id = ?;', [id]);
        connection.query('DELETE FROM movie_genres WHERE movie_id = ?;', [id]);
        return movie;
    }
}