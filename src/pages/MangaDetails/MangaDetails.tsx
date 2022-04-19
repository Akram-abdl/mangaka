// TODO : manga page details

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Manga } from "../../models/Manga";
import { getManga } from "../../API_Calls/getManga";
import { Container, Grid } from "@mui/material";
import MangaDetailsComponent from "../../component/MangaDetails/MangaDetailsComponent";

import { getAllChapters } from "../../API_Calls/getAllChapters";
import { ChapterList } from "../../models/ChapterDetails";

function MangaDetails() {
  //const navigate = useNavigate();
  const { mangaId } = useParams();
  const [manga, setManga] = useState<Manga>();
  const [chapters, setChapters] = useState<ChapterList>();

  const getOneManga = async () => {
    if (!mangaId) return;
    const manga = await getManga(mangaId);
    setManga(manga);
  };
  const getChapterList = async () => {
    if (!mangaId) return;
    const fetchedChapters = await getAllChapters(mangaId);
    console.log("yo c le mangaid de MangaDetails = ", mangaId)
    setChapters(fetchedChapters);
  };

  useEffect(() => {
    async function fetchManga() {
      await getOneManga();
      await getChapterList();
    }
    fetchManga();
    console.log("la variable chapters de MangaDetails = ",chapters);
    
  }, []);

  // if (!manga) {
  //   return navigate("/");
  // }

  if (!manga) {
    return <div>Pas de manga trouvé.</div>;
  }

  if(!chapters) {
    return <div>Pas de chapitres trouvés</div>;
  }

  return (
    <div>
      <Container>
        <Grid item key={manga.id}>
          <MangaDetailsComponent
            title={manga.attributes.title.en}
            id={manga.id}
            chapters={chapters}
            description={manga.attributes.description.en}
          />
        </Grid>
      </Container>
    </div>
  );
}

export default MangaDetails;
