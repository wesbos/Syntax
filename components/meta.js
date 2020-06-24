import Head from 'next/head';
import PropTypes from 'prop-types';
import slug from 'speakingurl';

const Meta = ({ show, staticPage }) => (
  <Head>
    {show ? (
      <>
        <title>
          {show.title} — Syntax Podcast {show.displayNumber}
        </title>
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
          content={`https://syntax.fm/show/${show.displayNumber}/${slug(show.title)}`}
        />
      </>
    ) : (
      <title>
        {staticPage && staticPage.title && `${staticPage.title} – `}Syntax
        Podcast
      </title>
    )}
  </Head>
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
  })
};

export default Meta;
