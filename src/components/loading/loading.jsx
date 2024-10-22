import React from 'react';
import "./index.css"
export const Loading = () => {
    console.log("Loading")
    return (
        <div className="loading-overlay">
           <div className='loading-text'>Loading</div>
        </div>
    )
}