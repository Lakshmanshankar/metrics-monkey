import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:5000'); // Replace with your Node.js server URL

function App() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(msg);
      setMessages((prevMessages: any) => [...prevMessages, msg]);
    });

    socket.on('connect', () => {
      socket.emit('chat message', 'Hello From Client');
    });

    return () => {
      socket.off('chat message',(msg=>console.log(msg)));
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={message} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
