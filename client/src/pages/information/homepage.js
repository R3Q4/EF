import React, { useRef } from 'react'
import Navbar from "../../components/Navbar"

import What from './what.info'
import How from './how.info'
import Why from './why.info'
import Stats from './stats.info'

const About = () => {
    const section = useRef(null)
    const section1 = useRef(null)
    const section2 = useRef(null)
    const section3 = useRef(null)
    const section4 = useRef(null)


    const scrollTo = (sectionX) => {
        sectionX.current?.scrollIntoView({behavior: 'smooth'})
    }

    return(
        <div className='min-h-screen'>
            <Navbar />
            <div className='h-full w-full'>
                <div className='w-full font-extrabold shadow-lg text-[14px] grid grid-cols-4 '>

                        <button onClick={()=>scrollTo(section1)} className='px-6 py-4 border-white border bg-sky-200 shadow-md  hover:bg-sky-300'><p className='text-gray-700'>🌍 Why Recycle</p></button>
                        <button onClick={()=>scrollTo(section2)} className='px-6 py-4 border-white border bg-sky-200 shadow-md  hover:bg-sky-300'><p className='text-gray-700'>♻️ What To Recycle</p></button>
                        <button onClick={()=>scrollTo(section3)} className='px-6 py-4 border-white border bg-sky-200 shadow-md   hover:bg-sky-300'><p className='text-gray-700'> 🛠️ How To Recycle</p></button>
                        <button onClick={()=>scrollTo(section4)} className='px-6 py-4 border-white border bg-sky-200 shadow-md   hover:bg-sky-300'><p className='text-gray-700'>📈 Recycling Statistics</p></button>

                </div>

                <div className='m-8'>


                    <div ref={ section1 } 
                        className='mt-5'>
                        <p className='font-bold text-green-800 text-3xl'>🌍 Why Recycle</p>
                        <div className=''>         
                            <Why/>
                        </div>
                    </div>

                    <div ref={ section2 } 
                        className='mt-28 bg-sky-100 p-2 rounded-lg'>
                            <div className='ml-8'>
                                <p className='font-bold text-green-800 text-3xl mt-5 underline'>♻️ What to Recycle</p>
                                    <div className=''>         
                                        <What/>
                                    </div>
                                </div> 

                            </div>


                    <div ref={ section3 } 
                        className='mt-28'>
                        <p className='font-bold text-green-800 text-3xl'>🛠️ How to Recycle</p>
                        <div className=''>         
                            <How/>
                        </div>
                    </div>

                    <div ref={ section4 } 
                        className='mt-28'>
                        <p className='font-bold text-green-800 text-3xl'>📈 Recycling Statistics</p>
                        <div className=''>         
                            <Stats/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default About