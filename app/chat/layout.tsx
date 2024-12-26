/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { SocketProvider } from './SocketContext';

const Layout = ({ children }:any) => {
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
