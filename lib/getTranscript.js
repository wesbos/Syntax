const { promisify } = require('util');
const path = require('path');
const { readFile, readdir, writeFileSync } = require('fs');

const readAFile = promisify(readFile);
const readDirContents = promisify(readdir);
const parseSRT = require('parse-srt');

let shows;

function formatSeconds(seconds) {
  const dateString = new Date(1000 * seconds).toISOString().substr(11, 8);
  const [hh, mm, ss] = dateString.split(':');
  return { hh, mm, ss };
}

function parseTranscript(transcript) {
  const parsed = parseSRT(transcript);
  // get the speaker
  return parsed.map((line) => {
    const [wholeLine, speaker = '', text = ''] =
      line.text.match(/^(.*):\s(.*)/) || [];
    const initials = speaker
      .split(' ')
      .slice(0, 2)
      .map((x) => x[0])
      .join('');
    return {
      ...line,
      speaker,
      initials,
      text,
      timestamp: formatSeconds(line.start),
    };
  });
}

async function loadTranscripts() {
  // // Cached shows
  // if (shows) {
  //   return shows;
  // }

  const transcriptsDir = path.join(process.cwd(), 'transcripts');
  const files = (await readDirContents(transcriptsDir)).filter((file) =>
    file.endsWith('.srt')
  );
  const srtPromises = files.map((file) =>
    readAFile(path.join(transcriptsDir, file), 'utf-8')
  );
  const allTranscripts = await Promise.all(srtPromises);
  const parsed = allTranscripts.map(parseTranscript);
  writeFileSync('./transcripts.json', JSON.stringify(parsed));

  return shows;
}

loadTranscripts();

async function getShows(filter) {
  // eslint-disable-next-line no-shadow
  const showsForGetShows = await loadTranscripts();
  const now = Date.now();
  return filter === 'all'
    ? showsForGetShows
    : showsForGetShows.filter((show) => show.date < now);
}

async function getShow(number) {
  const showsForGetShow = await loadTranscripts();
  const show = showsForGetShow.find(
    (showItem) => showItem.displayNumber === number
  );
  return show;
}

module.exports = {
  getShows,
  getShow,
};
