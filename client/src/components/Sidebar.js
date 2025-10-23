import React from 'react';
import { Link } from 'react-router-dom';
{/*import logo from '../assets/EcoFind_logo.png'*/}

const Sidebar = () => {
  return (
    <div className='flex min-h-screen'>
        <div className='flex flex-col bg-teal-800 text-white w-16 sm:w-60 p-4 min-h-screen'>
            <div>
                <div className = 'flex align-center space-x-4 mb-12 mt-4'>
{/*                    <img src={logo} className= 'w-10 h-10 object-contain'></img>*/}
                    <h2 className= 'sm:block text-[24px] font-bold '>EcoFind</h2>

                </div>
                <ul className = 'flex flex-col space-y-2'>
                    <li >                            
                        <Link to ='/Sfind' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>home</i>
                            <button>Home</button>
                        </Link>
                    </li>

                    <li>                            
                        <Link to ='/about' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>book_2</i>
                            <button>About</button>
                        </Link>
                    </li>

                    <li>                            
                        <Link to ='/about' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>share</i>
                            <button>Share</button>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to ='/ranking' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>trophy</i>
                            <button>Ranking</button>
                        </Link>    
                    </li>

                    <li >
                        <Link to ='/chatbot' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>smart_toy</i>
                            <button>Chatbot</button>
                        </Link>
                    </li>
                    
                    <li >
                        <Link to ='/enquiry' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>feedback</i>
                            <button>Feedback/Enquiry</button>
                        </Link>
                        
                    </li>
                    
                    <li >                        
                        <Link to ='/profile' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>account_circle</i>
                            <button>Account</button>
                        </Link>
                    </li>
                    
                    <li >
                        <Link to='/' className='flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-700 transition'>
                            <i className='material-symbols-outlined'>logout</i>
                            <span>Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
export default Sidebar
