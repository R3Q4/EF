
import React from 'react'

const Why = () => {
    return(
        <div className='min-h-screen relative text-white '>                
            <img
                src = {`https://plus.unsplash.com/premium_photo-1664298311043-46b3814a511f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1183`}
                className = 'opacity-60 inset-0 absolute w-full h-full '/>
            <div>

            <div className='absolute inset-0 bg-black bg-opacity-40'></div>

            <div className ='relative flex flex-col items-center justify-center text-center py-10'>
                <p className = 'text-5xl font-extrabold mb-6 drop-shadow-lg'>🌍 Why 3Rs?</p>
                <p className='max-w-3xl text-xl text-gray-200 drop-shadow-sm'>In Singapore, more than <strong>6.7 million</strong> tonnes of waste are generated each year. In 2024, recycling rates fell to a decade low at <strong>50%</strong>. This means more waste is being incinerated or is being sent to Pulau Semakau, which is predicted to run out of space by 2035. 
                <br/><br/>
                To build a more sustainable future, everyone has a part to play in committing to the <strong>3Rs: Reduce, Reuse, Recycle </strong>
                </p>

                <ul className = 'mt-8 text-left text-xl max-w-xl text-gray-100 space-y-2'>
                    <li><span className = 'font-semibold text-blue-300'>🌱 Reduce:</span> : not creating wastage from the very start e.g. avoid single use items</li>
                    <li><span className = 'font-semibold text-blue-300'>🔄 Reuse:</span> repurposing items instead of throwing </li>
                    <li><span className = 'font-semibold text-blue-300'>♻️ Recycle:</span> turning old materials into new products to save energy and materials from manufacturing</li>                    
                </ul>
                
                
            </div>


=            </div>
        </div>
    )
}
export default Why