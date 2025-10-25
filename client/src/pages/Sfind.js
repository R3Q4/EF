import React from 'react'
import Sidebar from "../components/Sidebar"
import Data from './datasets/data'
import { Link } from 'react-router-dom';


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