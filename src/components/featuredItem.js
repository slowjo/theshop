import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../state/auth';

export default function FeaturedItem({ product, isAdmin }) {
    const dispatch = useDispatch();

    const onClick = () => {
        if (isAdmin) {
            dispatch(selectProduct(product));
        }
    }

    return (
        <Link onClick={onClick} to={isAdmin ?  `/app/details` : `/products/${product.id}`} className="featured__item">
            {isAdmin ? (
                <img className="featured__image" src={product.imgUrl} alt={product.imgAlt}/>
            ) : (
                <Img
                fluid={product.remoteImage.childImageSharp.fluid}
                alt={product.imgAlt}
                className="featured__image"
            />
            )}
            <p className="featured__details"><span className="price">&#8364;{product.price/100}</span>{product.name}</p>
        </Link>
    );
};