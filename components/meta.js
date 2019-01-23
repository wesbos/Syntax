import Head from 'next/head';
import PropTypes from 'prop-types';
import slug from 'speakingurl';
import { description } from '../package.json';

const Meta = ({ show, staticPage, baseURL, styleTags }) => (
  <div>
    <Head>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#F1C15D" />
      <meta charSet="utf-8" />
      {show && (
        <>
          <meta property="og:audio" content={show.url} />
          <meta property="og:audio:secure_url" content={show.url} />
          <meta property="og:audio:type" content="audio/mp3" />
          <meta property="og:type" content="music.song" />
          <meta
            property="og:title"
            content={`${show.title} — Syntax Podcast ${show.displayNumber}`}
          />
          <meta
            property="og:url"
            content={`${baseURL}/show/${show.displayNumber}/${slug(
              show.title
            )}`}
          />
        </>
      )}
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${baseURL}/static/syntax-banner.png`}
      />
      <link rel="shortcut icon" href={`${baseURL}/static/favicon.png`} />

      {show ? (
        <title>
          {show.title} — Syntax Podcast {show.displayNumber}
        </title>
      ) : (
        <title>
          {staticPage && staticPage.title && `${staticPage.title} – `}Syntax
          Podcast
        </title>
      )}

      {styleTags}
    </Head>
  </div>
);

const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.show && !props.staticPage) {
    return new Error(
      `One of 'show' or 'staticPage' is required by '${componentName}' component.`
    );
  }
  if (props.show && props.staticPage) {
    return new Error(
      `Only one of 'show' or 'staticPage' should be passed to '${componentName}' component, not both.`
    );
  }
  if (props[propName]) {
    const myPropType = {
      [propName]: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    };
    PropTypes.checkPropTypes(myPropType, props, propName, componentName);
  }
};

Meta.propTypes = {
  show: requiredPropsCheck,
  staticPage: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  baseURL: PropTypes.string.isRequired,
};

export default Meta;
