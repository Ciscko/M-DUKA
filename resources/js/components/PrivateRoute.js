import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from './Main'

const PrivateRoute = ( {children, location, ...rest }) => {
    const {loggedIn} = useContext(AppContext)
    //console.log(location)
    return ( 
        loggedIn ? <Route { ...rest } render = { () => children } />
        :
       <Redirect to={{ pathname : "/ui/login", state : {referer : location }}}/>
    );
}

export default PrivateRoute;