
import React from 'react'

const How = () => {
    return(
        <div className='min-h-screen'>
          <div className='flex flex-col justify-center items-center '>
            <img src = 'https://www.cgs.gov.sg/images/Recycle%20Right/recycling_corner_v2.png'></img>
            <img className='mt-10' src = 'https://www.cgs.gov.sg/images/Recycle%20Right/check_tmb_esize_600_.png'></img>
          </div>


            <div>
                
<div className="min-h-screen relative text-white bg-gray-900 px-6 py-16 max-w-4xl mx-auto rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold mb-6">♻️ The 3Rs: Reduce, Reuse, Recycle</h2>
  
  <ol className="list-decimal list-inside space-y-4">
    <li>
      <strong>Reduce:</strong> Think about whether you need the item or consider buying secondhand.
    </li>

    <li>
      <strong>Reuse:</strong> Give objects a second life by:
      <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-300">
        <li>Repairing items</li>
        <li>Donating to charity</li>
        <li>Giving to friends or family</li>
      </ul>
    </li>

    <li>
      <strong>Recycle:</strong>
      <ol className="list-decimal list-inside ml-6 mt-2 space-y-2 text-gray-300">
        <li>Wash your items: Ensure they are rinsed and free of contamination.</li>
        <li>Recycle in allocation recycling bins — blue bins for recyclables, e-waste bins, and shoe collection points./ recycling dates</li>
        <li>Use designated shops for recollection, retailer “1-for-1” take-back schemes.</li>
        <li>Utilize bulky removal services, collection drives, or doorstep collection programs.</li>
      </ol>
    </li>
  </ol>

  <div className="mt-8 p-4 bg-red-800 rounded-lg">
    <strong>Important:</strong>
    <p>🧼 Clean & dry: Rinse containers like bottles, cans, and jars to remove food residue.
📂 Sort by type: Separate paper, plastics, metals, and glass according to local guidelines.
🚫 No plastic bags: Don’t put recyclables inside plastic bags; use bins or recycling bags if required.
❌ Avoid contamination: Don’t recycle greasy pizza boxes, used tissues, or food scraps. </p>
    <p className="mt-2">
      DO NOT dispose of flammable or hazardous materials into blue recycling bins, including:
    </p>
    <ul className="list-disc list-inside mt-2 ml-6 text-gray-200">
      <li>Hot ashes and lit cigarettes</li>
      <li>Batteries</li>
      <li>Electrical and electronic equipment (use e-waste bins)</li>
      <li>Unemptied spray/aerosol cans and any other smouldering materials</li>
    </ul>
  </div>
</div>





            </div>
        </div>
    )
}
export default How