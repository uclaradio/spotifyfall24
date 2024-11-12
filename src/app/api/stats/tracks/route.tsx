import { NextResponse } from 'next/server';
import { topTracks } from '../../../spotify'; // Use the correct relative path or alias

export async function GET() {
  try {
    const tracks = await topTracks();

    const formattedTracks = tracks.slice(0, 5).map((track) => ({
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      url: track.external_urls.spotify,
      coverImage: track.album.images[1]?.url,
    }));

    return NextResponse.json(formattedTracks, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
