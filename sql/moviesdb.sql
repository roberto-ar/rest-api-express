DROP database if exists moviesdb;
CREATE database moviesdb;
USE moviesdb;

CREATE TABLE movie (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director varchar(255) NOT NULL,
    duration INT UNSIGNED NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
	movie_id INT references movie(id),
    genre_id INT references genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES
('Biography'),
('Fantasy'),
('Drama'),
('Action'),
('Crime'),
('Sci-Fi'),
('Adventure'),
('Romance');

INSERT INTO movie (title, year, director, duration, poster, rate) VALUES
('Roberto Dios', 2004, "elias romero", 120, "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg", 9.1),
('Gabriela Avla', 2007, "memo ochoa", 150, "https://i.pinimg.com/236x/e2/ba/cd/e2bacd7732f5a0fa04c40f99146a45d0.jpg", 8.1),
('El matador', 2034, "mdmfn ochoa", 110, "https://cdn.pixabay.com/photo/2022/05/08/18/30/broken-heart-7182718_1280.png", 2.4);

INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id from movie where title = "Roberto Dios"), (SELECT id from genre where name = "Drama")),
((SELECT id from movie where title = "Roberto Dios"), (SELECT id from genre where name = "Crime")),
((SELECT id from movie where title = "Gabriela Avla"), (SELECT id from genre where name = "Romance")),
((SELECT id from movie where title = "El matador"), (SELECT id from genre where name = "Action"));

select * from movie_genres;
select * from movie;
select * from genre;

