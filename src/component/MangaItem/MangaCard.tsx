import { Card, CardContent, Typography } from "@mui/material"

type Props = {title:string}

export default function MangaCard({title}:Props) {

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}