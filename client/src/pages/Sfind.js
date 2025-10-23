import React from 'react'
import Sidebar from "../components/Sidebar"
import Data from './datasets/data'
const Find = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-grow'>
                <Data/>
            </div>

        </div>
    )
}
export default Find