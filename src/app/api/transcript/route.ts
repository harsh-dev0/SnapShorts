import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(req: Request) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const mappedTranscript = transcript.map(t => ({
      text: t.text,
      start: t.offset,
      duration: t.duration,
    }));

    return NextResponse.json({ transcript: mappedTranscript });
  } 
  catch (err: unknown) {
    let message = 'Failed to fetch transcript';
  
    if (err instanceof Error) {
      message = err.message;
    }
  
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
