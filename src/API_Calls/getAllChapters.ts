import { Chapter } from "../models/Chapter";


export const getAllChapters = async (mangaId : string): Promise<Chapter[]> => {
  try {
    const response = await fetch(
    `https://api.mangadex.org/chapter?manga=${mangaId}&order%5Bchapter%5D=asc&limit=100&translatedLanguage%5B%5D=en`
    ).then((response) => response.json());
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};