import React from 'react'

const ChatbotIcon = ( { role }) => {
    const isBot = role === 'model'
    const icon = isBot ? 'smart_toy' : 'person'

    // display user/chatbot icon based on the message 
    return(
        <div className = {`w-10 h-10 rounded-full flex justify-center items-center text-white ${isBot ? 'bg-cyan-600' : 'bg-teal-600'}`}>
            <span className = 'material-symbols-outlined'>{icon}</span>

        </div>
    )


}
export default ChatbotIcon