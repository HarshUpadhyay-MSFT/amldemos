import { CircularProgress } from "@mui/material";
import * as React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { MovieCard } from "./MovieCard";
import { movieData } from "./movieData";
import { useAzFuncFetch } from "./useAzFuncFetch";

interface MovieGridProps {
  ratings: { [K in string]: number };
}
export const MovieGrid: React.FunctionComponent<MovieGridProps> = ({
  ratings,
}: MovieGridProps) => {
  const { data, isError, isLoading, isSuccess, error } = useAzFuncFetch(ratings);

  return (
    <>
      {isLoading && <CircularProgress title="Loading your recommendations..." />}
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
