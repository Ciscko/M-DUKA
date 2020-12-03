import { ErrorMessage, Field } from 'formik';
import React from 'react';
import ErrorComponent from './ErrorComponent';
const TextArea = ({name, label}) => {
    return (
    <div className="input-field">
        <label className="active" htmlFor={name}>{label}</label>
        <Field  className="materialize-textarea" name={name} id={name} as="textarea"/>
        <ErrorMessage name={name} component={ErrorComponent}/>
    </div>
    );
}
export default TextArea;