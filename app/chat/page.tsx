'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const ChatApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sender, setSender] = useState('user1'); // Static sender (user1)
  const [receiver, setReceiver] = useState('user2'); // Receiver from the input
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Connect to the server
  useEffect(() => {
    socket = io('http://localhost:5001', {
      transports: ['websocket'],
    });

    // Handle connection event
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
      // Emit register event when the connection is established
      socket.emit('register', sender);

      // Request for all previous messages
      socket.emit('getMessages', { sender, receiver });
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    // Listen for incoming messages from other users
    socket.on('message', data => {
      const { sender, content } = data;
      setMessages(prevMessages => [
        ...prevMessages,
        { sender, content, type: sender === sender ? 'sent' : 'received' },
      ]);
    });

    // Listen for all messages between sender and receiver
    socket.on('allMessages', messages => {
      setMessages(
        messages.map(msg => ({
          sender: msg.sender_user_name, // Use sender_user_name
          receiver: msg.receiver_user_name, // Use receiver_user_name
          content: msg.content,
          type: msg.sender_user_name === sender ? 'sent' : 'received', // Determine message type based on sender_user_name
        }))
      );
      console.log('Received all messages:', messages);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [sender, receiver]);

  // Send message to the server
  const handleSendMessage = () => {
    if (receiver && message.trim()) {
      socket.emit('sendMessage', {
        sender,
        receiver,
        content: message,
      });
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Socket Connection Status: {isConnected ? 'Connected' : 'Not Connected'}</h2>
      <h3>
        Chat between {sender} and {receiver}
      </h3>

      <div>
        <div>
          <input
            type="text"
            value={sender}
            onChange={e => setSender(e.target.value)}
            placeholder="Sender's username"
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              marginRight: '10px',
              color: 'black',
            }}
          />
          <input
            type="text"
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
            placeholder="Receiver's username"
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              marginRight: '10px',
              color: 'black',
            }}
          />
        </div>
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '8px',
              marginRight: '10px',
              flex: 1,
              color: 'black',
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Send
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Messages:</h4>
        <div
          style={{
            height: '500px',
            overflowY: 'auto',
            padding: '10px',
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <p
                style={{
                  color: 'black',
                  backgroundColor: msg.type === 'sent' ? '#DCF8C6' : '#E9E9E9',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  margin: 0,
                  textAlign: 'left', // Ensures the text aligns within the bubble
                }}
              >
                <strong>{msg.sender}: </strong>
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
