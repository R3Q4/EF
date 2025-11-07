import react from 'react'

export default function Location({ donationPoints, openModal }) {

    const helperFilter = (description) => {
        if (!description) return []

        let items = []

        const firstMatch = description.match(/E-waste accepted:\s*(.*)/i);
        if (firstMatch) {
            const ewasteItems = firstMatch[1]
                .replace(/ only/i, '')      
                .replace(/;.*$/i, '') 
                .trim()
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);
            items = items.concat(ewasteItems);
        }

        const secondMatch = description.match(/E\.g\.\s*(.*)/i);
        if (secondMatch) {
            const egItems = secondMatch[1]
                .replace(/;.*$/i, '')  
                .trim()
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);
            items = items.concat(egItems)
        }
        
        const thirdMatch = description.match(/All regulated consumer products.*?,\s*(.*)/i);
        if (thirdMatch) {
            const regulatedItems = thirdMatch[1]
            .replace(/https?:\/\/\S+/g, '') // remove URLs
            .replace(/^and\s+/i, '')        // remove leading 'and '
            .replace(/\.$/, '')             // remove trailing period
            .trim()
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
            items = items.concat(regulatedItems);
        }

        return items
    };

    return(
    <div className=''>
        <div className='grid grid-cols-2 gap-8 w-full mt-3 mb-3'>
            {donationPoints.map((point, i) => (
                <div key={i} className='p-4 border border-gray-300 rounded shadow cursor-pointer hover:shadow-lg transition' onClick ={() => openModal(point)}>
                    {point.type ==='Repair' && <img src='https://cdn-icons-png.flaticon.com/512/8119/8119699.png' className='w-20 h-20'></img>}
                    {point.type ==='Donate' && <img src='https://thvnext.bing.com/th/id/OIP.S82LyW_xoV8FvV4cc9Gm_wHaHa?o=7&cb=12rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' className='w-20 h-20'></img>}
                    {(point.type ==='Resell'|| point.website !=='') && <img src='https://tse1.mm.bing.net/th/id/OIP.VOqbZl6aHdttdmeXBnvjvgHaHO?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' className='w-20 h-20'></img>}

                    <p className='text-xl font-bold mb-4'>{point.name}</p>
                    {point.type!=='' && (
                        <div className='flex'>
                            <div><strong>Category: </strong> <span className='inline-block bg-sky-200 text-sm px-3 py-1 rounded-full '>{point.type}</span> </div>
                        </div>
                    )
                    }
                    <div className='mt-1'><strong>Donatable items:</strong> 
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {point.items !=='' ? 
                              
                            ( (point.items).split(',').map((item, idx) => (
                                <span key={idx} className='inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full'>{item.trim()}</span>
                            )))
                            :
                            (helperFilter(point.description).map((item, idx) => (
                                <span key={idx} className='inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full'>{item}</span>
                            )))
                            }
                        </div>

                    </div>
                    {/*Formatting to Camel Case */}
                    <p className='mt-1'><strong>Address:</strong> {point.address.toLowerCase().split(' ')
                            .map(add => {if (add.length === 0) return ''; return add[0].toUpperCase() + add.slice(1)})
                            .join(' ')}
                    </p>
                    {point.distance_km &&
                    <div>
                        <p className='mt-1'><strong>Distance: </strong>{point.distance_km} km</p>
                    </div>
                    }
                </div>
            ))}

        </div>

    </div>)
}