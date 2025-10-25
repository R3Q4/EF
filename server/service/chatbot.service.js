const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = 'AIzaSyBhKmjcgqXI8vGwv0hVYVbR69plFjoKq7o'


class ChatbotService {
  async retrieve(chatHistory) {
    try {
        // Format messages for Gemini API
        const formattedMessages = chatHistory.map(({ role, text }) => ({
          role,
          parts: [{ text }],
        }));

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY,
          },
          body: JSON.stringify({ contents: formattedMessages }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gemini API error: ${errorText}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];

        let botText = '';

        if (candidate?.content?.parts?.[0]?.text) {
          botText = candidate.content.parts[0].text;
        } else if (candidate?.content?.text) {
          botText = candidate.content.text;
        } else {
          botText = "Sorry, I couldn't understand the response.";
        }

        botText = botText.replace(/\*\*(.*?)\*\*/g, '$1'); // remove markdown bold

        return { reply: botText };
      }
      catch (err) {
        throw (err)
      }
    } 
}

export default new ChatbotService();
