import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
    const [watchlist, setWatchlists] = useState( [] )


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToWatchlist = (movie) => {
    let newWatchlists = [];
    if (!watchlist.includes(movie.id)){
      newWatchlists = [...watchlist, movie.id];
    }
    else{
      newWatchlists = [...watchlist];
    }
    setWatchlists(newWatchlists)
  };
  

    const [myReviews, setMyReviews] = useState( {} ) 

      const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  console.log(myReviews);


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        watchlist,
        addToWatchlist,
        addReview   
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
