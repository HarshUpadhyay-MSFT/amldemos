import * as React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { MovieCard } from "./MovieCard";

interface IProps {
  movies: [string, { movieTitle: string; moviePosterLink: string }][];
  updateItemRating?: (id: string, rating: number | null) => void;
}

export const MovieGridWithRatings: React.FunctionComponent<IProps> = ({
  movies,
  updateItemRating,
}: IProps) => {
  return (
    <Row xs={1} md={4} className="g-4">
      {movies.map((item) => {
        const { movieTitle, moviePosterLink } = item[1];
        return (
          <Col key={item[0]}>
            <MovieCard
              url={moviePosterLink}
              title={movieTitle}
              id={item[0]}
              onChange={updateItemRating}
            />
          </Col>
        );
      })}
    </Row>
  );
};
