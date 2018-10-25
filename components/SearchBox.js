import React from "react";

export default ({
  filterShows,
  shows,
  currentShow,
  highlighted,
  className
}) => (
  <div className={"searchBox " + className}>
    <input
      type="text"
      placeholder="Filter shows by title/notes…"
      onChange={e => {
        filterShows(e.target.value, shows, currentShow, highlighted);
      }}
    />
    <span className="search-icon-wpr">
      <span className="search-icon" />
    </span>
  </div>
);
