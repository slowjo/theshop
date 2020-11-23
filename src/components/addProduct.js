import React from 'react';

const AddProduct = ({ showForm }) => {
    const onShowForm = () => {
        showForm();
    };

    return (
        <>
            <div className="text-center btn-round-container">
            <button className="btn btn-round" 
            onClick={onShowForm}
            >
                +
            </button>
            <br/>
            New Product
            </div>
        </>
    );
};

export default AddProduct;