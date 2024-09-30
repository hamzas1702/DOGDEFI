import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navabr from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle, pageSubTitle }) => {
  return (
    <>
    <div className="hidden lg:flex h-full w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col bg-gray-900 w-full">
        {/* Page header */}
        <Header title={pageTitle} subtitle={pageSubTitle}/>

        {/* Main content */}
        <div className="py-4 px-8 flex-grow">{children}</div>
      </div>
    </div>
    <div className="flex flex-col lg:hidden min-h-screen bg-gray-900 w-full">
        <Navabr/>
        <Header title={pageTitle} subtitle={pageSubTitle}/>
        <div className='w-full h-full px-6'>
          {children}
        </div>
    </div>
    </>
  );
};

export default Layout;
