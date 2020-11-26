import React from 'react';
import { useSelector } from 'react-redux';

const ModalMessage = ({ onYes, onNo }) => {
    const authState = useSelector(state => state.auth);

    const { message } = authState;

    const onYesClick = () => {
        onYes();
    };

    const onNoClick = () => {
        onNo();
    };

    return (
        <div className="modal-message spacing">
            <h2>
                {message}
            </h2>
            <div className="modal-message__buttons">
                <button className="btn bg-red" onClick={onYesClick}>Yes</button>
                <button className="btn ml-1" onClick={onNoClick}>Cancel</button>
            </div>
        </div>
    );
};

export default ModalMessage;