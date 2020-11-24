import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, removeOrder } from '../state/auth';

const OrdersOverView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const authState = useSelector(state => state.auth);

    const { orders } = authState;

    const onRemove = (id) => {
        dispatch(removeOrder(id));
    };

    return (
        <>
        <div className="container py-2 orders-container">
            <h2 className="section-title my-1">Orders Overview</h2>
            <div className="orders-overview">
                {orders && orders.map(order => (
                    <div key={order._id} className="order-overview__card">
                    <div className="order-overview__card-top">
                        <p>{order.date}</p>
                        <h3>Customer:</h3>
                        <p>{order.customer.lastName}</p>
                        <h3>Ordered Products:</h3>
                        {order.products.map(item => (
                            <div key={item._id}>
                                <p>Product Name: {item.product.name}</p>
                                <p>Quantity: {item.qty}</p>
                            </div>
                        ))} 
                    </div>    
                    <div className="order-overview__card-bottom">
                        <button className="btn order-overview__delete" onClick={() => onRemove(order._id)}>Delete Order</button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default OrdersOverView;