import { Manga } from "../models/Manga";

export const getAllMangas = async (): Promise<Manga[]> => {
  try {
    const response = await fetch(
      "https://api.mangadex.org/manga?limit=100"
    ).then((response) => response.json());
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
