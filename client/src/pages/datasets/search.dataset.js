import React from 'react'

export default function Search({ inputValue, setInputValue, onSearch}){
    return(
        <form
        onSubmit = {(e) => 
          {e.preventDefault()
          onSearch(inputValue.trim())}
        }
        className ='flex items-center bg-slate-100 rounded-2xl shadow-md mx-auto max-w-4xl p-2 mb-8'>

            <input className='p-2 flex-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                type='text'
                placeholder='Search for a keyword e.g. Donate'
                value = { inputValue }
                onChange = {(e) => setInputValue(e.target.value)}
            ></input>
        </form>

        
    )
}