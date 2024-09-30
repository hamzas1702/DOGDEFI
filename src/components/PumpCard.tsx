import React from 'react';
import { Link } from 'react-router-dom';

interface PumpCardProps{
    ticker: string;
    name: string;
    description: string;
    image: string;
    link: string;
    time: string;
    marketcap: number;
    replies: number;
}

const PumpCard: React.FC<PumpCardProps> = ({ticker,name,description,image,link,time,marketcap,replies}) => {
  return (
    <Link to={link} className="bg-[#1b5a71] p-4 rounded-md text-white font-Montserrat">
      <div className="flex gap-4">
        <img
          src={image}
          alt="Coin"
          className="w-16 h-16"
        />
        <div>
          <p className="text-sm text-green-400">created by 6atFe {time}</p>
          <p className="text-sm">market cap : {marketcap}</p>
          <p className="text-sm">replies: {replies}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="break-all">
        <span className="text-yellow-500 font-semibold">{name} (Ticker: {ticker})</span> : {description}
        </p>
      </div>
    </Link>
  );
};

export default PumpCard;
