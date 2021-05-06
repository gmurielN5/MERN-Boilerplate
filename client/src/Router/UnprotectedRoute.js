import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

const UnprotectedRoute =({component: Component, ...rest }) => {
    const { isAuthenticated }= useContext(AuthContext);
        return(
            <Route {...rest} render={(props) => (
                !isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                    }} />
            )} />
        )
}

export default UnprotectedRoute;