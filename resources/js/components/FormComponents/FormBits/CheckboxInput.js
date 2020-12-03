import { ErrorMessage, Field } from 'formik';
import React from 'react';
import ErrorComponent from './ErrorComponent';

const CheckboxInput = ({options, name, label }) => (
    <div className="">
        <div>{label}</div>
        {
            options.map((option) => {
                return (

                    <label key={option.key}>
                        <br></br>
                        <Field type="checkbox" name={name} value={option.key} />
                        <span>{ option.value}</span>
                    </label>
                )
            })
        }
        <ErrorMessage name={name} component={ErrorComponent} />
    </div>
);
export default CheckboxInput;