import React , { useState } from 'react'
import Sidebar from "../../components/Sidebar"
import ChatbotIcon from './chatbotIcons'

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    {role: 'model', text:'Hello! How can I help you?'}
  ])
  const [loading, setLoading] = useState(false)

  const connectBackend = async (history) =>{
//
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: history }),
      });
      const data = await res.json();
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== '...'),
        { role: 'model', text: data.reply }
      ]);
    } catch (e) {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== '...'),
        { role: 'model', text: 'Sorry, something went wrong.' }
      ]);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.message;
    const userText = input.value.trim();
    if (!userText) return;

    const updatedHistory = [...chatHistory, { role: 'user', text: userText }];
    setChatHistory([...updatedHistory, { role: 'model', text: '...' }]);
    input.value = '';


  connectBackend(updatedHistory)
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
        <div className='w-full h-screen flex flex-col'>
          <p className='w-full bg-teal-500 text-gray-100 font-extrabold px-8 py-6 shadow-md text-[24px]'>Chatbot</p>

          {/* Chatbot contents */}
          <div className='bg-slate-200 p-4 flex flex-col flex-grow ml-10 m-10'>
            <p className='text-3xl font-bold mb-6 text-center text-teal-600 mt-3'>Mr Eco</p>

            <div className='flex-grow bg-white p-4 rounded-lg shadow space-y-4 mb-4'>
            {chatHistory.map((response,i) =>{
                const isBot = response.role ==='model'
                return (
                    <div key={i} className={`flex items-start space-x-2 my-2 ${isBot ? '': 'justify-end'}`}>
                        {isBot && <ChatbotIcon role={response.role} />}
                        <div className = {`max-w-[70%] p-3 rounded-lg ${
                            isBot? 'bg-teal-200 text-teal-900 rounded-tl-none':
                            'bg-teal-600 text-white rounded-tr-none'
                        }`}>
                            <p className ='whitespace-pre-wrap'>{response.text}</p>
                        </div>
                            {!isBot && <ChatbotIcon role = { response.role }></ChatbotIcon>}
                    </div>
                )}
              )}

              {loading && <div className='text-center text-gray '>...</div>}
            </div>

            {/* Chatbot Input */}

              <form onSubmit = { handleSubmit } className = ' w-full flex space-x-2'>
                <input name='message' type='text' className='w-full px-4 py-2 border border-slate-300 ring-teal-500 focus:outline-none hover:ring-2 hover:ring-teal-500' placeholder="Enter your question e.g. What can be recycled"></input>
                <button className='rounded-full w-10 h-10  hover:bg-teal-300 material-symbols-outlined'>arrow_upward</button>
              </form>


          </div>
        </div>

    </div>
  );
};

export default Chatbot;
