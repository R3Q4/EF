import React from 'react'
import { Link } from 'react-router-dom';
{/*import logo from '../assets/EcoFind_logo.png'*/}


const Navbar = () =>{
    
    return(
        <div className=' shadow-md flex justify-between items-center p-4 bg-teal-500'>
            <div className='flex space-x-4 align-center justify-center'>
                {/*<img src={logo} className= 'w-10 h-10 object-contain'></img>*/}
                <h2 className = 'text-left text-[20px] font-bold text-white text-[26px]'>EcoFind</h2>
            </div>

            <div className='max-w-5xl text-white'>
                <ul className = 'flex space-x-12 items-center justify-center mr-5'>
                    <li >
                        <Link to ='/home' className='flex items-center space-x-3 p-2 rounded hover:bg-gray-500 transition'>                            
                        <i className='material-symbols-outlined'>home</i>
                        <button className='font-semibold '>Home</button>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to ='/find' className='flex items-center space-x-3 p-2 rounded hover:bg-gray-500 transition'>                            
                            <i className='material-symbols-outlined '>book_2</i>
                            <button className='font-semibold '>Find</button>
                        </Link>    
                    </li>

                    <li>
                        <Link to ='/signup' className='flex items-center space-x-3 p-2 rounded hover:bg-gray-500 transition'>                            
                        <i className='material-symbols-outlined '>account_box</i>
                        <button className='font-semibold '>Sign Up</button>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to ='/signin' className='flex items-center space-x-3 p-2 rounded hover:bg-gray-500 transition'>                            

                            <i className='material-symbols-outlined '>login</i>
                            <button className='font-semibold '>Login</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>        
    )
}

export default Navbar;