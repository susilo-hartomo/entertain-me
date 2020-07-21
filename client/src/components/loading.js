import React from 'react'
import './loading.css'
import loading from '../assets/loading.svg'

export const Loading = () => {
    return (
        <div style={{display: 'flex', flexDirection: "column", justifyContent: 'center'}}>
            <img className='loading-logo' src={loading} alt='loading-animation'/>
            <div>Loading . . . </div>
        </div>
    )
}
