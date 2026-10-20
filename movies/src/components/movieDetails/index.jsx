import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews"
import { getMovieCast } from "../../api/tmdb-api";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);
const {data: credits } = useQuery({
  queryKey: ["cast", {id: movie.id}],
  queryFn: getMovieCast
});

const cast = credits?.cast ?? [];

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
        Cast
      </Typography>
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 1 }}>
        {cast.map((person) => (
        <Box key={person.id} sx={{ flex: "0 0 140px" }}>
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
              alt={person.name}
              style={{
                display: "block",
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : (
            <Box sx={{ height: 180, bgcolor: "grey.300", borderRadius: 1 }} />
          )}

          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.character}
          </Typography>
        </Box>
        ))}
      </Box>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};
export default MovieDetails ;
