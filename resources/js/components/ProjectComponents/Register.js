import React, { useState, useContext } from 'react';
import FormControl from '../FormComponents/FormBits/FormControl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import authService from '../../authService';
import { AppContext } from '../Main';
import Preloader from '../Preloader';


const Register = (props) => {
    const [submitting, setSubmitting] = useState(false)
    const initialValues = { email: '', password: '', name : '', password_confirmation : '' }
    //const { loggedIn, setLoggedIn } = useContext(AppContext)
   // console.log(props.location.state.referer.pathname)
    const prevUrl = '/admin/login'
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format.').required('Email is required.'),
        name : Yup.string().required('Name is required.'),
        password: Yup.string().required('Password is required.').min(6, 'Paasword must 6 characters or more.'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const onSubmit = (values, submitMethodProps) => {
        setSubmitting(true)
        Axios.post(`${authService.baseUrl}register`, {
            email: values.email, password: values.password,
             name : values.name, password_confirmation : values.password_confirmation
        }).then(res => {
            if (res.data.token) {
                //localStorage.setItem('authToken', JSON.stringify(res.data.token))
               // authService.authenticate((arg) => {
                 //   setLoggedIn(arg)
                //})
            }
        }).then(() => {
            submitMethodProps.resetForm()
            props.history.push(prevUrl)
        }).catch(err => {
            console.log(err)
            setSubmitting(false)
        })
    }

    return (
        !submitting ?
            <div className="container">
                <div className="row">
                <div className="col l6 m6 s12 offset-l3 offset-m3">
                    <div className="card center" style={{ 'marginTop': '5%' }}>
                        <div className="container section">
                            <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnMount onSubmit={onSubmit} >
                                {
                                    (formProps) => (
                                        <Form>
                                            <h4 className="center">Register New User</h4><hr></hr>
                                            <FormControl type="text" name="name" label="Name" />
                                            <FormControl type="text" name="email" label="Email" />
                                            <FormControl type="password" name="password" label="Password" />
                                            <FormControl type="password" name="password_confirmation" label="Password Confirm" />
                                            <div className="input-field">
                                                <button type="submit" disabled={formProps.isSubmitting || !formProps.isValid} className="btn green center">Submit</button>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            :
            <div className="container center section" style={{ 'marginTop': '7%' }}>
                <Preloader />
            </div>
    )

};
export default withRouter(Register);