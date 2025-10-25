import React, { useState, useEffect } from "react";

const datasetOptions = [
  {
    id: "d_7e1f0da76a744c85e3d3ecc76642dcb5",
    label: "Donation/Repair/Resale Locations",
  },
  {
    id: "d_db40d004afeb5a7f0f555fdcc34934cc",
    label: "Recycling Points",
  },
];

function App() {
  const [datasetId, setDatasetId] = useState(datasetOptions[0].id);
  const [address, setAddress] = useState("");
  const [filters, setFilters] = useState("");
  const [limit, setLimit] = useState(10);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (datasetId) params.append("datasetId", datasetId);
      if (filters) params.append("filters", filters);
      if (limit) params.append("limit", limit);
      if (address) params.append("address", address);

      const url = `http://localhost:5000/map/nearest?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [datasetId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLocations();
  };

  return (
    <div className="p-6 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Nearby Locations</h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-4 justify-center mb-6"
      >
        <select
          value={datasetId}
          onChange={(e) => setDatasetId(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
        >
          {datasetOptions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />

        <input
          type="text"
          placeholder="Filter keyword"
          value={filters}
          onChange={(e) => setFilters(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
        />

        <input
          type="number"
          min="1"
          placeholder="Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading locations...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-4">
        {locations.map((loc, idx) => (
          <li
            key={idx}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <strong className="text-lg">{loc.name}</strong> <br />
            {loc.address} <br />
            {loc.distance_km && <em>Distance: {loc.distance_km} km</em>} <br />
            {loc.website && (
              <a
                href={loc.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Website
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
