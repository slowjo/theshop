import React from 'react';
import ProductItemnew from './productItemnew';
import AddProduct from './addProduct';

export default function Productsnew({ products, isAdmin, showForm, productRefs, showMessage }) {
    return (
    <section className="our-products">
        <div className="container">
            <h2 className="section-title">{isAdmin ? 'Edit Products' : 'Our products'}</h2>
            {isAdmin ? (
                <>
                {products.map((product, index) => (
                <ProductItemnew key={product._id} product={product} prodNum={index} isAdmin={isAdmin} showForm={showForm} productRef={productRefs[product._id]} showMessage={showMessage}/>
                ))}
                <AddProduct showForm={showForm} />
                </>
            ) : products.map((product, index) => (
                <ProductItemnew key={product.id} product={product} prodNum={index} isAdmin={isAdmin}/>
            ))}
        </div>
    </section>
    ); 
};