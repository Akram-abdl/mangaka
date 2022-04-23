import { ChapterPage } from "../models/ChapterPage";

export const getChapter = async (chapterId: string): Promise<ChapterPage> => {
  try {
    const response = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    ).then((response) => response.json());
    console.log("resultat reponse de getChapter", response.chapter);
    return response.chapter;
  } catch (e) {
    console.error(e);
    throw new Error("error when calling api to fetch the manga details");
  }
};
