import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RouteUrls } from "../../config";

type Props = { title: string; mangaId: string; description: string };

export default function MangaCardComponent({
  title,
  mangaId,
  description,
}: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Link to={`${RouteUrls.MangaDetails}/${mangaId}`}>Entrer</Link>
      </CardActions>
    </Card>
  );
}
