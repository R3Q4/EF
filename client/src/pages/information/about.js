import React from 'react'
import Homepage from './homepage'
import Sidebar from "../../components/Sidebar"

const About = () => {
    return(
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-grow'> 
                <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>About</p>

                <Homepage />

            </div>
        </div>
    )
}
export default About