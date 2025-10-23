import React from 'react'
import Sidebar from "../../components/Sidebar"
import { Link } from 'react-router-dom'

const FeedbackEnquiry = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='h-full w-full'>
                <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Enquiry/Feedback</p>
                <div className='grid grid-col-2 '>
                    <div className = 'flex '>
                            <Link to ='/about' className='p-4 bg-sky-100 flex items-center space-x-3 px-1 py-2 rounded hover:bg-sky-200 transition'>
                                <i className='material-symbols-outlined'>book_2</i>
                                <button>Enquiry</button>
                            </Link>

                            <Link to ='/about' className='flex items-center space-x-3 px-1 py-2 rounded hover:bg-gray-200 transition'>
                                <i className='material-symbols-outlined'>feedback</i>
                                <button>Feedback</button>
                            </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FeedbackEnquiry