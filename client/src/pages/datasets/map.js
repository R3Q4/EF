// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Data() {
  const [donationPoints, setDonationPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('d_7e1f0da76a744c85e3d3ecc76642dcb5');

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const datasetOptions = [
    {
      id: 'd_7e1f0da76a744c85e3d3ecc76642dcb5',
      label: 'Donation Points (Dataset A)',
    },
    {
      id: 'd_db40d004afeb5a7f0f555fdcc34934cc',
      label: 'E-Waste Recycling Points (Dataset B)',
    },
  ];

  const fetchData = async (filters = '', datasetId = selectedDataset) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters) params.append('filters', filters);
      if (datasetId) params.append('datasetId', datasetId);

      const response = await axios.get(`http://localhost:5000/map?${params.toString()}`);

      setDonationPoints(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('', selectedDataset);
  }, [selectedDataset]);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(inputValue.trim(), selectedDataset);
    }
  };

  const defaultPosition = [1.3521, 103.8198];

  const openModal = (point) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPoint(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Donation & Recycling Points</h1>

      <label htmlFor="dataset-select" className="block mb-2 font-semibold">
        Select Dataset:
      </label>
      <select
        id="dataset-select"
        value={selectedDataset}
        onChange={(e) => setSelectedDataset(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      >
        {datasetOptions.map((ds) => (
          <option key={ds.id} value={ds.id}>
            {ds.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by keyword and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={onKeyPress}
        className="w-full p-3 text-lg mb-6 border border-gray-300 rounded"
      />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && donationPoints.length === 0 && <p>No donation points found.</p>}

      <div className="h-96 mb-10 rounded overflow-hidden shadow-lg">
        <MapContainer center={defaultPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {donationPoints
            .filter((p) => p.location)
            .map((point, idx) => (
              <Marker key={idx} position={point.location}>
                <Popup>
                  <div className="space-y-2">
                    <strong>{point.name}</strong>
                    <div><em>{point.address}</em></div>
                    <div>{point.description}</div>
                    <button
                      onClick={() => openModal(point)}
                      className="mt-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      More Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

      </div>

      <h2 className="text-2xl font-semibold mb-4">All Locations</h2>
      <ul className="space-y-4">
        {donationPoints.map((point, idx) => (
          <li
            key={idx}
            className="p-4 border border-gray-300 rounded shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => openModal(point)}
          >
            <h3 className="text-xl font-bold">{point.name}</h3>
            <p className="mt-1">
              <strong>What you can donate:</strong> {point.description}
            </p>
            <p className="mt-1">
              <strong>Address:</strong> {point.address}
            </p>
            <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View More
            </button>
          </li>
        ))}
      </ul>

      {/* Modal Popup */}
      {showModal && selectedPoint && (
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
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedPoint.name}</h2>
            <p className="mb-2">
              <strong>Address:</strong> {selectedPoint.address}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {selectedPoint.description}
            </p>
            {selectedPoint.hyperlink && (
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={selectedPoint.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {selectedPoint.hyperlink}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Data;
