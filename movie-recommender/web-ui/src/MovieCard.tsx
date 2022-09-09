import * as React from "react";
import Card from "react-bootstrap/Card";

interface IMovieCardProps {
  url: string;
  id: string;
}
export const MovieCard: React.FunctionComponent<IMovieCardProps> = (
  props: IMovieCardProps
) => {
  return (
    <Card border="dark" style={{ width: "18rem" }}>
      <Card.Img variant={"top"} src={props.url} height={"300px"} />
      {/* <Card.Body>
        <input type={"number"} min={1} max={5}></input>
      </Card.Body> */}
    </Card>
  );
};
