import React from 'react'
//keep up with latest updates VS recycling
const Article= () =>{
    return(
        <div className='mb-20'>
            <div className='grid grid-cols-2 gap-6 m-10'>
                <a
                    href='https://www.channelnewsasia.com/watch/singapore-green-plan-2030-highlights-from-parliament'
                    target = "_blank"
                    className = 'block mt-5 cursor-pointer'
                >
                    <div className = 'relative rounded-lg overflow-hidden h-64 shadow-lg'>
                        <img
                            src='https://thvnext.bing.com/th/id/OIP.nKJrtFFQlmHobqCHbe_1awHaCx?o=7&cb=12rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
                            className = 'w-full h-64 object-cover'
                        ></img>

                        <div className = 'absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end h-full p-6'>
                            <p className = 'text-white text-2xl font-semibold'>Singapore Green Plan 2030: Highlights from Parliament</p>
                            <p className = 'text-gray-200 mt-2 text-sm'>Find out what are Singapore's highlights for Singapore Green Plan </p>
                        </div>


                    </div>
                </a>

                <a
                    href='https://www.channelnewsasia.com/singapore/semakau-landfill-filling-waste-management-incineration-reduce-reuse-recycle-3909436'
                    target = "_blank"
                    className = 'block mt-5 cursor-pointer'
                >
                    <div className = 'relative rounded-lg overflow-hidden h-64 shadow-lg'>
                        <img
                            src='https://www.parliament.gov.sg/images/default-source/Events-Library/opening-3.jpg?sfvrsn=0'
                            className = 'w-full h-64 object-cover'
                        ></img>

                        <div className = 'absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end h-full p-6'>
                            <p className = 'text-white text-2xl font-semibold'>Environmental experts sound the alarm on how fast Singapore’s only landfill Semakau is filling up</p>
                            <p className = 'text-gray-200 mt-2 text-sm'>Find out why Semakau is expected to reach capacity by 2035</p>
                        </div>


                    </div>
                </a>

                <a
                    href='https://www.straitstimes.com/singapore/spore-sets-out-plan-to-meet-2030-climate-targets-energy-imports-carbon-capture-among-key-efforts'
                    target = "_blank"
                    className = 'block mt-5 cursor-pointer'
                >
                    <div className = 'relative rounded-lg overflow-hidden h-64 shadow-lg'>
                        <img
                            src='https://cassette.sphdigital.com.sg/image/straitstimes/5816bfbd3c5c3632ead7b275ddc809ce3c0baad3bffc9a53c6027d5b901738bb?w=900'
                            className = 'w-full h-64 object-cover'
                        ></img>

                        <div className = 'absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end h-full p-6'>
                            <p className = 'text-white text-2xl font-semibold'>S’pore sets out plan to meet 2030 climate targets; energy imports, carbon capture among key efforts</p>
                            <p className = 'text-gray-200 mt-2 text-sm'>Find out about Singapore's new targets</p>
                        </div>


                    </div>
                </a>

            </div>
        </div>

    )
}
export default Article

