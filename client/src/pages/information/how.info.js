
import React from 'react'

const How = () => {
    return(
      <div className='min-h-screen'>
          <div className='flex flex-col justify-center items-center '>
            <img src = 'https://www.cgs.gov.sg/images/Recycle%20Right/recycling_corner_v2.png'></img>
            <img className='mt-10' src = 'https://www.cgs.gov.sg/images/Recycle%20Right/check_tmb_esize_600_.png'></img>
          </div>

          {/*Infographic */}
          <div className='min-h-screen text-white bg-slate-900 px-6 py-16 max-w-4xl mx-auto rounded-lg shadow-lg mb-3'>
            <h1 className='text-center font-bold text-4xl'> ♻️ 3Rs: Reuse Reduce Recycle </h1>
            <div>
              
              <p className='text-xl text-center mt-3 mb-3'>Simple Steps you can take in your everyday life to make a difference</p>

              <div className='text-[16px] space-y-3'>
                <p className='font-extrabold text-3xl mt-2 mb-3'>1. Reuse</p>
                <p>Think carefully whether you need an item before purchasing. Give your old objects a second life by:</p>
                <ul className='list-disc list-inside ml-6 mt-2 space-y-1'>
                  <li>Purchasing items from second hand shops</li>
                  <li>Repairing old items instead of replacing with new ones each time</li>
                  <li>Donating to Charity / family and friends</li>
                  <li>Reselling if items are in good conditions</li>
                </ul>

              </div>

              <p className='font-extrabold text-3xl mt-2 mb-3'>2. Reduce</p>
                <ul className='list-disc list-inside ml-6 mt-2 space-y-1'>
                  <li><strong>Decline</strong> disposable bags and single use items</li>
                  <li>Bring your own reusable bag, bottle, container when going out </li>
                </ul>

              <p className='font-extrabold text-3xl mt-2 mb-3'>3. Recycle</p>
                <ul className='list-disc list-inside ml-6 mt-2 space-y-1'>
                  <li>Check if your item can be recycled</li>
                  <li>Set up a recycling corner in your house</li>
                  <li>Drop off Electronic waste at designated collection points</li>
                  <li>Use desginated shops for recollection e.g. retailers "1-for-1 take-back schemes"</li>
                </ul>

              <div className='mt-8 p-4 bg-red-800 rounded-lg'>
                <p className='font-extrabold mb-4 text-3xl'>NOTE:</p>
                <p>🧼 Clean and dry containers that you are going to recycle e.g. bottle, cans, jars</p>

                <p>📂 Separate different recyclable materials e.g. paper, plastic, metal by type</p>
                <p>🚫 Do not put non recyclables such as plastic bags into these bins</p>
                <p>❌Avoid containmantion: Do not put used issues, food scrapes into recycling bins</p>
                <div className='mt-2'>
                  <p>Do not dispose flammable or hazardous materials in the blue bings</p>
                  <ul className='list-disc list-inside mt-2 ml-6'>
                    <li>Hot ashes and cigarettes</li>
                    <li>Batteries</li>
                    <li>Electronic and electrical equipment</li>

                  </ul>

                </div>


              </div>
            </div>
          </div>
      </div>
    )
}
export default How