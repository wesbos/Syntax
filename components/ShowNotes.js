import React from "react";
import PropTypes from "prop-types";
import Show from "./Show";

class ShowNotes extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      const showNotes = document.querySelector(".showNotes");
      showNotes.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
    }
  }

  render() {
    const { show, setCurrentPlaying } = this.props;

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
          href={`https://github.com/wesbos/Syntax/edit/master/${
            show.notesFile
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">✏️</span> Edit Show Notes
        </a>
        <div dangerouslySetInnerHTML={{ __html: show.html }} />
      </div>
    );
  }
}

ShowNotes.propTypes = {
  show: PropTypes.object.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired
};

export default ShowNotes;
