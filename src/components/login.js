import React, {useState, useEffect} from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/auth';

const Login = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const authState = useSelector(state => state.auth);

    const { isLoggedIn } = authState;

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/app/adminarea');
        }
    }, [isLoggedIn]);

    const handleUpdate = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(login(user));
    };

    return (
        <>
            <div className="form-container py-2">        
            <form 
                method="post"
                onSubmit={handleSubmit}
                className="spacing"
            >
                <h1>Login</h1>
                <label>
                    Username<br/>
                    <input type="text" name="username" onChange={handleUpdate}/>
                </label>
                <label>
                    Password<br/>
                    <input 
                        type="password"
                        name="password"
                        onChange={handleUpdate}
                    />
                </label>
                <input type="submit" value="Log In" className="btn"/>
            </form>
            </div>        
        </>
    );
};

export default Login;

