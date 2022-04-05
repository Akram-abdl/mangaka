import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField/TextField";
import { Manga } from "../../models/Manga";
import MangaCardComponent from "../../component/MangaItem/MangaCardComponent";
import { getAllMangas } from "../../API_Calls/getAllMangas";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const auth = getAuth();
  //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [mangas, setMangas] = useState<Manga[]>([]);
  const getMangas = async () => {
    const mangas = await getAllMangas();
    setMangas(mangas);
  };

  useEffect(() => {
    async function fetchMangas() {
      await getMangas();
    }
    fetchMangas();
  }, []);
  return (
    <div>
      <p>Home Page (Protected by Firebase!)</p>

      <Container>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button variant="contained">Search</Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={4}>
          {mangas.map((manga) => (
            <Grid item key={manga.id}>
              <MangaCardComponent
                title={manga.attributes.title.en}
                mangaId={manga.id}
                description={manga.attributes.description.en}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
    </div>
  );
};

export default HomePage;
