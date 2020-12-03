import React from 'react';

const ErrorComponent = ({children}) => (
    <div className="red-text">
        {
            children
        }
    </div>
);
export default ErrorComponent;