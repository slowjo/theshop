import React from 'react';
import { Link, navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../state/auth';

export default function Navbar() {
    const authState = useSelector(state => state.auth);

    const { isLoggedIn } = authState;

    const dispatch = useDispatch();

    const onExit = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="navbar">
            <h1 className="logo">TheShop</h1>
            <input type="checkbox"  id="nav-toggle" className="nav-toggle"/>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <>   
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cartpage">Cart</Link>
                        </li>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                        <li>
                            <Link to="/app/adminarea">Edit Products</Link>
                        </li>
                        <li>
                            <Link to="/app/orders">Orders</Link>
                        </li>
                        <li>
                            {/* <button
                                className="btn"
                                onClick={onExit}
                            >
                                Exit
                            </button> */}
                            <a onClick={onExit} href="#!">Exit Editmode</a>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span></span>
            </label>
        </header>
    );
};
