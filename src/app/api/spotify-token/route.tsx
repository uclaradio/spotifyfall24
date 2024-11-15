// import { NextResponse } from 'next/server';
// import { getAccessToken } from '../../spotify';

// export async function GET() {
//     try {
//       const token = await getAccessToken();
//       return NextResponse.json(token);
//     } catch (error) {
//       if (error instanceof Error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//       }
//       return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
//   }
  
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code } = await req.json();

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = 'http://localhost:3000/SpotifyPage/';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }

  const tokenData = await response.json();
  return NextResponse.json(tokenData);
}

