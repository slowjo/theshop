import React, { useState } from 'react';

const CheckoutForm = ({ onCustomerSave }) => {
    const [customer, setCustomer] = useState({
        // firstName: '',
        // lastName: '',
        // address: '',
        email: '',
        password: '',
    });

    const { 
        // firstName, lastName, address, 
        email, password } = customer;

    const onChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onCustomerSave(customer);
    };

    return (
        <div className="form-container">
            <h2>Customer Details</h2>
            <form onSubmit={onSubmit} className="spacing">
                {/* <div className="form-group">
                    <label htmlFor="fisrtName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={onChange}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" value="Submit" className="btn"/>
            </form>
        </div>
    );
};

export default CheckoutForm;