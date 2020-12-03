import React, { useContext, useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom'
import authService from '../authService';
import { AppContext } from './Main';
import Login from './ProjectComponents/Login'
import NavigationWrapper from './NavigationWrapper';
import Preloader from './Preloader';
import PrivateRoute from './PrivateRoute'
import Register from './ProjectComponents/Register';
import Shop from './ProjectComponents/Shop';


const App = () => {
    const { loggedIn, setLoggedIn} = useContext(AppContext)
    const [ view, setView ] = useState(false)
    useEffect(() => {
        authService.authenticate((arg) => {
            setLoggedIn(arg)
        })
        setTimeout(() => {
            setView(true)
        }, 1000)
    })
    
    return (
        view ? 
    <div>
        <Switch>
            <Route path="/ui/login" component = { Login } />
           
             <PrivateRoute  path="/ui/register">
                <NavigationWrapper>
                    <Register/>
                </NavigationWrapper>
            </PrivateRoute> 
           
            <PrivateRoute exact path="/ui">
                <NavigationWrapper>
                    <Shop/>
                </NavigationWrapper>
            </PrivateRoute>
        </Switch>
    </div>
    :
    <Preloader message="Loading"/>
    );
}
export default App;