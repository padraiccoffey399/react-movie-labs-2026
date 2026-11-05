import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../api/tmdb-api";

const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: ["videos", { id: movieId }],
    queryFn: getMovieVideos,
  });
};

export default useMovieVideos;