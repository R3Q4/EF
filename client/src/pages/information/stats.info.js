import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
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
          <h2 className="text-xl font-semibold mb-4">
            Dataset {datasetIds[idx]}
          </h2>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: `Statistics for ${datasetIds[idx]}`
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

{/*import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
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

const DATASET_ID = 'd_72f8e05d45477a7af0c089ad970519da'

const Stats = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/homepage/stats', {
      params: { datasetId: DATASET_ID }
    })
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error fetching data')
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!data) return null

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds, idx) => ({
      label: ds.label,
      data: ds.data,
      borderColor: `hsl(${(idx * 100) % 360}, 70%, 50%)`,
      backgroundColor: `hsla(${(idx * 100) % 360}, 70%, 50%, 0.5)`,
      fill: false,
      tension: 0.3
    }))
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Waste Statistics Over Years' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <Line options={options} data={chartData} />
    </div>
  )
}

export default Stats


*/}
{/*
  import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
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
  'd_72f8e05d45477a7af0c089ad970519da',
  'd_daf568968ab40dc81e7b08887a83c8fa'
]

const fetchStats = async (id) => {
  const response = await axios.get('http://localhost:5000/homepage/stats', {
    params: { datasetId: id }
  })
  return response.data
}

const StatsCharts = () => {
  const [chartsData, setChartsData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const buildChartData = (data) => {
    // data = { labels: [...], datasets: [{label:..., data:[...]}] }
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

  if (loading) return <div className="p-4 text-center">Loading charts...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="p-4 space-y-10 max-w-4xl mx-auto">
      {chartsData.map((data, idx) => (
        <div key={datasetIds[idx]} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Dataset {datasetIds[idx]}
          </h2>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: `Statistics for ${datasetIds[idx]}`
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
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

  */}