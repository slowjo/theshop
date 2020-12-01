import React, {useEffect, useState} from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsFromStorage, sendOrder } from '../state/app';
import { setClientMessage } from '../state/messages';
import CartItem from '../components/cartItem';
import CheckoutForm from '../components/checkoutForm';
import CheckoutCheck from '../components/checkoutCheck';
import ClientMessage from '../components/clientMessage';

export default function CartPage({ location }) {
    const dispatch = useDispatch();

    let cartItems = [];
    useEffect(() => {
        if (localStorage.getItem('cartItems')) {
            dispatch(getItemsFromStorage());
        }
    }, [dispatch]);
    
    const appState = useSelector(state => state.app);
    const { items } = appState;
    cartItems = items;

    const [cartState, setCartState] = useState('start');

    const onCheckoutStepOne = () => {
        if (cartItems.length === 0) {
            dispatch(setClientMessage('Your cart is empty', 'alert'));
        } else {
            setCartState('second');
        }
    };

    const [customerDetails, setCustomerDetails] = useState(null);

    const onCustomerSave = (customerObj) => {
        setCustomerDetails(customerObj);
        setCartState('third');
    };

    const onBuy = () => {
        dispatch(sendOrder(customerDetails, cartItems, () => setCartState('last')));
        console.log('trying to buy');
        // setCartState('last');
    };

    console.log(cartItems);

    return (
        <>
        <Layout>
            <div className="container py-2 cartpage-container">
            <ClientMessage />    
            {cartState === "start" && (
            <>
            <Link className="btn mb-1" to="/#products">Keep Shopping</Link>    
            <h1>Your Shopping Cart</h1>
            {cartItems.map((item, index) => (
                <CartItem
                    key={item.id}
                    item={item}
                    justAdded={location.state.addedId === item.id ? true : false}
                 />
            ))}
            <div className="tocheckoutdiv">
                <div>
                    <p>Sum: {cartItems.reduce((acc, item) => acc + (item.qty * item.price/100), 0)} Euro</p>
                    <button className="btn my-1" onClick={onCheckoutStepOne}>To Checkout</button>
                </div>
            </div>
            </>
            )}
            {cartState === 'second' && (
                <CheckoutForm onCustomerSave={onCustomerSave} />
            )} 
            {cartState === 'third' && (
                <CheckoutCheck customerProp={customerDetails} cartItemsProp={cartItems} onBuy={onBuy} />
            )}
            {cartState === 'last' && (
                <h1>Thank you for your order!</h1>
            )}   
            </div>
        </Layout>
        </>
    );
};