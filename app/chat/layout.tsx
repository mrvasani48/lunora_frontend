import React from 'react';
// import { SocketProvider } from './SocketContext';

const Layout = ({ children }) => {
  console.log('layout worked');
  return (
    // <SocketProvider>
      <div>
        <header>
          <h1>Chat Application</h1>
        </header>
        <main>{children}</main>
      </div>
    // </SocketProvider>
  );
};

export default Layout;
