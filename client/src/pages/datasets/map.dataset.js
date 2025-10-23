import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon } from 'leaflet'
import L from 'leaflet'

export default function Map ({ donationPoints, openModal }){
    const SGPOSITION = [1.3521, 103.8198]

    const markerIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [38, 38]
    })
    


    return(
        <div className='h-96 mb-5 relative z-10'>
            <MapContainer  center={[1.291, 103.82]} zoom ={15} style={{height: '100%', width:'100%'}}>
                <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                {donationPoints
                    .filter((p) => p.location)
                    .map((point, i)=>(
                        <Marker key= {i} position={point.location} icon={markerIcon}>
                            <Popup>
                                <button onClick={()=> openModal(point)} className=''><strong>{point.name}</strong></button>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>

        </div>


    )
}
