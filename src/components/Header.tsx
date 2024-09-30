import React from 'react';
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="header font-Montserrat bg-dark text-white px-8 py-2 flex justify-between items-center pt-4 mb-10">
      <div className='hidden md:flex flex-col gap-1'>
        <h1 className='text-[32px]'>{title}</h1>
        <h1 className='text-[14px] text-[#909093]'>{subtitle}</h1>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <div className='px-4 py-3 flex justify-between items-center gap-2 bg-[#1b5a71]/30 rounded-3xl'>
          <CiSearch />
          <input type="text" placeholder="Search coin name ..." className='text-[14px] bg-transparent focus:outline-none hover:border-none selection:border-none border-none decoration-none'/>
        </div>
        <div className='bg-[#1b5a71]/30 rounded-3xl p-2 items-center justify-center'>
          <CiBellOn className='w-6 h-6'/>
        </div>
        <div className='hidden md:flex items-center'>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-6 h-6"
            />
            <div className='flex flex-col gap-1 items-start justify-start'>
              <p>Username</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
