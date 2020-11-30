import React from 'react';
import { useSelector } from 'react-redux';

const ClientMessage = () => {
    const messageState = useSelector(state => state.messages);

    const { clientMessages } = messageState;

    return (
        clientMessages.length > 0 && clientMessages.map(message => (
            <div key={message.id} className={`client-message client-message-${message.type} ${message.fading}`}>
                {message.msg}
            </div>
        ))
    );
};

export default ClientMessage;