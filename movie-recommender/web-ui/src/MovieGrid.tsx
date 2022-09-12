import * as React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { MovieCard } from "./MovieCard";
import { pick10Random } from "./movieData";

interface MovieGridProps {
  ratings: { [K in string]: number | null };
}
export const MovieGrid: React.FunctionComponent<MovieGridProps> = ({
  ratings,
}: MovieGridProps) => {
  // TODO: movies should come from network call that takes in ratings and returns recommendations
  const movies = React.useMemo(pick10Random, []);

  // TODO: display some spinner to indicate loading
  return (
    <Row xs={1} md={4} className="g-4">
      {movies.map((item) => {
        const { movieTitle, moviePosterLink } = item[1];
        return (
          <Col>
            <MovieCard
              key={item[0]}
              url={moviePosterLink}
              title={movieTitle}
              id={item[0]}
            />
          </Col>
        );
      })}
    </Row>
  );
};
