import React from "react";
import { useParams } from 'react-router';
import PageTemplate from "../components/templateMoviePage";
import { getPerson } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import PersonDetails from "../components/personDetails"; 
import usePerson from "../hooks/usePerson";


const PersonDetailsPage = () => {
  const { id } = useParams();
  const { data: person, error, isPending, isError } = usePerson(id);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
        {person ? (
          <PersonDetails person = {person}/>
        ) : (
          <p>Waiting for details</p>
        )}
    </>
  );
};

export default PersonDetailsPage;
