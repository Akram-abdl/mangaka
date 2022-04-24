import { Manga } from "../models/Manga";

export const getAllMangas = async (): Promise<Manga[]> => {
  try {
    const response = await fetch("https://api.mangadex.org/manga?limit=100");
    const data = (await response.json()).data;
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("can't fetch mangas");
  }
};
