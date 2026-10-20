import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getMovie, getMovieCast } from '../api/tmdb-api'
import { getPerson } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'


const PersonDetailsPage = () => {
  const { id } = useParams();
  const { data: person, error, isPending, isError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <main>
        <h1>
            {person.name}
        </h1>
        <p>
            {person.biography}
        </p>
    </main>
  );
};

export default PersonDetailsPage;
