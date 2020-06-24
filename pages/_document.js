import Document, { Html, Head, Main, NextScript } from 'next/document';
import { description } from '../package.json';
import stylesheet from '../styles/style.styl';

class SyntaxDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={description} />
          <meta name="theme-color" content="#F1C15D" />
          <meta charSet="utf-8" />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content={`https://syntax.fm/static/syntax-banner.png`}
          />
          <link rel="shortcut icon" href={`https://syntax.fm/static/favicon.png`} />
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: stylesheet.replace(/\n/g, '') }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SyntaxDocument;
