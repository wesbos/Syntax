export function addToPreviouslyWatched(showNumber, progressTime = 0) {
  if (typeof window === "undefined") return false;

  let getEpisodesWatched = window.localStorage.getItem(`watchedEpisodes`);
  let watchedEpisodes =
    getEpisodesWatched && JSON.parse(getEpisodesWatched)
      ? JSON.parse(getEpisodesWatched)
      : [];

  let haveWatched = watchedEpisodes.some(ep => parseInt(ep, 10) === showNumber);

  if (!haveWatched && Math.round(progressTime) > 75) {
    localStorage.setItem(
      `watchedEpisodes`,
      JSON.stringify([...watchedEpisodes, `${showNumber}`])
    );
  }
}

export function havePreviouslyWatched(showNumber) {
  if (typeof window === "undefined") return false;

  let getEpisodesWatched = window.localStorage.getItem(`watchedEpisodes`);
  let watchedEpisodes =
    getEpisodesWatched && JSON.parse(getEpisodesWatched)
      ? JSON.parse(getEpisodesWatched)
      : [];

  let haveWatched = watchedEpisodes.some(ep => parseInt(ep, 10) === showNumber);

  return haveWatched;
}
