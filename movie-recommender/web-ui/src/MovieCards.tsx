import * as React from "react";
import { MovieCard } from "./MovieCard";
import { pick20Random } from "./moviePosterLinks";
import { Col, Row } from "react-bootstrap";

export const MovieCards: React.FunctionComponent = () => {
    const movies = React.useMemo(pick20Random, []);
    // return <CardGroup>{movies.map(item => <MovieCard key={item[0]} id={item[0]} url={item[1]} />)}</CardGroup>
    return (
      <Row xs={1} md={4} className="g-4">
        {movies.map(item => (
          <Col>
            <MovieCard key={item[0]} id={item[0]} url={item[1]} />
          </Col>
        ))}
      </Row>
    );
}