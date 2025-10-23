import React from 'react'

export default function Choose ({ selectedDataset, setSelectedDataset, datasetOptions}){
    return(
        <div className ='mb-6'>
            <div className = 'grid grid-cols-2 w-full mt-3'>
                {datasetOptions.map((i) => (
                    <button key = {i.id} onClick = {() => setSelectedDataset(i.id)} className = {`px-4 py-2 rounded font-bold ${selectedDataset=== i.id? 'bg-teal-600 text-white': 'bg-gray-200 hover:bg-gray-300'}`}>
                        {i.label}
                    </button>
                ))}
            </div>
            
        </div>
    )
}
