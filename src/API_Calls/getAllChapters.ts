import { ChapterList } from "../models/ChapterDetails";

export const getAllChapters = async (mangaId: string): Promise<ChapterList> => {
  try {
    const response = await fetch(
      `https://api.mangadex.org/chapter?manga=${mangaId}&order%5Bchapter%5D=asc&limit=10&translatedLanguage%5B%5D=en`
    );
    const data = (await response.json()).data;
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("can't fetch all chapters");
  }
};
