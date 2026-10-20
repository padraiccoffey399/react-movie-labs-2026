import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const TopRatedMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["top-rated"],
        queryFn: getTopRatedMovies,
    });

    if (isPending ) return <Spinner/>;
    if (isError) return <h1>{error.message}</h1>;

    return (
        <PageTemplate 
          title="Top Rated Movies"
          movies={data.results}
          action={(movie) => <AddToWatchlistIcon movie = {movie}/>}
          />
    );
};

export default TopRatedMoviesPage;