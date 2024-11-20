// import React from 'react';

// interface SpotifyTokenResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   refresh_token?: string;
//   scope: string;
// }

// interface Track {
//   artists: Artist[];
// }

// interface Artist {
//   id: string;
//   genres: string[];
// }

// // Function to get an access token using the refresh token
// export const getAccessToken = async (): Promise<SpotifyTokenResponse> => {
//   const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
//   const client_id = process.env.SPOTIFY_CLIENT_ID;
//   const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

//   if (!refresh_token || !client_id || !client_secret) {
//     throw new Error('Missing Spotify environment variables');
//   }

//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${Buffer.from(
//         `${client_id}:${client_secret}`
//       ).toString('base64')}`,
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       grant_type: 'refresh_token',
//       refresh_token,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch access token: ${response.statusText}`);
//   }

//   const tokenData = await response.json();
//   return tokenData;
// };


// // Function to fetch the user's top genres
// export const getTopGenres = async (): Promise<Record<string, number>> => {
//   const { access_token } = await getAccessToken();
//   console.log('Access Token:', access_token);

//   // Fetch top tracks (to infer genres from associated artists)
//   const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks', {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   if (!tracksResponse.ok) {
//     throw new Error(`Failed to fetch top tracks: ${tracksResponse.statusText}`);
//   }

//   const { items: tracks } = (await tracksResponse.json()) as { items: Track[] };

//   // Collect unique artist IDs
//   const artistIds = [...new Set(tracks.flatMap((track) => track.artists.map((artist) => artist.id)))];

//   // Fetch artist details to get genres
//   const artistBatches = chunkArray(artistIds, 50);
//   const genres: Record<string, number> = {};

//   for (const batch of artistBatches) {
//     const artistsResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${batch.join(',')}`, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     if (!artistsResponse.ok) {
//       throw new Error(`Failed to fetch artists: ${artistsResponse.statusText}`);
//     }

//     const { artists } = await artistsResponse.json();

//     // Aggregate genre counts
//     artists.forEach((artist: Artist) => {
//       artist.genres.forEach((genre) => {
//         genres[genre] = (genres[genre] || 0) + 1;
//       });
//     });
//   }

//   return genres;
// };

// // Helper function to chunk arrays for batch API requests
// const chunkArray = (array: string[], size: number): string[][] => {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += size) {
//     chunks.push(array.slice(i, i + size));
//   }
//   return chunks;
// };

import React from 'react';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface Track {
  artists: Artist[];
}

interface Artist {
  id: string;
  genres: string[];
}

// Fetch an access token
export const getAccessToken = async (): Promise<SpotifyTokenResponse> => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing Spotify environment variables');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    scope: "user-top-read",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const tokenData = await response.json();
  return tokenData;
};

// Fetch top genres
export const getTopGenres = async (access_token: string): Promise<Record<string, number>> => {
  console.log('Access Token:', access_token); // Log for debugging

  const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!tracksResponse.ok) {
    console.log(tracksResponse)
    throw new Error(`Failed to fetch top tracks: ${tracksResponse.statusText}`);
  }

  const { items: tracks } = await tracksResponse.json();
  const artistIds = [...new Set(tracks.flatMap((track: { artists: any[]; }) => track.artists.map((artist) => artist.id)))];

  const artistBatches = chunkArray(artistIds, 50);
  const genres: Record<string, number> = {};

  for (const batch of artistBatches) {
    const artistsResponse = await fetch(`https://api.spotify.com/v1/artists?ids=${batch.join(',')}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!artistsResponse.ok) {
      throw new Error(`Failed to fetch artists: ${artistsResponse.statusText}`);
    }

    const { artists } = await artistsResponse.json();
    artists.forEach((artist: { genres: any[]; }) => {
      artist.genres.forEach((genre) => {
        genres[genre] = (genres[genre] || 0) + 1;
      });
    });
  }

  return genres;
};

// Helper to chunk arrays
const chunkArray = (array: string[], size: number): string[][] => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
