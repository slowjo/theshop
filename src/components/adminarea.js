import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearModalProduct, setMessage, clearMessage, removeProduct } from '../state/auth';
import RebuildButton from './rebuildButton';
import Featured from './featured';
import ProductsNew from './productsnew';
import EditForm from './editForm';
import ModalMessage from './modalMessage';
import Spinner from './spinner';

const AdminArea = () => {
    const dispatch = useDispatch();

    const testAuthState = useSelector(state => state.auth);

    const testProducts = testAuthState.products;

    useEffect(() => {
        if (testProducts.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch]);

    const authState = useSelector(state => state.auth);

    const { products, editableProducts, addedProducts, modalProduct, loading } = authState;

    const [showBackdrop, setShowBackdrop] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const showStyle = {display: "block"};

    const showFormFunc = () => {
        setShowBackdrop(true);
        setShowForm(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const hideForm = () => {
        setShowForm(false);
        setShowBackdrop(false);
        dispatch(clearModalProduct());
    }

    const refs = editableProducts.reduce((acc, value) => {
        acc[value._id] = React.createRef();
        return acc;
    }, {});

    const backToRef = (_id) => {
        refs[_id].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const showMessageFunc = (message) => {
        setShowBackdrop(true);
        setShowMessage(true);
        dispatch(setMessage(message));
    };

    const hideMessageFunc = () => {
        setShowMessage(false);
        setShowBackdrop(false);
        dispatch(clearModalProduct());
        dispatch(clearMessage());
    };

    const onYes = () => {
        hideMessageFunc();
        dispatch(removeProduct(modalProduct._id))
        console.log('You said yes.');
    }

    const onNo = () => {
        hideMessageFunc();
        console.log('You said no.');
    };

    return (
        <>
            <div className="backdrop" style={showBackdrop ? showStyle : {}}></div>
            <div className="modal" style={showForm ? showStyle : {}}>
                {showForm && (
                    <EditForm product={modalProduct} hideForm={hideForm} backToRef={backToRef} />
                )}
            </div>
            <div className="message-modal" style={showMessage ? showStyle : {}}>
                {showMessage && (
                    <ModalMessage onYes={onYes} onNo={onNo} />
                )}
            </div>
            {loading && (
                <Spinner />
            )}
            {products && (
                <>
                <RebuildButton products={products} />
                <Featured products={editableProducts.filter(item => item.isFeatured === true)} isAdmin={true} />
                <ProductsNew products={editableProducts} isAdmin={true} addedProducts={addedProducts} showForm={showFormFunc} productRefs={refs} showMessage={showMessageFunc} />
                </>
            )}
        </>
    );
};

export default AdminArea;