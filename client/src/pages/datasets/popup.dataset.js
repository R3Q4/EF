import React from 'react'

export default function Popup({ showModal, selectedPoint, closeModal}){
    if (!showModal || !selectedPoint) return null
    return(
            <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg max-w-xl w-11/12 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-3xl font-bold text-gray-700 hover:text-gray-900 transition"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{selectedPoint.name}</h2>

        {selectedPoint.type !=='' && 
        <div>
          <div className='mb-2'><strong>Category: </strong>{selectedPoint.type}</div>
          <div className='mb-2'><strong>Donatables: </strong>{selectedPoint.items}</div>
          </div>
        }
        
        <p className="mb-2">
          <strong>Address:</strong> {selectedPoint.address.toLowerCase().split(' ')
                            .map(add => {if (add.length === 0) return ''; return add[0].toUpperCase() + add.slice(1)})
                            .join(' ')}
        </p>

        <p className="mb-2">
          <strong>Description:</strong> {selectedPoint.description}
        </p>
        {selectedPoint.website!=='' && (
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={selectedPoint.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {selectedPoint.website}
            </a>
          </p>
        )}
      </div>
    </div>

    )
}