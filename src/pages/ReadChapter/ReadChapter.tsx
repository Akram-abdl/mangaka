import { Container, ImageList, ImageListItem } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapter } from "../../API_Calls/getChapter";
import { ChapterPage } from "../../models/ChapterPage";
import { useAppSelector } from "../../redux/hooks";
import { RouteUrls } from "../../config";

export default function ReadChapter() {
  const { mangaId, chapterId } = useParams();
  const [chapter, setChapter] = useState<ChapterPage>();
  const { chapterList } = useAppSelector((state) => state.chapter);

  const getAllPages = useCallback(async () => {
    if (!chapterId) return;
    const fetchedChapter = await getChapter(chapterId);
    console.log("Le chapterId de ReadChapter = ", chapterId);
    console.log("Le fetchedChapter de ReadChapter = ", fetchedChapter);

    console.log(fetchedChapter);

    setChapter(fetchedChapter);
  }, [chapterId]);

  useEffect(() => {
    async function fetchChapter() {
      await getAllPages();
    }
    fetchChapter();
  }, [getAllPages]);

  if (!chapter || !chapterId) {
    return <div>Chargement du chapitre...</div>;
  }

  console.log("chapterId = ", chapterId);

  const currentIndex = chapterList.findIndex(
    (chapterDetails) => chapterDetails.id === chapterId
  );

  return (
    <Container>
      <ImageList cols={1}>
        {chapter.data.map((page) => (
          <ImageListItem key={page}>
            <img
              src={`https://uploads.mangadex.org/data/${chapter.hash}/${page}`}
              srcSet={`https://uploads.mangadex.org/data/${chapter.hash}/${page}`}
              alt="page"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Link
        to={`${RouteUrls.MangaDetails}/${mangaId}/${
          chapterList[currentIndex - 1]
            ? chapterList[currentIndex - 1].id
            : chapterList[currentIndex].id
        }`}
      >
        Précédent
      </Link>
      <Link
        to={`${RouteUrls.MangaDetails}/${mangaId}/${
          chapterList[currentIndex + 1]
            ? chapterList[currentIndex + 1].id
            : chapterList[currentIndex].id
        }`}
      >
        Suivant
      </Link>
    </Container>
  );
}
