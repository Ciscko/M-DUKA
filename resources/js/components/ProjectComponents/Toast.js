import React, { useEffect } from 'react';
import * as bootstrap  from 'bootstrap'

const Toast = (props) => {
    var toastList;
    useEffect(() => {
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
         toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl, {
                delay : 3000
            })
        })
    })
    return (
        <div>
            <button onClick={() => toastList[0].show() }>Toast Me</button><br></br>
            <div className="toast d-flex align-items-center text-white bg-indigo border-0" style={{'position': 'absolute', 'top': '2', 'right': '0', 'marginRight' : '10px'}} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body">
                   {
                       props.message
                   }
                </div>


                <button className="ml-auto mr-2 text-white close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
        </div>
    );
}
export default Toast;