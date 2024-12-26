// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // Create the context for Socket
// const SocketContext = createContext(null);

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the WebSocket server running on port 8000
//     const socketInstance = io('http://localhost:8000', {
//       transports: ['websocket', 'polling'], // Enable both transports (WebSocket and Polling)
//     });

//     socketInstance.on('connect_error', (error) => {
//       console.error("Socket connection error:", error);
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);


//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };
