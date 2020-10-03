/* eslint-disable react/no-danger */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const TIMESTAMP_REGEX = /(\d{1,2}):([0-5][0-9])/

const getSecondCountFromTimestamp = timestamp => {
  try {
    const [_, minutes, seconds] = timestamp.match(TIMESTAMP_REGEX);
    return parseInt(minutes) * 60 + parseInt(seconds);
  } catch {
    return null;
  }
};

const ShowNotes = ({ show, setCurrentPlaying, onClickTimestamp }) => {
  const processedHtml = useMemo(
    () =>
      show.html.replace(
        /(\d{1,2}:\d{2})/g,
        `<button type="button" class="link" id="timestamp-$1">$1</button>`
      ),
    [show.number]
  );

  useEffect(() => {
    const addTimestampEventListeners = () => {
      const timestampButtons = document.querySelectorAll(
        'button[id*="timestamp"]'
      );
      Array.prototype.forEach.call(timestampButtons, (button) => {
        const timestampValue = button.id.replace('timestamp-', '');
        const secondCount = getSecondCountFromTimestamp(timestampValue);
        if (secondCount !== null)
          button.addEventListener('click', () => onClickTimestamp(secondCount));
      });
    }

    document.querySelector('.showNotes').scrollTop = 0;
    addTimestampEventListeners();
  }, [show.number]);

  return (
    <div className="showNotes">
      <p className="show__date">{show.displayDate}</p>
      <h2>{show.title}</h2>
      <button
        className="button"
        onClick={() => setCurrentPlaying(show.displayNumber)}
        type="button"
      >
        <span className="icon">🎵</span> Play Episode {show.displayNumber}
      </button>
      <a className="button" download href={show.url}>
        <span className="icon">👇</span> Download Show
      </a>
      <a
        className="button"
        href={`https://github.com/wesbos/Syntax/edit/master/${show.notesFile}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon">✏️</span> Edit Show Notes
      </a>
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </div>
  );
};

ShowNotes.propTypes = {
  show: PropTypes.object.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired,
  onClickTimestamp: PropTypes.func.isRequired,
};

export default ShowNotes;
