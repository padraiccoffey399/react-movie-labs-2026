import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

const selectControl = {
  ...formControl,
  "& .MuiInputLabel-root": {
    color: "#263238",
    fontWeight: 700,
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#455a64",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#00695c",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00695c",
    },
  },
  "& .MuiSelect-select": {
    fontWeight: 600,
  },
};

const sorts = [
  { id: "default", name: "Default order" },
  { id: "title-asc", name: "Title (A-Z)" },
  { id: "title-desc", name: "Title (Z-A)" },
];

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
  

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e, newValue) => {
    props.onUserInput("rating", newValue);
  };

  const handleSortChange = (e) => {
    props.onUserInput("sort", e.target.value);
  };

  return (
    <Card
      sx={{
        bgcolor: "var(--accent)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>

        {/* Search Field */}
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Genre Dropdown */}
        <FormControl sx={selectControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            label="Genre"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Rating Slider (Moved below and converted to a Slider) */}
        <FormControl sx={{ ...formControl, mt: 2, px: 2, py: 1 }}>
          <Typography id="rating-slider" gutterBottom variant="body2">
            Minimum Rating: {props.ratingFilter || 0}
          </Typography>
          <Slider
            aria-labelledby="rating-slider"
            defaultValue={0}
            min={0}
            max={10}
            step={0.5}
            value={props.ratingFilter || 0}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
          />

          
        </FormControl>
        <FormControl sx={selectControl}>
          <InputLabel id="sorting-label"> Sort</InputLabel>
          <Select
            labelId="sorting-label"
            id="sorting-select"
            label="Sort"
            value={props.sortingFilter}
            onChange={handleSortChange}
          >
            {sorts.map((sort) => {
              return (
                <MenuItem key={sort.id} value={sort.id}>
                  {sort.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

      </CardContent>

      <CardMedia
        sx={{ height: 120 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}