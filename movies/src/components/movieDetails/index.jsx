import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews"
import { getMovieCast } from "../../api/tmdb-api";
import { Link } from "react-router";
import useMovieRecommendations from "../../hooks/useMovieRecommendations"; 
import useMovieVideos from "../../hooks/useMovieVideos";


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
const { data: recommendationsData } = useMovieRecommendations(movie.id);
const {data: videosData,isPending: isVideosPending, isError: isVideosError,
} = useMovieVideos(movie.id);


const cast = credits?.cast ?? [];
const recommendations = recommendationsData?.results ?? [];

const videos = videosData?.results ?? [];
const trailers = videos.find((video) => video.type === "Trailer" && video.site === "YouTube");
const videoKey = trailers?.key;

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
        sx={{
          ...root,
        bgcolor: "var(--bg)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
      >
        <li>
          <Chip label="Genres" sx={{
            ...chip,
        bgcolor: "var(--accent)",
        borderColor: "var(--border)",
      }}  />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{
              ...chip,
              bgcolor: "var(--accent)",
              borderColor: "var(--border)",
            }}       variant="outlined" />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{
          ...root,
        bgcolor: "var(--bg)",
      }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`}
        sx={{
          ...chip,
        color: "var(--text)",
        borderColor: "var(--border)",
      }}  />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={{
          ...chip,
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={{
          ...chip,
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
        />
        <Chip label={`Released: ${movie.release_date}`} 
        sx={{
          ...chip,
        color: "var(--text)",
        borderColor: "var(--border)",
      }}/>
      </Paper>

      {isVideosPending ? (
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: 1100,
            aspectRatio: "16 / 9",
            mx: "auto",
            my: 2,
          }}
        />
      ) : isVideosError ? (
        <Typography>Could not load the trailer.</Typography>
      ) : videoKey ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            aspectRatio: "16 / 9",
            mx: "auto",
            my: 2,
          }}
        >
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            allowFullScreen
            sx={{
              display: "block",
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </Box>
      ) : (
        <Typography>No trailer available.</Typography>
      )}


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
          <Link to={`/people/${person.id}`}>Actor details</Link>
        </Box>
        ))}
      </Box>
      

      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
        Recommendations
      </Typography>
       <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 1 }}>
        {recommendations.map((movie) => (
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
            {movie.genre}
          </Typography>
          <Link to={`/movies/${movie.id}`}>Movie Details</Link>
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
