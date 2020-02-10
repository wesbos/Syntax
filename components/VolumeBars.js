/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, Fragment } from 'react';
// TODO Fix all eslint issues

function VolumeBars({ currentVolume, setVolume, length = 10 }) {
  
  length = Number(length)
  
  const bars = Array.from({length}, (_, i) => {

    i = i + 1 // 0 indexed to 1 indexed
    const decimal = i / length
    const checked = decimal <= currentVolume
    const style = { background: (checked ? '#03fff3' : '#e4e4e4') }
    const id = `volume-${i}`
    const labelText = `Volume Level ${decimal * 100}/100`

    return <Fragment key={i}>
      <input
        id={id}
        className='sr-only'
        name="volume"
        type="radio"
        value={decimal}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      <label htmlFor={id} style={style}>
        <span className="sr-only">{labelText}</span>
      </label>
    </Fragment>
  })
  
  return (
    <Fragment>
      {bars}
    </Fragment>
  );
}

export default VolumeBars;
