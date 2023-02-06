import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  const onChangeHandler = e => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className='App'>
      <input
        placeholder='Message...'
        onChange={onChangeHandler}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  );
}

export default App;
