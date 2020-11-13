const { promisify } = require('util');
const path = require('path');
const { readFile, readdir, writeFileSync } = require('fs');

const readAFile = promisify(readFile);
const readDirContents = promisify(readdir);
const parseSRT = require('parse-srt');

let cachedTranscripts = [];

function formatSeconds(seconds) {
  const dateString = new Date(1000 * seconds).toISOString().substr(11, 8);
  const [hh, mm, ss] = dateString.split(':');
  return { hh, mm, ss };
}

function parseTranscript(transcript, showNumber) {
  const parsed = parseSRT(transcript);
  return {
    showNumber,
    data: parsed.map((line) => {
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
    }),
  };
}

async function loadTranscripts() {
  // // Cached shows
  if (cachedTranscripts.length) {
    return cachedTranscripts;
  }

  const transcriptsDir = path.join(process.cwd(), 'transcripts');
  const files = (await readDirContents(transcriptsDir)).filter((file) =>
    file.endsWith('.srt')
  );
  console.log(files);
  const srtPromises = files.map((file) =>
    readAFile(path.join(transcriptsDir, file), 'utf-8')
  );
  const allTranscripts = await Promise.all(srtPromises);
  const parsed = allTranscripts.map((transcript, i) =>
    parseTranscript(transcript, parseInt(files[i].match(/[0-9]/g).join('')))
  );
  cachedTranscripts = parsed;
  return parsed;
}

async function getShowTranscript(number) {
  const transcripts = await loadTranscripts();
  const transcript = transcripts.find(
    (showItem) => showItem.showNumber === number
  );
  return transcript;
}

module.exports = {
  getShowTranscript,
};
