const connection = require("../data/db");

//# INDEX

const index = (req, res) => {
  const sql = `SELECT * FROM movies`;
  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database query failed", err });

    const movies = results.map((movie) => {
      movie.image = "http://localhost:3000/img/movies/" + movie.image;
      return movie;
    });
    res.json({
      data: movies,
      status: 200,
    });
  });
};

//# SHOW

const show = (req, res) => {
  const movieId = parseInt(req.params.id);
  const sqlMovie = `SELECT movies.*
FROM movies
INNER JOIN reviews
ON movies.id = reviews.movie_id
WHERE movies.id = ?
GROUP BY movies.id`;
  connection.query(sqlMovie, [movieId], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database query failed", err });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = results[0];

    movie.image = "http://localhost:3000/img/movies/" + movie.image;

    const sqlReview = `SELECT *
FROM reviews
WHERE movie_id = ?`;

    connection.query(sqlReview, [movieId], (err, results) => {
      if (err)
        return res.status(500).json({ error: "Database query failed", err });
      movie.reviews = results;

      res.json({
        data: movie,
        status: 200,
      });
    });
  });
};

//# POST
const post = (req, res) => {
  const movie_id = parseInt(req.params.id);
  const { name, vote, text } = req.body;

  console.log("BODY:", req.body);
  console.log("MOVIE ID:", movie_id);
  console.log("DEBUG - Dati ricevuti dal client:", {
    movie_id,
    name,
    vote,
    text,
  });

  const sqlMovieReview = `INSERT INTO movies.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);`;

  const sqlReviewValue = [movie_id, name, vote, text];

  connection.query(sqlMovieReview, sqlReviewValue, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database query failed", err });

    res.status(201).json({
      message: "Recensione salvata con successo",
      review_id: results.insertId,
    });
  });
};

module.exports = { index, show, post };
