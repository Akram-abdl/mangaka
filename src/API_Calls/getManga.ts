import { Manga } from "../models/Manga";

export const getManga = async (id: string): Promise<Manga> => {
  try {
    const response = await fetch(`https://api.mangadex.org/manga/${id}`).then(
      (response) => response.json()
    );
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("error when calling api to fetch the manga details");
  }
};
