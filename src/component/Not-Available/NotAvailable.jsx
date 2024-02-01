import React from 'react'
import './notAvailable.css'
import { Link } from 'react-router-dom'

const NotAvailable = ({ message }) => {
    return (
        <div className="container" style={{ marginTop: '50px', textAlign: 'center' }}>
            <div className="error-message">
                <p>{message}</p>
            </div>
            <div className="home-link">
                <p><Link to="/">Go back to the home page</Link></p>
            </div>
        </div>
    )
}

export default NotAvailable