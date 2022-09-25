import { CircularProgress } from "@mui/material";
import * as React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { MovieCard } from "./MovieCard";
import { movieData } from "./movieData";
import { useFlaskFetch } from "./useFlaskFetch";

interface MovieGridProps {
  ratings: { [K in string]: number };
}
export const MovieGrid: React.FunctionComponent<MovieGridProps> = ({
  ratings,
}: MovieGridProps) => {
  const { data, isError, isLoading, isSuccess, error } = useFlaskFetch(ratings);

  return (
    <>
      {isLoading && <CircularProgress />}
      {isError && <p>{error}</p>}
      {isSuccess && (
        <Row xs={1} md={4} className="g-4">
          {data.map((item) => {
            const entry = movieData[item] ?? { movieTitle: item };
            return (
              entry && (
                <Col>
                  <MovieCard
                    key={item}
                    url={entry.moviePosterLink}
                    title={entry.movieTitle}
                    id={item}
                  />
                </Col>
              )
            );
          })}
        </Row>
      )}
    </>
  );
};
