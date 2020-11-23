import React from 'react';
import { useDispatch } from 'react-redux';
import { rebuild } from '../state/auth';

const RebuildButton = ({ products }) => {
    const dispatch = useDispatch();

    const onRebuild = () => {
        dispatch(rebuild());
    };

    return (
        <div className="rebuild-button-container form-container pt-2">
            <h3>You have edited or added {products.filter(item => item.editedSinceRebuild === true).length} products since the last rebuild of your site.</h3>
            <div className="icon-container">
                <button className={products.filter(item => item.editedSinceRebuild === true).length > 0 ? "icon-active btn" : "icon btn"} onClick={onRebuild}>Rebuild
                    {/* <div className="button-image"></div> */}
                </button>
            </div>
        </div>
    );
};

export default RebuildButton;