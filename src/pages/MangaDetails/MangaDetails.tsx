// TODO : manga page details

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Manga } from "../../models/Manga";
import { getManga } from "../../API_Calls/getManga";
import { Container, Grid } from "@mui/material";
import MangaDetailsComponent from "../../component/MangaDetails/MangaDetailsComponent";
import { Chapter } from "../../models/Chapter";
import { getAllChapters } from "../../API_Calls/getAllChapters";

function MangaDetails() {
  const navigate = useNavigate();
  const { mangaId } = useParams();
  const [manga, setManga] = useState<Manga>();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const getOneManga = async () => {
    if (!mangaId) return;
    const manga = await getManga(mangaId);
    setManga(manga);
  };
  const getChapterList = async () => {
    if (!mangaId) return;
    const chapters = await getAllChapters(mangaId);
    setChapters(chapters);
  };

  useEffect(() => {
    async function fetchManga() {
      await getOneManga();
    }
    
    async function fetchChapters(){
      await getChapterList();
    }
    fetchManga();
    fetchChapters();
    console.log(chapters);
    
  }, []);

  // if (!manga) {
  //   return navigate("/");
  // }

  if (!manga) {
    return <div>Pas de manga trouvé.</div>;
  }

  return (
    <div>
      <Container>
        <Grid item key={manga.id}>
          <MangaDetailsComponent
            title={manga.attributes.title.en}
            id={manga.id}
            description={manga.attributes.description.en}
          />
        </Grid>
      </Container>
    </div>
  );
}

export default MangaDetails;
