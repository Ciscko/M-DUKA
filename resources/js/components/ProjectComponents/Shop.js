import React, { createRef, useEffect, useState } from 'react';
import Products from './Products'
import M from 'materialize-css'
import * as Yup from 'yup'
import { Formik, Form } from 'formik';
import FormControl from '../FormComponents/FormBits/FormControl';
import Preloader from '../Preloader'
import Axios from 'axios'
import authService from '../../authService';
import { getToken } from '../../authService'

const Shop = (props) => {
    const tabRef = createRef()
    const [currentProduct, setCurrentProduct] = useState({ id: '', name: '', category: '', brand: '', qty: 0, buying: '', selling: '', desc: '' })
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [time, setTime] = useState('')
    const [cartS, setCart] = useState([])
    let tab;

    useEffect(() => {
        M.Tabs.init(tabRef.current)

    }, [])

    useEffect(() => {
        tab = M.Tabs.getInstance(tabRef.current)
    }, [currentProduct.id])

    useEffect(() => {
        tab = M.Tabs.getInstance(tabRef.current)
    }, [time])

    useEffect(() => {
        //localStorage.setItem('cart', JSON.stringify(cartS) )
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(Array.isArray(cart)){
            setCart([...cartS, ...cart])
        }
    }, [])

    const sell = (values) => {
        setCurrentProduct({
            id: values[0], name: values[1], category: values[2],
            brand: values[3], selling: values[4], buying: values[5],
            qty: values[6], desc: values[7]
        })
        const tab = M.Tabs.getInstance(tabRef.current)
        let cart = JSON.parse(localStorage.getItem('cart'))
        localStorage.setItem('cart', JSON.stringify([...cartS, cart]))
        setCart([...cartS, {
            id: values[0], name: values[1], category: values[2],
            brand: values[3], selling: values[4], buying: values[5],
            qty: values[6], desc: values[7]
        }])

        tab.select('cart')
    }

    const editValues = currentProduct

    const initialValues = { name: '', category: '', brand: '', qty: 0, buying: '', selling: '', desc: '' }

    const initProduct = { id: '', name: '', category: '', brand: '', qty: 0, buying: '', selling: '', desc: '' }

    const validationSchema = Yup.object({
        'name': Yup.string().required('Name is required.'),
        'category': Yup.string().required('Category is required.'),
        'brand': Yup.string().required('Brand is required.'),
        'qty': Yup.number().required('Quantity is required.'),
        'selling': Yup.number().required('Selling Price is required.'),
        'buying': Yup.number().required('Buying Price is required.'),
        'desc': Yup.string()
    })
    const paginatedColumns = [
        //{ key: 'id', value: 'ID' },
        { key: 'name', value: 'Name' },
        { key: 'category', value: 'Category' },
        { key: 'brand', value: 'Brand' },
        { key: 'selling', value: 'S-Price' },
        { key: 'buying', value: 'B-Price' },
        { key: 'qty', value: 'Quantity' },
        { key: 'desc', value: 'Description' }
    ]

    const onSubmit = (values, submitProps) => {
        //console.log(values)
        setSubmiting(true)
        let url = editMode ? `${authService.otherUrl}product/update/${currentProduct.id}` : `${authService.otherUrl}product/create`
        Axios.post(url, values, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
            .then(res => {
                setEditMode(false)
                setSubmiting(false)
                let d = new Date()
                setTime(`${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`)
            }).then(() => {
                //tab = M.Tabs.getInstance(tabRef.current)
                tab.select('main')

            }).catch(err => {
                console.log(err)
                setSubmiting(false)
            })
    }



    const edit = (values) => {
        setEditMode(true)
        setCurrentProduct({
            id: values[0], name: values[1], category: values[2],
            brand: values[3], selling: values[4], buying: values[5],
            qty: values[6], desc: values[7]
        })

        tab.select('form')
        //console.log(values)
    }

    return (
        <div>
            <div className="card main-card">
                <div className="container center">
                    <h4 className="center">Shop</h4><hr></hr>
                    <ul className="tabs tabs-fixed-width tab-demo z-depth-1" ref={tabRef}>
                        <li className="tab"><a className="active" href="#main">Main</a></li>
                        <li className="tab"><a href="#form">Form</a></li>
                        <li className="tab"><a href="#view">View</a></li>
                        <li className="tab"><a href="#cart">Cart</a></li>
                    </ul>
                    <div id="main" className="col s12">
                        <Products columns={paginatedColumns} sellProp={sell} editProp={edit} editMode={time} />
                    </div>
                    <div id="form" className="col s12">
                        <br></br>
                        <div className="card" style={{ 'padding': '5%' }}>
                            {
                                submiting ?
                                    <Preloader message="Submitting Data..." />
                                    :
                                    <Formik enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit} initialValues={editMode ? editValues : initialValues} validateOnMount >
                                        {
                                            (formikProps) => {

                                                return (
                                                    <Form>
                                                        <div className="row">
                                                            <div className="col l6 m6 s12">
                                                                <FormControl name="name" label="Product Name" type="text" />
                                                                <FormControl name="category" label="Category" type="text" />
                                                                <FormControl name="brand" label="Brand" type="text" />
                                                                <FormControl name="qty" label="Quantity" type="number" />
                                                            </div>
                                                            <div className="col l6 m6 s12">
                                                                <FormControl name="buying" label="Buying Price" type="text" />
                                                                <FormControl name="selling" label="Selling Price" type="text" />
                                                                <FormControl name="desc" label="Decription" type="textarea" />
                                                                <br></br>
                                                                <button className="btn pink" onClick={(e) => { e.preventDefault(); setEditMode(false); setCurrentProduct(initProduct) }} >Reset</button>
                                                                <button disabled={!formikProps.isValid && formikProps.isSubmitting} className="btn green" type="submit">{editMode ? 'Save' : 'Submit'}</button>
                                                            </div>
                                                        </div>
                                                        <br></br><br></br>
                                                    </Form>
                                                )
                                            }
                                        }
                                    </Formik>
                            }
                        </div>

                        <br></br>
                    </div>
                    <div id="view" className="col s12">
                        <div className="card">
                            {
                                currentProduct.id === '' ?
                                    <Preloader message="No item selected" />
                                    :
                                    <div className="card col l6 offset-l3 offset-m3">

                                        <ul className="collection with-header">
                                            <li className="collection-header"><h4>{currentProduct.name}</h4></li>
                                            <li className="collection-item"><b>Category : </b>{currentProduct.category}</li>
                                            <li className="collection-item"><b>Brand : </b>{currentProduct.brand}</li>
                                            <li className="collection-item"><b>Quantity : </b>{currentProduct.qty}</li>
                                            <li className="collection-item"><b>Buying Price : Sh.</b>{currentProduct.buying}</li>
                                            <li className="collection-item"><b>Selling Price : Sh.</b>{currentProduct.selling}</li>
                                        </ul>
                                        {

                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    <div id="cart" className="col s12">
                        <div className="card" style={{ 'overflowX': 'auto' }}>
                            {
                                cartS.length > 0 ?
                                    <div ><br></br>
                                        
                                        <table className="highlight centered">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartS.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {item.name}
                                                                </td>
                                                                <td>1</td>
                                                                <td>
                                                                    {item.selling}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })

                                                }
                                            </tbody>
                                        </table><br></br>
                                        <button onClick={() => { setCart([]); localStorage.clear() }} className="btn pink">Clear</button>
                                        <br></br><br></br>
                                    </div>

                                    :
                                    <Preloader message='No items in the cart yet' />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Shop;