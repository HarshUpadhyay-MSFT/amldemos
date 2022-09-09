import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieCards } from "./MovieCards";

/* TODOs
- display movie title as alt text - need to merge links with movie titles data
- add a 'rate another movie' button, and show only one movie at a time like a slideshow
- inform user that they should rate at least 20 items for best experience(maybe subtitle)
- display count/countdown of movies rated?
- add button to "Show me recommendations" - can use Grid cards layout to show top K movies?
- add button to "go back to rating"
*/

function App() {
  return (
    <div>
      <header className="App-header">
        <p>Rate some movies!</p>
      </header>
      <br />
      <MovieCards />
    </div>
  );
}

export default App;
