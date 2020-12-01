import React, {useState} from 'react';
import Img from 'gatsby-image';
import { useDispatch } from 'react-redux';
import { removeItem, changeQty } from '../state/app';
import { setClientMessage } from '../state/messages';

export default function CartItem({ item, justAdded }) {
    const dispatch = useDispatch();

    const [deleted, setDeleted] = useState(false);

    const onRemoveItem = () => {
        setDeleted(true);
        setTimeout(() => {
            dispatch(removeItem(item.id));
            dispatch(setClientMessage('Item removed from cart', 'success'));
        }, 250);
    };

    const onChangeQty = (e) => {
        dispatch(changeQty(item.id, parseInt(e.target.value)));
    };

    return (
        <div className={deleted ? "cartitem deleted" : justAdded ? "cartitem just-added" : "cartitem"}>
            <div className="cartitemleft">
            <div>
                <Img
                    style={{width: "100px", height: "100%", marginRight: "15px"}}
                    fluid={item.remoteImage.childImageSharp.fluid}
                    alt={item.imgAlt}
                />
            </div>
            <div>
                <p>Product: {item.name}</p>
                <p>Price: {item.price/100} Euro</p>
            </div>
            </div>
            <div className="cartitemright">
                <button className="btn" onClick={onRemoveItem}>Remove</button>
                <div>Quantity:{" "}
                <select name="qty" id="qty" value={item.qty} onChange={onChangeQty}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>
            </div>
        </div>
    );
};