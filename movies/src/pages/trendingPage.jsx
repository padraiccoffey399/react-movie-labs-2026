import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";


const TrendingMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["trending"],
        queryFn: getTrendingMovies,
    });

    if (isPending ) return <Spinner/>;
    if (isError) return <h1>{error.message}</h1>;

    return (
        <PageTemplate 
          title="Trending Movies"
          movies={data.results}
          action={(movie) => <AddToWatchlistIcon movie = {movie}/>}
          />
    );
};

export default TrendingMoviesPage;