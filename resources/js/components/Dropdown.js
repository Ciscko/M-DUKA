import React, { createRef, useEffect } from 'react';
import M from 'materialize-css'
import { Link } from 'react-router-dom'

const Dropdown = ({dropdownItems}) => {
    const dropdownRef = createRef()
   
    useEffect(() => {
        M.Dropdown.init(dropdownRef.current)
    })
    return (
        <div>
            <a className='dropdown-trigger' ref={dropdownRef} href='#' data-target='dropdown1'>More</a>
            <ul id='dropdown1' className='dropdown-content'>
               {
                   dropdownItems.map((dropdownItem, index) => {
                       return (
                            <li key={index}><Link to={dropdownItem.link}>{dropdownItem.title}</Link></li>
                       )
                   })
               }
            </ul>
        </div>
    );
}
export default Dropdown;