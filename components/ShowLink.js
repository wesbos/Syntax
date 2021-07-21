import React from 'react';
import Link from 'next/link';
import slug from 'speakingurl';
import PropTypes from 'prop-types';

const ShowLink = ({ displayNumber, displayDate, title }) => {
  const handleAnchorClick = () => {
    document.querySelector('.showNotes').focus();
  };

  return (
    <Link
      shallow
      scroll={false}
      href="/show/[number]/[slug]"
      as={`/show/${displayNumber}/${slug(title)}`}
    >
      <button className="show__link" onClick={handleAnchorClick} type="button">
        <div className="show__container">
          <p className="show__displayNumber">Episode {displayNumber}</p>
          <span className="show__seperator"> | </span>
          <p className="show__modifiedDate">{displayDate}</p>
        </div>
        <h3 className="show__title">{title}</h3>
      </button>
    </Link>
  );
};

ShowLink.propTypes = {
  displayNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  displayDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShowLink;
