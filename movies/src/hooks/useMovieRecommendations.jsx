import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../api/tmdb-api";

const useMovieRecommendations = (movieId) => {
  return useQuery({
    queryKey: ["recommendations", { id: movieId }],
    queryFn: getMovieRecommendations,
  });
};

export default useMovieRecommendations;