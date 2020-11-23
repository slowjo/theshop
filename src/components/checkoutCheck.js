import React from 'react';

const CheckoutCheck = ({ customerProp, cartItemsProp, onBuy }) => {
    const onClick = () => {
        onBuy();
    };

    return (
        <>
            <h1>Checkout Summary</h1>
            <div className="customer-details">
                <h2>Your Details: </h2>
                <p>{customerProp.firstName}</p>
                <p>{customerProp.lastName}</p>
                <p>{customerProp.email}</p>
                <p>{customerProp.address}</p>
            </div>
            <div className="order-summary">
                {cartItemsProp.map(item => (
                    <div key={item._id}>
                        <h2>{item.name}</h2>
                        <p>quantity: {item.qty}</p>
                    </div>
                ))}
            </div>
            <button className="btn" onClick={onClick}>Order Now</button>
        </>
    );
};

export default CheckoutCheck;