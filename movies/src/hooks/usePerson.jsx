import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tmdb-api";

const usePerson = (id) => {
  return useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });
};

export default usePerson;