import { NextResponse } from 'next/server';
import { getTopGenres } from '../../../spotify'; // Ensure correct path

export async function GET() {
  try {
    const genres = await getTopGenres();
    return NextResponse.json(genres); // Return top genres in the response
  } catch (error) {
    console.error('Error fetching top genres:', error); // Log errors for debugging
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
