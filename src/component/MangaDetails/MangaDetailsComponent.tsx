import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RouteUrls } from "../../config";
import { ChapterList } from "../../models/ChapterDetails";
import { fetchChapters } from "../../redux/chapterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = { title: string; id: string; description: string };

export default function MangaDetailsComponent({
  title,
  id,
  description,
}: Props) {
  const dispatch = useAppDispatch();

  const { chapterList } = useAppSelector((state) => state.chapter);

  useEffect(() => {
    dispatch(fetchChapters(id));
  }, []);

  if (chapterList.length === 0) {
    return <div>Loading...</div>;
  }

  console.log(chapterList);

  return (
    <Card sx={{ maxWidth: 1800 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://m.media-amazon.com/images/I/71n37I7s1EL._AC_SX425_.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={id}>Acheter</Link>
      </CardActions>
      <CardActions>
        <Link to={`${RouteUrls.MangaDetails}/${id}/${chapterList[0].id}`}>
          Commencer à lire
        </Link>
      </CardActions>
    </Card>
  );
}
