import React, { createRef, useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { AppContext } from '../Main';
import authService from '../../authService';

const Navigation = ( { history, content, options, navclass, children }) => {
    const sidenavRef = createRef()
    const [ myStyle, setStyle ] = useState({})
    const {loggedIn, setLoggedIn } =  useContext(AppContext)
    useEffect(() => {
        M.Sidenav.init(sidenavRef.current, options)
    }, [])
    const logout = () => {
        localStorage.clear()
        authService.authenticate((arg) => {
            setLoggedIn(arg)
        })
        history.push('/ui')
    }
    const styleUp = () => {
        setStyle({
            'fontColor' : 'black', 'backgroundColor' : 'white'
        })
    }
    return (
        loggedIn ? 
        <>
            <div className="navbar-fixed" style={{ 'marginBottom': '2px' }}>
                <nav className={navclass}>
                    <div className="nav-wrapper">
                        <Link to="/ui" style={{'paddingLeft': '5px'}} className="brand-logo">
                             <img className="responsive-img" style={{'maxHeight':'70px', 'maxWidth':'400px'}} src={`${authService.staticUrl}images/shop.jpg`} /></Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        
                        <ul id="nav-mobile" className="right ">
                            {
                                content.items.map((item, index) => {
                                    return <li key={index}><Link to={item.link}>{item.title}</Link></li>
                                })
                            }
                            <li>
                                { children }
                            </li>
                            <li>
                                <a className="orange-text" onClick= {() => logout()}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ul className="sidenav grey darken-3" ref={sidenavRef} id="mobile-demo">
                <li className="">
                    <img className="responsive-img" style={{ 'maxHeight': '230px', 'padding': '0px' }} alt="Logo" src={`${authService.staticUrl}images/shop.jpg`} />
                </li>
                {
                    content.items.map((item, index) => {
                        return (
                            <li key={index}><Link className="white-text" to={item.link}>{item.title}</Link></li>
                        )
                    })
                }
                <li>
                    <a className="red-text" onClick= {() => logout()}>Logout</a>
                </li>
                <li className=""></li>
            </ul>
        </>
        :

        <>
        <div className="navbar-fixed" style={{ 'marginBottom': '2px' }}>
            <nav className={navclass}>
                <div className="nav-wrapper">
                    <Link to="/admin" style={{'paddingLeft': '5px'}} className="brand-logo"><h5>React Mat</h5></Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    
                    <ul id="nav-mobile" className="right ">
                        {
                            content.items.map((item, index) => {
                                return <li key={index}><Link to={item.link}>{item.title}</Link></li>
                            })
                        }
                        <li>
                            { children }
                        </li>
                        <li>
                            ...
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul className="sidenav grey darken-3" ref={sidenavRef} id="mobile-demo">
            <li className="">
                <img className="responsive-img" style={{ 'maxHeight': '230px', 'padding': '0px' }} alt="Logo" src={content.logo} />
            </li>
            {
                content.items.map((item, index) => {
                    return (
                        <li key={index}><Link className="white-text" to={item.link}>{item.title}</Link></li>
                    )
                })
            }
          
            <li className=""></li>
        </ul>
    </>
    );
}

export default withRouter(Navigation)
