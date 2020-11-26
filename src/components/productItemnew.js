import React from 'react';
// import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { useDispatch } from 'react-redux';
import { selectProduct, setModalProduct } from '../state/auth';
// import Pen from '../assets/picseven.png';

export default function ProductItemnew({ product, prodNum, isAdmin, showForm, productRef, showMessage }) {
    let className = "product pen-red spacing";
    if (prodNum === 1) {
        className = 'product pen-white spacing';
    } else if (prodNum === 2) {
        className = 'product pen-blue spacing';
    }

    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(selectProduct(product));
    }

    const onShowForm = () => {
        dispatch(setModalProduct(product));
        showForm();
    };

    const onShowMessage = (message) => {
        dispatch(setModalProduct(product));
        showMessage(message)
    }

    const onRemove = () => {
        onShowMessage('Are you sure?');
        // dispatch(removeProduct(product._id));
    }

    return (
        <>
        {isAdmin && (
        <div className="my-1">
            <button className="btn"
                onClick={onShowForm}
                >Edit
            </button>
            <button className="btn ml-1 bg-red"
                onClick={onRemove}
                >Delete
            </button>
        </div>    
        )}
        <article className={className} ref={productRef}>
            {/* <Img
                fluid={product.remoteImage.childImageSharp.fluid}
                alt={product.imgAlt}
                className="product__image"
                style={{
                    shapeOutside: `url('${product.imgUrl}')`
                }}
            /> */}
            <img src={product.imgUrl} alt={product.imgAlt} className="product__image" style={{
                    shapeOutside: `url('${product.imgUrl}')`
                }}/>
            <h3 className="product__title">{product.name}</h3>
            <p className="product__description">{product.description}</p>
            {!isAdmin ? (
                <Link to={`/products/${product.id}`} className="btn">Buy Now</Link>
            ) : (
                <Link to={`/app/details`} className="btn" onClick={onClick}>View Details</Link>
            )}
        </article>
        </>
    );
};