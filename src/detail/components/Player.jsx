import React from 'react';

const Player = ({url}) => (
    <video src={url} style={{ width: '100%', marginTop: 10 }} controls={'controls'}></video>
)

export default Player