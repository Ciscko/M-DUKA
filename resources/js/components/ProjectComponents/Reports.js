import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService, { getToken } from '../../authService';
import Preloader from '../Preloader';
import PaginatedTable from './PaginatedTable';

const Reports = (props) => {
    const tabRef = createRef()
    const [queryMode, setQueryMode] = useState(false)
    const [mode, setMode] = useState('single')
    const [day, setDay] = useState('')
    const [range, setRange] = useState({ start: '', end: '' })
    const [queryData, setQueryData] = useState([])
    const [currentSale, setSale] = useState({})

    useEffect(() => {
        M.Tabs.init(tabRef.current)
    }, [])

    const querySales = () => {
        
        if (mode === 'range') {

            if (range.start !== ''  && range.end !== '') {
                setQueryMode(true)
            let mode = 'range'
            let url = `${authService.otherUrl}sales/report/${mode}`
            Axios.post(url, {
                start: range.start, end: range.end
            }, { headers: { Authorization: `Bearer ${getToken()}` } })
                .then(res => {
                    setQueryData(res.data.data)
                }).catch(err => console.log(err))
            }
        } else {
            if (day !== '') {
                setQueryMode(true)
                let mode = 'single'
                let url = `${authService.otherUrl}sales/report/${mode}`
                Axios.post(url, {
                    day: day
                }, { headers: { Authorization: `Bearer ${getToken()}` } })
                    .then(res => {
                        setQueryData(res.data.data)
                    }).catch(err => console.log(err))
            }
        }
    }
    const pageColumns = [
        { key: 'id', value: 'Sale ID' }, { key: 'time', value: 'Sale Time' }, { key: 'user', value: 'User ID' }
    ]
    const viewSale = (sale) => {
        setSale(sale)
        let tabInst = M.Tabs.getInstance(tabRef.current)
        tabInst.select('view')
    }

    return (
        <div>
            <div>
                <div className="card main-card">
                    <div className="container center">
                        <h4 className="center">Reports</h4><hr></hr>
                        <ul className="tabs tabs-fixed-width tab-demo z-depth-1" ref={tabRef}>
                            <li className="tab"><a className="active" href="#main"><i className="material-icons">list</i></a></li>
                            <li className="tab"><a href="#view">View </a></li>
                        </ul>
                        <div id="main" className="col s12">
                            <br></br>
                            <div className="">
                                <div className="row">
                                    <div className="col l3 m3 s12" style={{ 'borderRight': '3px solid pink' }}>
                                        <label>
                                            <input onChange={(e) => setMode(e.target.value)} checked={mode === 'range' ? true : false} name="mode" type="radio" value='range' />
                                            <span>Range Queries</span>
                                        </label><br></br><br></br>
                                        <label>
                                            <input onChange={(e) => setMode(e.target.value)} checked={mode === 'single' ? true : false} name="mode" type="radio" value='single' />
                                            <span> Single Queries </span>
                                        </label>
                                    </div>
                                    <div className="col l9 m9 s12">
                                        {
                                            mode === 'range' ?
                                                <div className="row">
                                                    <div className="col s12 l4 m4">
                                                        <label htmlFor="start">Start Date</label>
                                                        <input type="date" id="start" onChange={(e) => setRange({ ...range, start: e.target.value })} name="start" />
                                                    </div>
                                                    <div className="col s12 l4 m4">
                                                        <label htmlFor="end">End Date</label>
                                                        <input type="date" id="end" onChange={(e) => setRange({ ...range, end: e.target.value })} name="end" />
                                                    </div>
                                                    <div className="col s12 l4 m4">
                                                        <br></br>
                                                        <button onClick={() => querySales()} className="btn waves-effect btn pink">
                                                            Query<i className="material-icons right">assignment</i>
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                <div className="row">

                                                    <div className="col s12 l4 m4 offset-l2 offset-m2">
                                                        <label htmlFor="day"> Date</label>
                                                        <input type="date" id="day" onChange={(e) => setDay(e.target.value)} name="day" />
                                                    </div>
                                                    <div className="col s12 l4 m4">
                                                        <br></br>
                                                        <button onClick={() => querySales()} className="btn waves-effect btn pink">
                                                            Query<i className="material-icons right">assignment</i>
                                                        </button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <hr></hr>

                            </div>
                            {
                                queryMode ?
                                    <div>
                                        {
                                            queryData.length > 0 ?
                                                <PaginatedTable data={queryData} columns={pageColumns} viewSale={viewSale} />
                                                :
                                                <Preloader message="No sales available for that query..." />
                                        }

                                    </div>
                                    :
                                    <div className="card center section">
                                        <b>No queries yet!</b>
                                    </div>
                            }
                        </div>
                        <div id="view" className="col s12">
                            <br></br>
                            {
                                currentSale.id ?
                                    <div className="row">
                                        <div className="col s12 l3 m3">
                                            <ul className="collection with-header">
                                                <li className="collection-header"><h4><b>Sale ID : </b>{currentSale.id}</h4></li>
                                                <li className="collection-item"><b>Sale Time : </b>{currentSale.time}</li>
                                                <li className="collection-item"><b>System User ID : </b>{currentSale.user}</li>
                                            </ul>
                                        </div>
                                        <div className="col s12 l9 m9">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>B-Price</th>
                                                        <th>Quantity</th>
                                                        <th>S-Price</th>
                                                        <th>Sub</th>
                                                        <th>Profit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentSale.sale_products.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {item.product_name}
                                                                    </td>
                                                                    <td>
                                                                        {item.bprice}
                                                                    </td>
                                                                    <td>
                                                                        {item.qty}
                                                                    </td>
                                                                    <td>
                                                                        {item.sprice}
                                                                    </td>
                                                                    <td>
                                                                        {item.sprice * item.qty}
                                                                    </td>
                                                                    <td>
                                                                        {(item.sprice * item.qty) - (item.bprice * item.qty)}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    :
                                    <Preloader message="No Sale selected." />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reports;