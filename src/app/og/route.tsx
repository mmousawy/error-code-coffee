import { ImageResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';

    return new ImageResponse(
      (
        <div
          style={ {
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom right, #9f81fa, #7c52fe)',
            fontSize: 64,
            letterSpacing: -2,
            fontWeight: 700,
            textAlign: 'left',
            fontFamily: 'Inter',
            padding: '48px',
          } }
        >
          <div
            style={ {
              color: '#FFF',
              fontSize: '48px',
            } }
          >
            Error Code: Coffee
          </div>
          <div
            style={ {
              color: '#FFF',
            } }
          >
            { title }
          </div>
        </div>
      ),
      {
        width: 800,
        height: 800,
      }
    );
  } catch (e: any) {
    console.log(`${ e.message }`);
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
