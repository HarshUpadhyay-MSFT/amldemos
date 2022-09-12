import { Card, CardContent, CardMedia, Rating } from "@mui/material";
import * as React from "react";
import "./MovieCard.css";

interface IMovieCardProps {
  id: string;
  url: string;
  title: string;
  onChange?: (id: string, rating: number | null) => void;
}

export const MovieCard: React.FunctionComponent<IMovieCardProps> = ({
  id,
  url,
  title,
  onChange,
}: IMovieCardProps) => {
  const updateRating = React.useCallback(
    (_ev: any, value: number | null) => {
      onChange?.(id, value);
    },
    [id, onChange]
  );
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia component="img" height="300" image={url} alt={title} />
      {onChange && (
        <CardContent className="CardContent">
          <Rating onChange={updateRating} />
        </CardContent>
      )}
    </Card>
  );
};
