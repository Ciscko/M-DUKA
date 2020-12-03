import React from 'react';
const Preloader = (props) => (
    <div className='container center' style={{ 'paddingTop': '5%' , 'paddingBottom': '5%'}}>
        <h5>{props.message ? props.message : 'Loading...'}</h5><br></br>
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    </div>
);
export default Preloader;