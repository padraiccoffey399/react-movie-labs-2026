import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import CardActions from "@mui/material/CardActions";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const genreId = Number(genreFilter);
  const rating = ratingFilter;

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return rating > 0 ? m.vote_average >= rating : true;
    });

  const totalPages = Math.ceil(displayedMovies.length / itemsPerPage);
  const paginatedMovies = displayedMovies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChange = (type, value) => {
    setPage(1);
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "rating") {
      setRatingFilter(value);
    }
  };

  const handlePageChange = (_event, value) => {
    setPage(value);
  }

  return (
    <Grid container>
      <Grid size={32}>
        <Header title={title} />
      </Grid>
      <Grid container wrap="wrap" sx={{ flex: "1 1 500px" }}>
        <Grid 
          key="find" 
          size={{ xs: 12, sm: 6, md: 4, lg: 12, xl: 2 }}

          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <Grid container wrap="wrap" size={{ xs: 12, sm: 6, md: 8, lg: 12, xl: 10 }}>
          <MovieList action={action} movies={paginatedMovies} />
        </Grid>
      </Grid>

      {/* Pagination Component at the bottom */}
      {totalPages > 1 && (
        <Grid size={12}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              aria-label="Movie list pages"
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default MovieListPageTemplate;
