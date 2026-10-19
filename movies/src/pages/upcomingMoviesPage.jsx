import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const selectFavorite = () => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={selectFavorite}
      action={(movie) => {
        return (
            <>
            <PlaylistAddIcon movies = {movie}/>
            </>
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
