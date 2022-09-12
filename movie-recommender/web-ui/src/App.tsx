import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieGridWithRatings } from "./MovieGridWithRatings";
import { pick20Random } from "./movieData";
import Button from "@mui/material/Button";
import { MovieGrid } from "./MovieGrid";

// TODO: inform user that they should rate at least 20 items for best experience(maybe subtitle)
function App() {
  const ratings = React.useRef<{ [K in string]: number | null }>({});
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
  const movies = React.useMemo(pick20Random, []);

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
        <p>Rate some movies!</p>
        <Button variant="contained" onClick={togglePage}>
          {btnLabel}
        </Button>
      </header>
      <br />
      <div style={{backgroundColor: "#282c34"}}>
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
