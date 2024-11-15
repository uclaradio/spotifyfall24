//import { topGenre } from "../app/spotify"; // fill in based on api call name 
const topGenre = "indie"

const genreDJNames: { [genre: string]: string[] } = {
    pop: ["Poptart", "Glitter", "Mood"],
    rap: ["Hustle", "Flow"],
    indie: ["Gatekeeper", "Fern", "Moon"]
};

export const getDJName = async (): Promise<string | null> => {
    if (topGenre) {
        if (genreDJNames[topGenre]) {
            const randomIndex = Math.floor(Math.random() * genreDJNames[topGenre].length);
        const name = "DJ " + genreDJNames[topGenre][randomIndex];
        return name;
    } else {
        console.log("genre not in list");
        return  "DJ Obscure";
    }
    } else {
        console.log("API call failed");
        return "DJ Obscure";
    }
};
