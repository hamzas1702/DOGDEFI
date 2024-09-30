import React from 'react';
import { Link } from 'react-router-dom';

interface HolderInformationProps{
    name: string;
    percentage: number;
    link: string;
};

const HolderInformation: React.FC<HolderInformationProps> = ({name, percentage, link}) => {
  return (
    <div className='flex justify-between items-center w-full'>
        <Link to={link} className='hover:underline-offset-1 hover:underline'>{name}</Link>
        <p>{percentage}%</p>
    </div>
  )
}

export default HolderInformation;