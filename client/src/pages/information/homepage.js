import React, { useRef } from 'react'

import What from './what.info'
import How from './how.info'
import Why from './why.info'
import Stats from './stats.info'
import Article from './article.info'

const About = () => {
    const section = useRef(null)
    const section1 = useRef(null)
    const section2 = useRef(null)
    const section3 = useRef(null)
    const section4 = useRef(null)
    const section5 = useRef(null)


    const scrollTo = (sectionX) => {
        sectionX.current?.scrollIntoView({behavior: 'smooth'})
    }

    return(
        <div className=''>
            <div className='h-full w-full'>
                <div className='w-full font-extrabold shadow-lg text-[14px] grid grid-cols-5 '>

                        <button onClick={()=>scrollTo(section1)} className='px-6 py-4 border-white border bg-sky-200 shadow-md  hover:bg-sky-300'><p className='text-gray-700'>🌍 Why 3Rs？</p></button>
                        <button onClick={()=>scrollTo(section2)} className='px-6 py-4 border-white border bg-sky-200 shadow-md  hover:bg-sky-300'><p className='text-gray-700'>♻️ What To Recycle？</p></button>
                        <button onClick={()=>scrollTo(section3)} className='px-6 py-4 border-white border bg-sky-200 shadow-md   hover:bg-sky-300'><p className='text-gray-700'> 🛠️ How To Help?</p></button>
                        <button onClick={()=>scrollTo(section4)} className='px-6 py-4 border-white border bg-sky-200 shadow-md   hover:bg-sky-300'><p className='text-gray-700'>📈 Recycling Statistics</p></button>
                        <button onClick={()=>scrollTo(section5)} className='px-6 py-4 border-white border bg-sky-200 shadow-md   hover:bg-sky-300'><p className='text-gray-700'>🗞️ Articles</p></button>

                </div>

                <div className=''>


                    <div ref={ section1 }>
                        
                        <div className=''>         
                            <Why/>
                        </div>
                    </div>

                    <div ref={ section2 } 
                        className='bg-sky-100 p-2 rounded-lg'>
                            <div className='ml-8'>
                                <p className='font-bold text-green-800 text-3xl mt-20 underline'>♻️ What to Recycle</p>
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
                        className='bg-sky-100 p-2 rounded-lg'>
                        <p className='font-bold text-green-800  mt-20  text-3xl'>📈 Recycling Statistics</p>
                        <div className=''>         
                            <Stats/>
                        </div>
                    </div>

                    <div ref={ section5 } 
                        className='m-5'>
                        <p className='font-bold text-green-800  mt-20  text-3xl'>🗞️ Articles</p>
                        <div className=''>         
                            <Article/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default About