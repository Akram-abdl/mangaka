import { Manga } from "../../models/Manga";


export const  MangaTest = async (): Promise<Manga[]> => {
    try{

        const response = await fetch('https://api.mangadex.org/manga').then(response =>response.json());
        console.log(response)
        return  response.data;
        
    } catch (e){
        console.error(e);
        return [];
    }
    


}