import { useQuery } from "@tanstack/react-query";
import { getPersonCredits } from "../api/tmdb-api";

const usePersonCredits = (id) => {
  return useQuery({
    queryKey: ["personCredits", { id }],
    queryFn: getPersonCredits,
  });
};

export default usePersonCredits;