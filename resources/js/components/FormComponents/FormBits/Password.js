import React from 'react';
import { Field, ErrorMessage } from 'formik'
import ErrorComponent from './ErrorComponent';
 
const PasswordInput = (props) => (
    <div className="input-field">
        <label className="active" htmlFor={props.name}>{props.label}</label>
        <Field  id={props.name}  name={props.name} type={props.type} />
        <ErrorMessage name={props.name} component={ErrorComponent} />
    </div>
);
export default  PasswordInput;