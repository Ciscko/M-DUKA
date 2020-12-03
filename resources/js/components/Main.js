import ReactDOM from 'react-dom';
import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
export const AppContext = createContext()
function Main() {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false)
    return (
        <>
            <AppContext.Provider value={{ loggedIn, setLoggedIn, submitting, setSubmitting }}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AppContext.Provider>  
        </>
    );
}

export default Main;

if (document.getElementById('mainapp')) {
    ReactDOM.render(<Main />, document.getElementById('mainapp'));
}
