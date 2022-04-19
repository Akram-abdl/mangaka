import { Button, Container, Grid, ImageList, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getChapter } from '../../API_Calls/getChapter';
import { ChapterPage } from '../../models/ChapterPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function ReadChapter() {
  const navigate = useNavigate();
  const { mangaId, chapterId } = useParams();
  const [chapter, setChapter] = useState<ChapterPage>();

  const getAllPages = async () => {
    if (!chapterId) return;
    const fetchedChapter = await getChapter(chapterId);
    console.log("Le fetchedChapter de ReadChapter = ",fetchedChapter);
    setChapter(fetchedChapter);
  };

  useEffect(() => {
    async function fetchChapter() {
      await getAllPages();
    }
    fetchChapter();
    console.log("Le chapterId de ReadChapter = ",chapterId);
  }, []);

  // if (!manga) {
  //   return navigate("/");
  // }

  if (!chapter) {
    return <div>Pas de chapitre trouvé.</div>;
  }

  return (
    <div>
      <Container>
        <ImageList cols={1} >
            {chapter.data.map((page) => (
                
                <ImageListItem>
                <img
                    src={`https://uploads.mangadex.org/data/${chapter.hash}/${page}`}
                    srcSet={`https://uploads.mangadex.org/data/${chapter.hash}/${page}`}
                    alt="page"
                    loading="lazy"
                />
                </ImageListItem>
            ))}
        </ImageList>
        <ArrowBackIcon />
        <Button><ArrowForwardIcon /></Button>
      </Container>
    </div>
  );
}
