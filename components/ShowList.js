import React from "react";
import PropTypes from "prop-types";
import Show from "./Show";

const ShowList = ({
  shows,
  currentPlaying,
  currentShow,
  setCurrentPlaying,
  highlightSearch,
  query
}) => (
  <div className="showList">
    {shows.map(show => (
      <Show
        setCurrentPlaying={setCurrentPlaying}
        highlightSearch={highlightSearch}
        currentPlaying={currentPlaying}
        currentShow={currentShow}
        key={show.number}
        show={show}
        query={query}
      />
    ))}
    <div className={shows.length ? "no-results hidden" : "no-results"}>
      <p>No matching shows found.</p>
    </div>
    <div className="show show--dummy" />
  </div>
);

ShowList.propTypes = {
  shows: PropTypes.array.isRequired,
  currentPlaying: PropTypes.string.isRequired,
  currentShow: PropTypes.string.isRequired,
  setCurrentPlaying: PropTypes.func.isRequired
};

export default ShowList;
