import React from 'react';
import FeaturedItem from './featuredItem';

export default function Featured({ products, isAdmin }) {
    return (
        <section className="featured">
          <div className="container">
            <h2 className="section-title">Featured products</h2>
            <div className="split">
              {products.map(product => (
                <FeaturedItem key={isAdmin ? product._id : product.id} product={product} isAdmin={isAdmin} />
              ))}
            </div>
          </div>
        </section>
    );
};
