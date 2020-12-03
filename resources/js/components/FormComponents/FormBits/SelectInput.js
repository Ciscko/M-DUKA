import React from 'react';
import { Field, ErrorMessage } from 'formik'
const SelectInput = ({ name, label, options }) => (
    <div className="input-field">
        <br></br>
        <label className="active" htmlFor={name}>{label}</label>
        <Field as="select" name={name} id={name}>
            {
                options.map((option) => {
                    return (
                        <option key={option.key} value={option.key}>{option.value}</option>
                    )
                })
            }
        </Field>
        <ErrorMessage name={name} />
    </div>
);
export default SelectInput;