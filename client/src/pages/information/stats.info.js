import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,Title, Tooltip, Legend} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const datasetIds = [
  'd_72f8e05d45477a7af0c089ad970519da', // Total Waste
  'd_daf568968ab40dc81e7b08887a83c8fa'  // Materials Usage
]
const categories = ['Plastic','Glass', 'Paper/Cardboard', 'Plastic', 'Textile/Leather']

const fetchStats = async (id) => {
  const response = await axios.get('http://localhost:5000/homepage/stats', {
    params: { datasetId: id }
  })
  return response.data
}

const buildChartData = (data) => {
  return {
    labels: data.labels,
    datasets: data.datasets.map((ds, i) => ({
      label: ds.label,
      data: ds.data,
      borderColor: `hsl(${(i * 100) % 360}, 70%, 50%)`,
      backgroundColor: `hsla(${(i * 100) % 360}, 70%, 50%, 0.5)`,
      fill: false,
      tension: 0.3
    }))
  }
}

const StatsCharts = () => {
  const [chartsData, setChartsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const results = await Promise.all(datasetIds.map(fetchStats))
        setChartsData(results)
      } catch (err) {
        setError('Error fetching data: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-4 text-center">Loading charts...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="p-4 space-y-10 max-w-4xl mx-auto">
      {chartsData.map((data, idx) => (
        <div key={datasetIds[idx]} className="border p-4 rounded shadow">
          
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
            data={buildChartData(data)}
          />
        </div>
      ))}
    </div>
  )
}

export default StatsCharts