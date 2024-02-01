import React from 'react'
import './pageNotFound.css'

const PageNotFound = () => {
    return (
        <div className="container error-container">
            <h1 className="error-title">Oops! Page Not Found</h1>
            <p className="error-message">The page you are looking for might be in another universe.</p>
            <p className="error-message">Return to <a href="/">home</a>.</p>
        </div>

    )
}

export default PageNotFound