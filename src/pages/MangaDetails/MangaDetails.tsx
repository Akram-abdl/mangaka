// TODO : manga page details

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Manga } from "../../models/Manga";
import { getManga } from "../../API_Calls/getManga";
import { Container, Grid } from "@mui/material";
import MangaDetailsComponent from "../../component/MangaDetails/MangaDetailsComponent";

function MangaDetails() {
  //const navigate = useNavigate();
  const { mangaId } = useParams();
  const [manga, setManga] = useState<Manga>();

  const getOneManga = async () => {
    if (!mangaId) return;
    const manga = await getManga(mangaId);
    setManga(manga);
  };

  useEffect(() => {
    async function fetchManga() {
      await getOneManga();
    }
    fetchManga();
  }, []);

  // if (!manga) {
  //   return navigate("/");
  // }

  if (!manga) {
    return <div>Chargement du manga...</div>;
  }

  return (
    <Container>
      <Grid item key={manga.id}>
        <MangaDetailsComponent
          title={manga.attributes.title.en}
          id={manga.id}
          description={manga.attributes.description.en}
        />
      </Grid>
    </Container>
  );
}

export default MangaDetails;
