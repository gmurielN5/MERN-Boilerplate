import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute =({component: Component, ...rest }) => {
    const { isAuthenticated }= useContext(AuthContext);
        return(
            <Route {...rest} render={(props) => (
                isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                    }} />
            )} />
        )
}

export default ProtectedRoute;