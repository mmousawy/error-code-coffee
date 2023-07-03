import { ImageResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.
import ImageHeaderBackground from '@/assets/svg/header-background-white.svg';

export const runtime = 'edge';

const font = fetch(new URL('../../assets/Inter-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fontData = await font;

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
            backgroundColor: '#7c52fe',
            fontSize: 64,
            letterSpacing: -2,
            fontWeight: 700,
            textAlign: 'left',
            fontFamily: 'Inter',
            padding: '48px',
          } }
        >
          <ImageHeaderBackground style={ {
            position: 'absolute',
            top: '-150px',
            left: '-80px',
            width: '1248x',
            height: '363px',
            fill: '#fff',
          } } />
          <ImageHeaderBackground style={ {
            position: 'absolute',
            bottom: '-150px',
            left: '-40px',
            width: '1248x',
            height: '363px',
            fill: '#fff',
            transform: 'rotate(180deg)',
          } } />
          <div
            style={ {
              color: '#FFF',
              fontSize: '48px',
              marginBottom: '.25em',
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
        fonts: [ {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        } ],
      }
    );
  } catch (e: any) {
    console.log(`${ e.message }`);
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
