import React from 'react';
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('token')) {
                    return <Component {...props} />
                } else {
                    return (alert("Forbidden", setTimeout(5000)), <Redirect to="/login" />)
                }
            }}
        />



    )
};


export default PrivateRoute
