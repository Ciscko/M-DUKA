import { ErrorMessage, Field } from 'formik'
import React from 'react'
import ErrorComponent from './ErrorComponent'

const DatePick = ({ name, label }) => {
    return(
        <div className="input-field">
            <label className="active" htmlFor={name}>{label}</label>
            <Field id={name} name={name} type="date"/>
            <ErrorMessage name={name} component={ErrorComponent} />
        </div>
    );
}
export default DatePick;
