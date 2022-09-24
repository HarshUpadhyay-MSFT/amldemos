import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieGridWithRatings } from "./MovieGridWithRatings";
import { pick20Random } from "./movieData";
import Button from "@mui/material/Button";
import { MovieGrid } from "./MovieGrid";
import Icon from "@mui/material/Icon";
import { QueryClient, QueryClientProvider } from "react-query";

// TODO: inform user that they should rate at least 20 items for best experience(maybe subtitle)

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Recommender />
    </QueryClientProvider>
  );
}

function Recommender() {
  const ratings = React.useRef<{ [K in string]: number }>({});
  const updateRating = React.useCallback(
    (itemId: string, rating: number | null) => {
      if (!rating) {
        delete ratings.current[itemId];
      } else {
        ratings.current[itemId] = rating;
      }
    },
    []
  );
  const [movies, setMovies] = React.useState(pick20Random);
  const randomizeMovies = React.useCallback(
    () => setMovies(pick20Random),
    [setMovies]
  );

  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const togglePage = React.useCallback(
    () => setShowRecommendations(!showRecommendations),
    [showRecommendations]
  );
  const btnLabel = showRecommendations
    ? "Rate more movies"
    : "Suggest movies, please!";

  return (
    <div>
      <header className="App-header">
        <title>Movielens recommender</title>
        <p>
          {showRecommendations
            ? "Here are some movies we think you'll like based on your ratings"
            : "Rate some movies below and we'll suggest some more that you're going to like!"}
        </p>
        <div style={{ flexDirection: "row" }}>
          <Button variant="contained" onClick={togglePage}>
            {btnLabel}
          </Button>
          {!showRecommendations && (
            <Button
              sx={{ marginLeft: "10px" }}
              variant="contained"
              onClick={randomizeMovies}
            >
              <Icon>autorenew</Icon>
              {"Reload"}
            </Button>
          )}
        </div>
      </header>
      <br />
      <div style={{ backgroundColor: "#282c34" }}>
        {showRecommendations && <MovieGrid ratings={ratings.current} />}
        {!showRecommendations && (
          <MovieGridWithRatings
            movies={movies}
            updateItemRating={updateRating}
          />
        )}
      </div>
    </div>
  );
}

export default App;
