import React, {useState} from 'react';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, removeProduct } from '../state/auth';
import EditForm from './editForm';
import ModalMessage from './modalMessage';

const Details = ({ location }) => {
    const dispatch = useDispatch();

    const authState = useSelector(state => state.auth);

    const { selectedProduct } = authState;

    const goBack = () => {
        window.history.back();
    };

    const [showBackdrop, setShowBackdrop] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const detailsHeight = {minHeight: "1500px"};

    const showStyle = {display: "block"};

    const showFormFunc = () => {
        setShowBackdrop(true);
        setShowForm(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const onShowForm = () => {
        showFormFunc();
    };

    const hideForm = () => {
        setShowForm(false);
        setShowBackdrop(false);
    }

    const showMessageFunc = (message) => {
        setShowBackdrop(true);
        setShowMessage(true);
        dispatch(setMessage(message));
    };

    const hideMessageFunc = () => {
        setShowMessage(false);
        setShowBackdrop(false);
    };

    const onYes = () => {
        hideMessageFunc();
        dispatch(removeProduct(selectedProduct._id));
        navigate('/app/adminarea');
        console.log('You said yes.');
    }

    const onNo = () => {
        hideMessageFunc();
        console.log('You said no.');
    };

    const onRemove = () => {
        // dispatch(removeProduct(selectedProduct._id));
        // navigate('/app/adminarea');
        showMessageFunc('Are you sure?');
    };

    return (
        <>
        <div className="backdrop" style={showBackdrop ? showStyle : {}}></div>
            <div className="modal" style={showForm ? showStyle : {}}>
                {showForm && (
                    <EditForm product={selectedProduct} hideForm={hideForm} detailsPage={true} />
                )}
            </div>
            <div className="message-modal" style={showMessage ? showStyle : {}}>
                {showMessage && (
                    <ModalMessage onYes={onYes} onNo={onNo} />
                )}
            </div>
        {selectedProduct && (
        <div className="container py-2 details-container" style={showForm ? detailsHeight : {}}>
                <button className="btn mb-1" onClick={goBack}>{"<"} Back</button>
                <br/>
                <button className="btn" onClick={onShowForm}>Edit</button>
                <button className="btn ml-1 bg-red" onClick={onRemove}>Delete</button>    
                <article className="product product-detail pen-red spacing my-2">    
                <img src={selectedProduct.imgUrl} alt={selectedProduct.imgAlt} className="product__image" style={{
                    shapeOutside: `url(${selectedProduct.imgUrl})`
                }}/>
                 <>   
                    <h1 className="product__title">{selectedProduct.name}</h1>
                    <p className="product__description">{selectedProduct.fulldescription}</p>
                    <p>{selectedProduct.price/100} Euro</p>
                </>
                        <div>Quantity:{" "}
                        <select name="prodpageqty" id="prodpageqty">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>
                        <button className="btn">Add to cart</button>
                </article>    
            </div>
        )}
        </>
    );
};

export default Details;