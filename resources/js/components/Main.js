import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import Alert  from './Alert';
import Toast  from './Toast';

function Main() {
    return (
        <>
        <NavBar/>
        <br></br><br></br>
        <Toast message="Submitted successfully."/>
        <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6 col-sm-8 col-xs-10"> <Alert/></div>
        </div>
        </>
    );
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
