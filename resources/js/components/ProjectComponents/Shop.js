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
    const [cQty, setCQty] = useState(0)
    const [ tot, setTotal ] = useState(0)
    let tab;

    useEffect(() => {
        M.Tabs.init(tabRef.current)

    }, [])

    useEffect(() => {
        tab = M.Tabs.getInstance(tabRef.current)
        calc()
    }, [currentProduct.id, cQty])

    useEffect(() => {
        tab = M.Tabs.getInstance(tabRef.current)
    }, [time])

    useEffect(() => {
        calc()
    }, [cartS.length])

    const calc = () => {
        let total = 0;
        for(let j in cartS){
            total +=(cartS[j].qty * cartS[j].selling)
        }
        setTotal(total)
    }

    const sell = (values) => {
        setCurrentProduct({
            id: values[0], name: values[1], category: values[2],
            brand: values[3], selling: values[4], buying: values[5],
            qty: values[6], desc: values[7]
        })
        const tab = M.Tabs.getInstance(tabRef.current)
        let flag = false;
        let cartA = cartS
        for (let i in cartA) {
            if (cartA[i].id === values[0]) {
                cartA[i].qty = cartA[i].qty + 1
                flag = true
            }
        }

        if (flag) {
            setCart([...cartA])
            setCQty(cartS.length)
        } else {
            setCart([...cartS, {
                id: values[0], name: values[1], category: values[2],
                brand: values[3], selling: values[4], buying: values[5],
                qty: 1, desc: values[7]
            }])
            setCQty(cartS.length)
        }
        
        //setTotal(tot+(item.selling * item.qty))
        //tab.select('cart')
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
        //{ key: 'category', value: 'Category' },
        //{ key: 'brand', value: 'Brand' },
        //{ key: 'selling', value: 'S-Price' },
        { key: 'buying', value: 'B-Price' },
        //{ key: 'qty', value: 'Quantity' },
        //{ key: 'desc', value: 'Description' }
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

    const setQty = (e, id) => {
        if (e.target.value !== null || e.target.value !== 0) {
            let cartA = cartS
            for (let i in cartA) {
                if (cartA[i].id === id) {
                    cartA[i].qty = e.target.value
                }
            }
            setCart([...cartA])
        }
        calc()
    }

    const setPrice = (e, id) => {
        if (e.target.value !== null || e.target.value !== 0) {
            let cartA = cartS
            for (let i in cartA) {
                if (cartA[i].id === id) {
                    cartA[i].selling = e.target.value
                }
            }
            setCart([...cartA])
        }
        calc()
    }

    const remove = (id) => {
        let cartA = cartS.filter((item) => {
            return id !== item.id
        })
        setCart([...cartA])
        
    }

    const finishSale = () => {
        setSubmiting(true)
        let url = `${authService.otherUrl}`
        Axios.get(`${url}sale/create`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            //console.log('SALE ID',res.data.sale.id)
            let sale_id = res.data.sale.id
            for (let r in cartS) {
                Axios.post(`${url}sale/checkout`, {
                    sales_id: sale_id,
                    product_id: cartS[r].id,
                    product_name: cartS[r].name,
                    qty: cartS[r].qty,
                    sprice: cartS[r].selling,
                    bprice: cartS[r].buying
                }, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }).then(res => {
                    console.log(res)
                    setCart([])
                    setSubmiting(false)
                    tab = M.Tabs.getInstance(tabRef.current)
                    tab.select('main')
                }).catch(err => console.log(err))
            }
        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })


    }

    return (
        <div>
            <div className="card main-card">
                <div className="container center">
                    <h4 className="center">Point Of Sale</h4><hr></hr>
                    <ul className="tabs tabs-fixed-width tab-demo z-depth-1" ref={tabRef}>
                        <li className="tab"><a className="active" href="#main"><i className="material-icons">list</i></a></li>
                        <li className="tab"><a href="#view">View </a></li>
                        <li className="tab"><a href="#cart"> <i className="material-icons">shopping_cart</i> {cartS.length}</a></li>
                    </ul>
                    <div id="main" className="col s12">
                        <Products columns={paginatedColumns} sellProp={sell} editProp={edit} editMode={time} />
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
                                            <li className="collection-item"><b>Description: </b>{currentProduct.desc}</li>
                                            <li className="collection-item">...</li>
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
                                submiting ?
                                    <Preloader message="Processing" />
                                    :
                                    cartS.length > 0 ?
                                        <div ><br></br>

                                            <table className="highlight centered">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Sub</th>
                                                        <th>Action</th>
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
                                                                    <td><input style={{ 'maxWidth': '50px' }} onChange={(e) => setQty(e, item.id)} className="browser-default" type="number" value={item.qty} name="quaty" /></td>
                                                                    <td>
                                                                        <input style={{ 'maxWidth': '80px' }} onChange={(e) => setPrice(e, item.id)} className="browser-default" type="number" value={item.selling} name="price" />

                                                                    </td>
                                                                    <td>
                                                                        {item.selling * item.qty}
                                                                    </td>
                                                                    <td>
                                                                        <b onClick={() => remove(item.id)} className="text-black">
                                                                            X
                                                               </b>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })

                                                    }
                                                    <tr>
                                                <td>...</td><td>...</td><td><b>Total:</b></td><td><b>{tot}</b></td>
                                                    </tr>
                                                </tbody>
                                            </table><br></br>
                                            <button onClick={() => { setCart([]) }} className="btn pink">Clear <i className="material-icons right">sync</i></button>
                                            <button onClick={() => { finishSale() }} className="btn purple">FINISH <i className="material-icons right">send</i></button>
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