import React from 'react';
import spinnerGif from '../assets/spinner.gif';

export default () => (
    <>
        <img
            src={spinnerGif}
            style={{
                margin: "auto",
                display: "block",
                width: "200px"
            }}
            alt="loading..."
        />
    </>
);