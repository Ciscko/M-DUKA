import React, { useState, useContext } from 'react';
import FormControl from '../FormComponents/FormBits/FormControl'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import authService from '../../authService';
import { AppContext } from '../Main';
import Preloader from '../Preloader';
import './custom.css'
import 'materialize-css/dist/css/materialize.css'

const Login = (props) => {
    //const [submitting, setSubmitting] = useState(false)
    const initialValues = { email: '', password: '' }
    const { loggedIn, setLoggedIn, setSubmitting, submitting } = useContext(AppContext)
    const prevUrl = props.location.state ? props.location.state.referer.pathname : '/admin'
    
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format.').required('Email is required.'),
        password: Yup.string().required('Password is required.').min(6, 'Paasword must 6 characters or more.')
    })

    const onSubmit = (values, submitMethodProps) => {
        setSubmitting(true)
        Axios.post(`${authService.baseUrl}login`, {
            email: values.email, password: values.password
        }).then(res => {
            if (res.data.token) {
                localStorage.setItem('authToken', JSON.stringify(res.data.token))
                authService.authenticate((arg) => {
                    setLoggedIn(arg)
                    props.history.push(prevUrl)
                })
            }
        }).then(() => {
            //submitMethodProps.resetForm()
            setTimeout(() => {
                setSubmitting(false)
            }, 1000)
        }).catch(err => {
            console.log(err)
            setSubmitting(false)
        })
    }

    let imgUrl = `${authService.staticUrl}images/arc6.jpg`
    return (
        !submitting ?
            !loggedIn ?
                <div id="login">
                    <div className="container">
                        <div className="row" style={{ 'marginTop': '17%' }}>
                            <div className="col l6 m6 s12 offset-l3 offset-m3">
                                <div className="card center">
                                    <div className="container section">
                                        <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnMount onSubmit={onSubmit} >
                                            {
                                                (formProps) => (
                                                    <Form>
                                                        <h4 className="center">Login</h4><hr></hr>
                                                        <FormControl type="text" name="email" label="Email" />
                                                        <FormControl type="password" name="password" label="Password" />
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
                </div>

                :
                <Redirect to={prevUrl} />
            :
            <div className="center">
                <Preloader />
            </div>
    )

};
export default withRouter(Login);