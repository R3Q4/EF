import React from 'react'
import Navbar from "../components/Navbar"
import Data from './datasets/data'
const Find = () => {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div>
                <Data/>
            </div>

        </div>
    )
}
export default Find