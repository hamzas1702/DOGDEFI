import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DropdownSort from "../components/sortButton";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import PumpCard from '../components/PumpCard';
import { useNavigate } from 'react-router-dom'; 
import { ethers } from 'ethers'; // Use ES module syntax for ethers
import { abi } from '../assets/utility/abi'; // Ensure your ABI is properly exported from this path

const Dashboard: React.FC = () => {
  const [toggleAnimations, setToggleAnimations] = useState(false);
  const [toggleNSFW, setToggleNSFW] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {
      
        const provider = new ethers.JsonRpcProvider("https://site1.moralis-nodes.com/eth/4439963949d341ca8f99cab64b8dab55");

        console.log(provider)
        const contract = new ethers.Contract("0x81ED8e0325B17A266B2aF225570679cfd635d0bb", abi, provider);

        const memeTokensCount = await contract.getMemeTokenCount();
        console.log(memeTokensCount);

        // setCards(
        //   memeTokens.map(token => ({
        //     name: token.name,
        //     symbol: token.symbol,
        //     description: token.description,
        //     tokenImageUrl: token.tokenImageUrl,
        //     fundingRaised: ethers.formatUnits(token.fundingRaised, 'ether'), // Format the fundingRaised from Wei to Ether
        //     tokenAddress: token.tokenAddress,
        //     creatorAddress: token.creatorAddress,
        //   }))
        // );
      } catch (error) {
        console.error('Error fetching meme tokens count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToTokenDetail = (card) => {
    navigate(`/token-detail/${card.tokenAddress}`, { state: { card } });
  };

  return (
    <Layout pageTitle="Home" pageSubTitle="View All Current Pumps">
      <div className="text-white font-Montserrat">
        <div className='flex items-center justify-center'>
          <div className='flex flex-col gap-4 items-center justify-center mb-10 md:w-[40%]'>
            <h1 className='text-[40px] text-yellow-500 shadow-red-500 text-shadow-[0_4px_8px_var(--tw-shadow-color)] font-Anton tracking-wider uppercase'>King of the Hill</h1>
            <PumpCard
              ticker='$MOODOGG'
              name="Moo Dogg"
              description='Tiny Dog, Big Drama: Meet Moo Dogg, our tiny, white Chihuahua known for her dramatic and adorable crying face'
              image='https://via.placeholder.com/40'
              marketcap={1080456}
              replies={47}
              time='1h ago'
              link='/'
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-4 justify-start items-center mb-10'>
          <DropdownSort/>
          <div className={`${toggleAnimations ? 'bg-green-300 hover:bg-green-400' : 'bg-red-300 hover:bg-red-400'} inline-flex justify-between items-center rounded-md px-4 py-2 text-sm font-medium text-black shadow-sm focus:outline-none gap-2 hover:cursor-pointer`} onClick={() => setToggleAnimations(!toggleAnimations)}>
            {toggleAnimations ? <FaCheck /> : <RxCross2 />}
            <p>Animations</p>
          </div>
          <div className={`${toggleNSFW ? 'bg-green-300 hover:bg-green-400' : 'bg-red-300 hover:bg-red-400'} inline-flex justify-between items-center rounded-md px-4 py-2 text-sm font-medium text-black shadow-sm focus:outline-none gap-2 hover:cursor-pointer`} onClick={() => setToggleNSFW(!toggleNSFW)}>
            {toggleNSFW ? <FaCheck /> : <RxCross2 />}
            <p>Include NSFW</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* {cards.map((card) => (
            // <PumpCard
            //   key={card.tokenAddress}
            //   ticker={card.symbol}
            //   name={card.name}
            //   description={card.description}
            //   image={card.tokenImageUrl}
            //   marketcap={parseFloat(card.fundingRaised)}
            //   replies={47}
            //   time='1h ago'
            //   link='/'
            // />
          ))} */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
