import React, { useEffect } from 'react';

const Alert = (props) => {
    useEffect(() => {
        /* var alertList = document.querySelectorAll('.alert')
        alertList.forEach(function (alert) {
            new bootstrap.Alert(alert)
        }) */
    })
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
    );
    }
export default Alert;