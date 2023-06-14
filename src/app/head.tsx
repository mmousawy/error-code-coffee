export default function Head() {
  const title = 'Error Code: Coffee - A geeky podcast about tech, web dev and all things life';
  const description = 'A weekly podcast about tech, web development and all things life! Hosted by Gideon Heilbron & Murtada al Mousawy.';

  return (
    <>
      <meta property='og:title' content={ title }  />
      <meta property='og:description' content={ description } />
      <meta property='og:image' content='/og-image.png' />

      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#7c52fe' />
      <meta name='msapplication-TileColor' content='#603cba' />
      <meta name='theme-color' content='#ffffff' />
    </>
  );
}
