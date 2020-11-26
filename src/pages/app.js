import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { authAdmin } from '../state/auth';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import PrivateRoute from '../components/privateRoute';
import Login from '../components/login';
import AdminArea from '../components/adminarea';
import Details from '../components/details';
import OrdersOverview from '../components/ordersOverview';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authAdmin());
    }, [dispatch, authAdmin]);

    return (
        <Layout>
            <Router>
                <PrivateRoute path="/app/adminarea" component={AdminArea} />
                {/* <Details path="/app/details"/> */}
                <PrivateRoute path="/app/details" component={Details} />
                <PrivateRoute path="/app/orders" component={OrdersOverview} />
                <Login path="/app/login" />
            </Router>
        </Layout>
    );
}

export default App;