import { useState } from 'react';
import { abi } from '../assets/utility/abi'; 
import { ethers } from 'ethers';
import Layout from '../components/Layout';
// let newEthers = require('./node_modules/ethers')

const NewCoin = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('img://img.png');
    const [sendNotification, setSendNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Function to get the contract for frontend interaction
    const getContractForFrontend = async() => {
        if (!window.ethereum) {
            console.error("MetaMask is not installed");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "0xF48883F2ae4C4bf4654f45997fE47D73daA4da07";
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Got the Contract:" ,contract);
    }

    try {
        getContractForFrontend();
    } catch (error) {
        console.error("Error fetching contract:", error);
    }

    const notification = (message: any) => {
        setNotificationMessage(message);
        setSendNotification(true);
        setTimeout(() => setSendNotification(false), 30000);
    };

    const handleCreate = async (e: any) => {
        e.preventDefault();
        alert("Running Handle create function ...");
        alert(`State values:, ${name} , ${ticker} , ${description}, ${imageUrl}`);
    
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "0x093D305366218D6d09bA10448922F10814b031dd";
        const contract = new ethers.Contract(contractAddress, abi, signer);
    
        try {
            const transaction = await contract.createMemeToken(name, ticker, description, imageUrl, {
                value: ethers.parseEther("0.0001"),
            });
            
            notification("Waiting for transaction to complete...");
            const receipt = await transaction.wait();
            alert(`Transaction completed with reciept: ${receipt}`);
            notification(`Transaction successful! Hash: ${receipt.transactionHash}`);
    
        } catch (error: any) {
            console.error('Error creating meme token:', error);
            notification(`Transaction failed: ${error.message}`);
        }
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);  // Set the imageUrl to the file's data URL
                console.log("Image URL set to:", reader.result);  // Log to confirm value
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout pageTitle="New Coin" pageSubTitle="List your new coin for pump">
            <div className="max-w-md mx-auto bg-[#132d46]/40 text-white p-6 rounded-md font-Montserrat mb-6">
                <form onSubmit={handleCreate}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full p-2 border border-gray-700 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value);
                                alert(`Name updated:${e.target.value}`);  // Log to confirm change
                            }} 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="ticker">Ticker</label>
                        <input 
                            type="text" 
                            id="ticker" 
                            className="w-full p-2 border border-gray-700 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={ticker} 
                            onChange={(e) => {
                                setTicker(e.target.value);
                                alert(`Ticker updated:${e.target.value}`);  // Log to confirm change
                            }} 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            className="w-full p-2 border border-gray-700 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={description} 
                            onChange={(e) => {
                                setDescription(e.target.value);
                                alert(`Description updated:${e.target.value}`);  // Log to confirm change
                            }}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm" htmlFor="image">Image</label>
                        <input 
                            type="file" 
                            id="image" 
                            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" 
                            onChange={handleFileChange} 
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create coin
                    </button>
                </form>

                {sendNotification && <div className='absolute top-8 left-[35%] w-[35%] h-contain p-4 bg-[#49e9dd]/50 text-center rounded-lg break-all'>
                    <p>{notificationMessage}</p>
                </div>}
            </div>
        </Layout>
    );
};

export default NewCoin;
