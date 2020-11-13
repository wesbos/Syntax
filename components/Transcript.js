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
  return (
    <div>
      <p>{line.text}</p>
    </div>
  );
}
