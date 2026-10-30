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
import { getPersonCredits } from "../../api/tmdb-api";
import { Link } from "react-router";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const PersonDetails = ({ person }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);
const {data: credits } = useQuery({
  queryKey: ["personCredits", {id: person.id}],
  queryFn: getPersonCredits
});

const personCredits = credits?.cast ?? [];

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {person.biography}
      </Typography>
      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
        Filmography
      </Typography>
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 1 }}>
        {personCredits.map((movie) => (
        <Box key={movie.id} sx={{ flex: "0 0 140px" }}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
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
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.character}
          </Typography>
          <Link to={`/movies/${movie.id}`}>movie details</Link>
        </Box>
        ))}
      </Box>
      </>
  );
};
export default PersonDetails ;
