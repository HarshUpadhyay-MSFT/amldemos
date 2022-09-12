import * as React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: [string, { movieTitle: string; moviePosterLink: string }][];
}
export const MovieGrid: React.FunctionComponent<MovieGridProps> = ({
  movies,
}: MovieGridProps) => {
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
