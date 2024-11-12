import { NextResponse } from 'next/server';
import { getAccessToken } from '../../spotify';

export async function GET() {
    try {
      const token = await getAccessToken();
      return NextResponse.json(token);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
  