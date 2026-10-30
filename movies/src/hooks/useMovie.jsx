import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";

const useMovie = (id) => {
  return useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });
};

export default useMovie;