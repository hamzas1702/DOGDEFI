import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DropdownSort from "../components/sortButton";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import PumpCard from '../components/PumpCard';
import { useNavigate } from 'react-router-dom'; 
import { ethers } from "ethers"; // Use ES module syntax for ethers
import { abi } from '../assets/utility/abi'; // Ensure your ABI is properly exported from this path

import { Interface } from 'ethers';

import Moralis from 'moralis';

Moralis.start({
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNkYzhlYWU5LTI0NDItNDc3NC04OThiLWNhMGZkMjRhZTkzOSIsIm9yZ0lkIjoiNDA5ODk0IiwidXNlcklkIjoiNDIxMjEzIiwidHlwZUlkIjoiMjQ0ZmYwMTgtZTQ4Mi00NGUwLWE5M2MtY2U5YWNhZjFmNjc4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjc2MzMwMzYsImV4cCI6NDg4MzM5MzAzNn0.OnzWiiu-LydqNMBP3_rSZL9FCnvMZWx8GgtPFuLBPxk',
});

const Dashboard: React.FC = () => {
  const [toggleAnimations, setToggleAnimations] = useState(false);
  const [toggleNSFW, setToggleNSFW] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [decodedTransactions, setDecodedTransactions] = useState<any[]>([]);
  const navigate = useNavigate(); 

  const fetchContractTransactions = async (contractAddress: string) => {
  const decodedTransactions: any = [];
  try {
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: contractAddress,
      chain: '11155111',
    });
    
    console.log("Response from API:", response);

    const transactions = response.result;

    if (!transactions || transactions.length === 0) {
      console.log('No transactions found for this contract.');
      return [];
    }

    const contractInterface = new Interface(abi);

    const transactionPromises = transactions.map(async (tx) => {
      const transactionHash = tx.hash;
      console.log("Decoding transaction with hash: ", transactionHash);

      const transactionDetails = await Moralis.EvmApi.transaction.getTransaction({
        chain: "11155111",
        transactionHash: transactionHash
      });
      if (transactionDetails && transactionDetails.result) {
        const inputData = transactionDetails.jsonResponse.input;

        if (!inputData) {
          console.log(`No input data found for transaction ${transactionHash}`);
          return;
        }

        try {
          const decodedData = contractInterface.parseTransaction({ data: inputData });
          console.log('Decoded data:', decodedData.args);
          decodedTransactions.push({ decodedData: decodedData.args });
        } catch (decodeError) {
          console.error(`Error decoding data for transaction ${transactionHash} with input ${inputData}:`, decodeError);
        }
      }
    });

    await Promise.all(transactionPromises);
    setDecodedTransactions(decodedTransactions);
    return decodedTransactions;
  } catch (error) {
    console.error('Error fetching contract transactions:', error);
    return [];
  }
};

  useEffect(()=>{
    console.log("Decoded Transactions changed:", decodedTransactions);
  }, [decodedTransactions]);

  
  useEffect(() => {
    const fetchMemeTokens = async () => {
      try {

        fetchContractTransactions("0x093D305366218D6d09bA10448922F10814b031dd")//address where the contract is deployed
          .then(hashes => console.log("Fetched transaction hashes: ", hashes))
          .catch(error => console.error(error));
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeTokens();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToTokenDetail = (transaction: string) => {
    navigate(`/token-detail/${transaction[0]}`, { state: { transaction } }); // Update as necessary
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

        <div className='flex flex-wrap items-center justify-start gap-4 mb-10'>
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

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {decodedTransactions.map((transaction, index) => (
            <PumpCard
              key={index} // Use index or a unique identifier from the transaction if available
              ticker={transaction.decodedData[1]} // Adjust based on your decoded data structure
              name={transaction.decodedData[0]} // Adjust based on your decoded data structure
              description={transaction.decodedData[2]} // Adjust based on your decoded data structure
              image={transaction.decodedData[3]} // Adjust based on your decoded data structure
              marketcap={1080456} // Placeholder, adjust as needed
              replies={47} // Placeholder, adjust as needed
              time='1h ago' // Placeholder, adjust as needed
              link='/'
            />
          ))}
          {/* <PumpCard
              ticker='$MOODOGG'
              name="Moo Dogg"
              description='Tiny Dog, Big Drama: Meet Moo Dogg, our tiny, white Chihuahua known for her dramatic and adorable crying face'
              image='https://via.placeholder.com/40'
              marketcap={1080456}
              replies={47}
              time='1h ago'
              link="/"
          /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
