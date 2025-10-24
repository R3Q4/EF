import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ViewEnquiry = () =>{
    const navigate = useNavigate()
    const [response, setResponse] = useState([])
    useEffect(() =>{
    async function retrieve(){
        try{
            const response = await axios.get('http://localhost:5000/enquiry/retrieve',{headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            setResponse(response.data)
        } catch (err){
            console.log(err)
            }
        }
        retrieve()}, []
        )

    return(
        
    <div className='flex min-h-screen'>

        <Sidebar />
        <div className='w-full h-full'>
            <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Enquiry/Feedback</p>
            <div className ='mb-6 p-6'>
                {/* Navigate across pages */}
                <div className = 'grid grid-cols-2 mt-3 gap-4'>
                    <button onClick ={() => navigate('/enquiry') } className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>Submit Enquiry/Feedback</button>
                    <button className='bg-teal-600 text-white px-4 py-2 rounded font-bold gap-4 '>View Past Records</button>
                </div>
                {response.length === 0? (
                    <p className='font-bold text-center p-3 mt-5'>No Enquiries</p>
                ) : (
                    <div>
                        {response.map((e,i) => (
                            <div key ={e.id} className='bg-slate-500 p-6 rounded-xl mb-4 mt-4 text-white'>
                                <p className='font-extrabold text-xl mb-5 '>Enquiry ID: {i+1}</p>
                                {(e.status === 'Pending' || e.status ==='Completed') ? (<div className='font-bold'>Status: <p className='inline-block bg-sky-300 font-bold mb-3 text-gray-800 text-sm px-3 py-1 rounded-full'>{e.status}</p></div>)
                                :
                                (<p className='inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full'>{e.status}</p>)
                                }
                                <p className='mb-3'><strong className='font-bold text-gray-100'>Category: </strong>{e.category}</p>
                                <p className='mb-3'><strong className='font-bold text-gray-100'>Title: </strong>{e.subject}</p>
                                <p className='mb-3'><strong className='font-bold text-gray-100'>Message: </strong>{e.message}</p>
                                <p className='mb-3'><strong className='font-bold text-gray-100'>Response: </strong>{e.reply}</p>
                            </div>
                        ))}
                    </div>
                )}
                          

            </div>

        </div>

    </div>
    )
}

export default ViewEnquiry
{/*
    import { useEffect, useState } from 'react';
import axios from 'axios';

function UserEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const response = await axios.get('http://localhost:5000/enquiry/retrieve', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEnquiries(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEnquiries();
  }, []);

  return (
    <div>
      <h2>My Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        enquiries.map(enq => (
          <div key={enq.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p><strong>Category:</strong> {enq.category}</p>
            <p><strong>Subject:</strong> {enq.subject}</p>
            <p><strong>Message:</strong> {enq.message}</p>
            <p><strong>Status:</strong> {enq.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserEnquiries;

    */}