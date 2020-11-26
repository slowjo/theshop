import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { sendEdit, sendAdded, selectProduct } from '../state/auth';

const EditForm = ({ product, hideForm, backToRef, detailsPage }) => {
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        description: '',
        fulldescription: '',
        price: '',
    });

    useEffect(() => {
        if (product) {
            setEditedProduct({
                // ...editedProduct,
                // _id: product._id,
                // name: product.name,
                // description: product.description,
                // fulldescription: product.fulldescription,
                // price: product.price,
                ...product
            });
        }
    }, [product]);

    const { name, description, fulldescription, price, isFeatured } = editedProduct;

    const onChange = e => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        if (product) {
            dispatch(sendEdit(editedProduct));
        } else {
            dispatch(sendAdded(editedProduct));
        }
        onHideForm();
        if (detailsPage) {
            dispatch(selectProduct(editedProduct));
        }
    };

    const onHideForm = () => {
        hideForm();
        if (product && backToRef) {
            backToRef(product._id);
        }
    };

    return (
        <div className="form-container edit-form-container">    
        <form onSubmit={onSubmit} className="spacing edit-form">
            <div className="edit-top">
            <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
            <button className="btn close-btn" onClick={onHideForm}>x</button>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                 />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={onChange}
                    className="description-input"
                 />
            </div>
            <div className="form-group">
                <label htmlFor="fulldescription">Full Description</label>
                <textarea
                    name="fulldescription"
                    value={fulldescription}
                    onChange={onChange}
                    className="full-description-input"
                 />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={onChange}
                 />
            </div>
            <div className="form-group checkbox-form-group">
                <label htmlFor="isFeatured">Show As Featured</label>
                <input
                    type="checkbox"
                    name="isFeatured"
                    value={!isFeatured}
                    checked={isFeatured}
                    onChange={onChange}
                 />
            </div>
            <input type="submit" value={product ? 'Update Product' : 'Add Product'} className="btn"/>
        </form>
        </div>
    );
};

export default EditForm;