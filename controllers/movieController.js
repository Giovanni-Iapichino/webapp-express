const connection = require("../data/db");

//# INDEX

const index = (req, res) => {
  const sql = `SELECT * FROM movies`;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      data: results,
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
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = results[0];

    const sqlReview = `SELECT *
FROM reviews
WHERE movie_id = 2`;

    connection.query(sqlReview, [movieId], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      movie.reviews = results;

      res.json({
        data: movie,
        status: 200,
      });
    });
  });
};

module.exports = { index, show };
