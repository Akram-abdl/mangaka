import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RouteUrls } from "../../config";
import { ChapterList } from "../../models/ChapterDetails";

type Props = { title: string; id: string; description: string, chapters: ChapterList };

export default function MangaDetailsComponent({
  title,
  id,
  description,
  chapters,
}: Props) {

  console.log("variable chapters de MangaDetailsComponent = " ,{chapters})

  return (
    <Card sx={{ maxWidth: 1800 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
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
        <Link to = {`${RouteUrls.MangaDetails}/${id}/${chapters[0].id}`}>Commencer à lire</Link>
      </CardActions>
    </Card>
  );
}
