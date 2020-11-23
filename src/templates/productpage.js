import React, {useEffect, useState} from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux';
import { getItemsFromStorage } from '../state/app';
import { addItem } from '../state/app';
import { navigate } from 'gatsby';

export default function ProductPage({ data }) {
    const [qty, setQty] = useState(1);

    const onSelectChange = e => {
        setQty(parseInt(e.target.value));
    };

    const product = data.product

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('cartItems')) {
            dispatch(getItemsFromStorage());
        }
    }, [dispatch]);

    const onAddItem = () => {
        const itemToAdd = {...product};
        itemToAdd.qty = qty;
        dispatch(addItem(itemToAdd));
        navigate('/cartpage');
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <>
        <Layout>
            <div className="container py-2">
                <button className="btn" onClick={goBack}>Back</button>
                <article className="product product-detail pen-red spacing my-2">    
                <img src={product.imgUrl} alt={product.imgAlt} className="product__image" style={{
                    shapeOutside: `url(${product.imgUrl})`
                }}/>
                <h1 className="product__title">{product.name}</h1>
                <p className="product__description">{product.fulldescription}</p>
                <p>{product.price/100} Euro</p>
                        <div>Quantity:{" "}
                        <select name="prodpageqty" id="prodpageqty" value={qty}
                        // esLint-disable-next-line 
                        onChange={onSelectChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>
                        <button className="btn" onClick={onAddItem}>Add to cart</button>
                </article>    
            </div>
            </Layout>
        </>
    );
};

export const query = graphql`
    query($id: String!) {
        product(id : { eq: $id }) {
            _id
            id
            name
            fulldescription
            price
            imgUrl
            imgAlt
            remoteImage {
                id
                childImageSharp {
                  id
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }
    }
`