import React from 'react'

interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
}

export const getAccessToken = async (): Promise<SpotifyTokenResponse> => {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!refresh_token || !client_id || !client_secret) { //missing the refresh token 
        throw new Error('Missing Spotify environment bruh');
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const tokenData = await response.json();

    // Log the token for debugging
    console.log('Access Token:', tokenData.access_token);

    return tokenData;
}


// fop the practive run of fetching 
interface Track {
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
    album: { images: { url: string }[] };
}



export const topTracks = async (): Promise<Track[]> => {
    const { access_token } = await getAccessToken();



    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch top tracks: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items;
};