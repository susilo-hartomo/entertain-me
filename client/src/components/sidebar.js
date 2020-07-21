import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <ul style={{color: '#fff', listStyle: 'none'}}>
                <li style={{marginBottom: 16}}>
                    {/* <i className></i> */}
                    <Link to='/movies' style={{color: '#fff'}}>Movies</Link>
                </li>
                <li style={{marginBottom: 16}}>
                    {/* <i className></i> */}
                    <Link to='/movies' style={{color: '#fff'}}>Tv Series</Link>
                </li>
                <li style={{marginBottom: 16}}>
                    {/* <i className></i> */}
                    <Link to='/favorites' style={{color: '#fff'}}>Favourite</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
