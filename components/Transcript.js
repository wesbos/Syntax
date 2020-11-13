export default function Transcript({ transcript }) {
  // console.log(transcript);
  return (
    <div>
      <h2>Transcript</h2>
      {transcript?.data.map((line) => (
        <TranscriptLine key={`transcript-${line.id}`} line={line} />
      ))}
    </div>
  );
}

function TranscriptLine({ line }) {
  if (!line.text) return '';
  console.log(line);
  return (
    <div className={`line line--${line.initials}`}>
      <header>
        {line.speaker === 'Wes Bos' && (
          <img src="https://avatars.githubusercontent.com/wesbos?size=200" />
        )}
        {line.speaker === 'Scott Tolinski' && (
          <img src="https://avatars.githubusercontent.com/stolinski?size=200" />
        )}
        <strong>{line.speaker}</strong>
        <span className="time">
          {line.timestamp.hh !== '00' ? `${line.timestamp.hh[1]}:` : ''}
          {line.timestamp.mm}:{line.timestamp.ss}
        </span>
      </header>
      <p>{line.text}</p>
    </div>
  );
}
