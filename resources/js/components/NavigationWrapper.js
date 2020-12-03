
import React from 'react';
import Navigation from './ProjectComponents/Navigation';
import Dropdown from './Dropdown';
import authService from '../authService';

const NavigationWrapper = ({children}) => {

    const navbarContent = {
        logo: `${authService.staticUrl}images/office.jpg`,
        items: [
            { link: '/ui', title: 'Shop' },
        ]
    }
    const dropdownItems = [
        // { link: '/admin', title: 'Dashboard' },
        { link: '/ui/register', title: 'Register' },
    
    ]
    const navbarOptions = {
        edge: 'left'
    }
    return (
    <>
    <Navigation content={navbarContent} options={navbarOptions} navclass="purple">
        <Dropdown dropdownItems={dropdownItems} />
    </Navigation>
        <div>
        {
            children
        }
        </div>
    </>
    );
}
export default NavigationWrapper;