// import { getAccessToken } from "./spotify";
// import { getTopGenres } from "./spotify"; 
// const accessToken = await getAccessToken();

// const topGenres = await getTopGenres(accessToken.access_token);
import { useState } from "react";

const genreDJNames: { [genre: string]: string[] } = {
    pop: ["Poptart", "Glitter", "Mood"],
    rap: ["Hustle", "Flow"],
    "pov: indie": ["Gatekeeper", "Fern", "Moon"],
    rock: ["Rolling Stone", "Guitar", "Rockstar"],
    hiphop: ["Flow", "Hustle", "Rap God"],
    country: ["Cowboy", "Country"],
    electronic: ["Electro", "Synth", "Bass"],
    "dance pop": ["Boogie", "Pop Princess", "Star"],
    house: ["Boogie"],
    edm: ["Deep", "Dance"],
    "teen pop": ["Baby"],
    "r&b": ["Soul", "Rhythm", "Blues"],
    soul: ["Soulful", "Groove", "Blues"],
    "urban contemporary": ["Ocean", "Mysterious"],
    "big room": ["Boogie"],
    "trap music": ["Trap", "Danger"],
    "alternative hip hop": ["Dawg", "Rhymes"],
    "classical": ["Serious", "Grown Up"],
    "pop rap": ["Fusion", "Vibe", "Groove"],
    "synthpop": ["Neon", "Wave", "Pulse"],
    indietronica: ["Indie", "Chill", "Echo"],
    "permanent wave": ["Retro", "Timeless", "Classic"],
    "vaporwave": ["Aesthetic", "Dreamscape", "Haze"],
    "lofi": ["Chillhop", "Mellow", "Study"],
    "k-pop": ["Hallyu", "Seoul", "Star"],
    "neo mellow": ["Smooth", "Groove", "Chillax"],
    "punk": ["Rebel", "Anarchy", "Rocker"],
    "gospel": ["Soulful", "Praise", "Faithful"],
    "afrobeat": ["Rhythm", "Vibe", "Fusion"],

};


export const getDJName = (topGenres: Record<string, number>, dj: string) => {

    let name = "DJ " + dj + " ";

    if (Object.keys(topGenres).length > 0) {
        let foundDJName = false;
    
        Object.entries(topGenres).forEach(([key, value]) => {
          if (genreDJNames[key]) {
            const randomIndex = Math.floor(Math.random() * genreDJNames[key].length);
            name = name + " " + genreDJNames[key][randomIndex];
            foundDJName = true;
          }
        });
        if (foundDJName)
        {
            return name;
        }


        // while (index < Object.keys(topGenres).length) {
        //     const topGenre = topGenres[index];
        //     console.log(topGenres[index])
        //     if (genreDJNames[topGenre]) {
        //         const randomIndex = Math.floor(Math.random() * genreDJNames[topGenre].length);
        //         console.log(randomIndex)
        //         const name = "DJ " + genreDJNames[topGenre][randomIndex];
        //         foundDJName = true;
        //         return name;
        //     }
        //     index++;
        // }

        if (!foundDJName) {
            console.log("genre not in list");
            return "DJ Obscure not in list";
        }
    } else {
        console.log("API call failed");
        return "DJ Obscure api failed";
    }
    return "";
};

export default getDJName;
