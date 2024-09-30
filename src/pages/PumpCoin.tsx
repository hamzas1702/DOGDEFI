import Layout from "../components/Layout";
import { FaCheck, FaCopy,FaRegHeart  } from "react-icons/fa";
import HolderInformation from "../components/HolderInformation";

import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const holders = [
    { name: 'Alice', percentage: 45, link: '/holder/alice' },
    { name: 'Bob', percentage: 30, link: '/holder/bob' },
    { name: 'Charlie', percentage: 15, link: '/holder/charlie' },
    { name: 'David', percentage: 10, link: '/holder/david' }
];

const trades = [
    { account: '9WW7M3', accountImage: ' ',accountLink: '/', type: 'buy', sol: 0.0625, him: '1.03m', time: '5m ago', transaction: '3wd89W', transactionLink: '/' },
    { account: 'ptpv4m', accountImage: ' ',accountLink: '/', type: 'buy', sol: 0.0100, him: '164.72k', time: '6m ago', transaction: '3k1XWh', transactionLink: '/' },
    { account: '5KcFfs', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.7854, him: '12.71m', time: '27m ago', transaction: '284eQX', transactionLink: '/' },
    { account: 'F94Dxx', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.1367, him: '2.17m', time: '27m ago', transaction: '9gtUcS', transactionLink: '/' },
    { account: 'HusdzT', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.5629, him: '8.79m', time: '31m ago', transaction: '3zZTnv', transactionLink: '/' },
    { account: '6ghgt5', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.2870, him: '4.40m', time: '44m ago', transaction: '73GwGu', transactionLink: '/' },
    { account: 'GRQnqC', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.3303, him: '4.99m', time: '57m ago', transaction: '3E5CBs', transactionLink: '/' },
    { account: '9e3ccT', accountImage: ' ',accountLink: '/', type: 'buy', sol: 0.1472, him: '2.22m', time: '1h ago', transaction: '2eYShB', transactionLink: '/' },
    { account: 'ZG98FU', accountImage: ' ',accountLink: '/', type: 'sell', sol: 0.0215, him: '325.29k', time: '1h ago', transaction: '4xwqgi', transactionLink: '/' },
    { account: 'CACtZX', accountImage: ' ',accountLink: '/', type: 'buy', sol: 0.1500, him: '2.27m', time: '1h ago', transaction: '4yWoKm', transactionLink: '/' },
    { account: 'CACtZX', accountImage: ' ',accountLink: '/', type: 'buy', sol: 0.3000, him: '4.59m', time: '1h ago', transaction: 'VVLFQe', transactionLink: '/' },
];

const comments = [
    {
      username: 'JohnDoe',
      userImage: '/images/user1.jpg',
      time: '2 hours ago',
      likes: 34,
      commentNo: 1,
      comment: 'This is a really great post! I love the details and how thorough it is.',
      commentImage: '/images/comment1.jpg',
      userLink: '/'
    },
    {
      username: 'JaneSmith',
      userImage: '/images/user2.jpg',
      time: '1 hour ago',
      likes: 19,
      commentNo: 2,
      comment: 'Very informative, thanks for sharing!',
      commentImage: '/images/comment2.jpg',
      userLink: '/'
    },
    {
      username: 'MikeJohnson',
      userImage: '/images/user3.jpg',
      time: '30 minutes ago',
      likes: 22,
      commentNo: 3,
      comment: 'I have a question regarding the second point you made, can you clarify?',
      commentImage: null, // No image for this comment
      userLink: '/'
    },
    {
      username: 'EmilyClark',
      userImage: '/images/user4.jpg',
      time: '15 minutes ago',
      likes: 5,
      commentNo: 4,
      comment: 'Awesome explanation! Keep up the good work.',
      commentImage: '/images/comment3.jpg',
      userLink: '/'
    }
  ];
  

const PumpCoin = () => {

    const [copySuccess, setCopySuccess] = useState<string | null>(null);
    const [displayType, setDisplayType] = useState("Comments");
    const [tradeType, setTradeType] = useState("Buy");
    const [modelView, setMdelView] = useState(false);
    const [fontRunningProtection, setFontRunningProtection] = useState(false);
    const [replyEnabled, setReplyEnabled] = useState(false);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
          Notification.requestPermission();
        }
      }, []);
    
      // Function to copy text to clipboard and push notification
      const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopySuccess("Copied!");
            // Push notification if permission is granted
            if (Notification.permission === 'granted') {
              new Notification('Copied to Clipboard', {
                body: 'The contract address has been copied to your clipboard!',
              });
            }
            setTimeout(() => setCopySuccess(null), 2000); // Reset message after 2 seconds
          })
          .catch(err => console.log('Failed to copy: ', err));
      };

  return (
    <Layout pageTitle="Pump Details" pageSubTitle="View And Trade The current Coin Pump">
    <div className="min-h-screen font-Montserrat text-white w-full lg:flex ">
            {/* Left Section: Chart */}
      <div className="w-full lg:w-3/4 md:p-4">
        {/* Chart Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0 md:items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">IAMHIM</h1>
            <p className="text-sm">Ticker: HIM</p>
          </div>
          <div>
            <p className="text-green-400">Market cap: $10,394.418</p>
            <p className="flex gap-2 items-center flex-wrap"><span><FaCopy /></span>CA :  
                <span 
                    className="text-green-500 hover:cursor-pointer"
                    onClick={() => copyToClipboard('GmEUVQ1tLGxkJ8EsmfaCeg...')}
                >
                    GmEUVQ1tLGxkJ8EsmfaCeg...
                </span>
            </p>
          </div>
        </div>

        {/* Coin Chart (This could be replaced with an embedded TradingView or other charting library) */}
        <div className="bg-[#1e293b] h-[500px] rounded-md p-4">
          <div className="bg-gray-800 h-full rounded-md flex justify-center items-center">
            {/* Placeholder for the chart */}
            <p>Chart goes here</p>
          </div>
        </div>

        <div className="flex gap-4 items-center mt-8">
            <button className={`py-2 px-4  text-[12px] tracking-wide rounded-lg ${displayType === 'Comments' ? 'bg-[#49e9dd] text-black font-medium' : 'bg-[#1e293b]'}`} onClick={()=>setDisplayType('Comments')}>Comments</button>
            <button className={`py-2 px-4  text-[12px] tracking-wide rounded-lg ${displayType === 'Comments' ? 'bg-[#1e293b]' : ' bg-[#49e9dd] text-black font-medium'}`} onClick={()=>setDisplayType('Trades')}>Trades</button>
        </div>

        <div className="flex flex-col gap-3 mt-2">
            {displayType === "Comments" ? 
                <>
                    {comments.map((comment)=>(
                        <div className="flex flex-col h-contain w-full p-2 md:p-4 bg-[#1b5a71]/50 rounded-lg">
                            <div className="flex flex-row w-full gap-2 md:gap-8 items-center text-[12px]">
                                <div className="flex items-center justify-center gap-2">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="User"
                                    className="rounded-full w-4 h-4"
                                />
                                <Link to={comment.userLink} className="hover:underline hover:underline-offset-2">{comment.username}</Link>
                                </div>
                                <p>{comment.time}</p>
                                <div className="flex gap-2 items-center hover:cursor-pointer">
                                    <FaRegHeart />
                                    <p>{comment.likes}</p>
                                </div>
                                <p>#{comment.commentNo}</p>
                                <button className="hover:underline hover:underline-offset-2" onClick={()=>setReplyEnabled(!replyEnabled)}>[reply]</button>
                            </div>

                            <div className="flex items-center justify-start mt-4 gap-2">
                                <div className="w-1/7 h-contain">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="User"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="w-5/7 h-contain text-start text-[14px]">
                                    <p className="w-full">{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] text-white font-Montserrat font-regular capitalize">
                        <thead className="bg-[#1b5a71]/30">
                        <tr>
                            <th className="px-4 py-2">account</th>
                            <th className="px-4 py-2">type</th>
                            <th className="px-4 py-2">SOL</th>
                            <th className="px-4 py-2">HIM</th>
                            <th className="px-4 py-2">date</th>
                            <th className="px-4 py-2">transaction</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trades.map((trade, index) => (
                            <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 hover:underline hover:underline-offset-2"><Link to={trade.accountLink}>{trade.account}</Link></td>
                            <td className={`px-4 py-2 ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.type}</td>
                            <td className="px-4 py-2">{trade.sol}</td>
                            <td className="px-4 py-2">{trade.him}</td>
                            <td className="px-4 py-2">{trade.time}</td>
                            <td className="px-4 py-2 hover:underline hover:underline-offset-2"><Link to={trade.transactionLink}>{trade.transaction}</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
            }
            {replyEnabled && 
                <div className="flex flex-col gap-2 mt-4">
                    <h1 className="text-[16px]">Add a Comment</h1>
                    <input type="text" placeholder="comment" className="text-[14px] p-4 bg-[#1b5a71]/30 text-white placeholder:text-gray-500 rounded-lg"/>
                    <h1 className="text-[16px] mt-2">Attach Image to comment</h1>
                    <input type="file" id="image" className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1b5a71]/60 file:text-white hover:file:bg-[#1b5a71]/30 hover:file:cursor-pointer"/>
                    <button className="bg-green-400 text-black py-2 mt-4 font-semibold rounded-lg w-[40%] hover:bg-green-500">Post Comment</button>
                </div>
            }
        </div>
      </div>

      {/* Right Section: Transaction Panel */}
      <div className="w-full lg:w-1/4 h-contain flex flex-col gap-4 md:p-4 mt-6 md:mt-0">

        <div className="h-[600px] bg-[#1e293b] px-4 py-8 rounded-l-md flex flex-col justify-between">
            {/* Buy/Sell Panel */}
            <div className="flex flex-col gap-2">
            <div className="flex justify-between mb-4 text-[16px] font-medium gap-2">
                <button className={`w-full py-2 rounded-lg ${tradeType === 'Buy' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'}`} onClick={()=>setTradeType('Buy')}>Buy</button>
                <button className={`w-full py-2 rounded-lg ${tradeType === 'Sell' ? 'bg-red-500 text-black': 'bg-[#1b5a71]/50 text-white'}`} onClick={()=>setTradeType('Sell')}>Sell</button>
            </div>

            <div className="flex justify-end mb-4 text-[12px]" onClick={()=>setMdelView(!modelView)}>
                <button className="bg-[#1b5a71]/50 py-2 px-4 rounded-lg">Set max slippage</button>
            </div>

            { modelView &&
                <div className="flex flex-col gap-1 mb-4 text-[14px]">
                    <p>Set maximum slippage (%)</p>
                    <input type="number" min={0} max={100} placeholder="0%" className="p-4 bg-[#1b5a71]/30 text-white placeholder:text-gray-500 rounded-lg"/>
                    <p className="text-[10px]">This is the maximum amount of slippage you are willing to accept when placing trades</p>
                    <div className={`${fontRunningProtection ? 'bg-green-300 hover:bg-green-400' : 'bg-red-300 hover:bg-red-400'} inline-flex justify-between items-center rounded-md px-4 py-2 text-sm font-medium text-black shadow-sm focus:outline-none gap-2 hover:cursor-pointer mt-4 mb-4`} onClick={() => setFontRunningProtection(!fontRunningProtection)}>
                        {
                        fontRunningProtection ? <FaCheck /> : <RxCross2  />
                        }
                        <p className="text-[13px]">Enable Font-Running Protection</p>
                    </div>
                    <p>Priority fee (SOL)</p>
                    <input type="number" min={0} max={100} placeholder="0%" className="p-4 bg-[#1b5a71]/30 text-white placeholder:text-gray-500 rounded-lg"/>
                    <p className="text-[10px]">A higher priority fee will make your transactions confirm faster. This is the transaction fee that you pay to the solana network on each trade.</p>
                    <button className="bg-red-500 text-black hover:bg-red-700 text-[14px] px-4 py-2 mt-4 rounded-lg" onClick={()=>setMdelView(!modelView)}>Close</button>
                </div>
            }

            { !modelView &&
                <div className="bg-[#a0a7b1]/20 rounded-md p-4 mb-4 text-[16px]">
                    <input
                    type="number"
                    placeholder="0.0"
                    min={0}
                    className="w-full text-right bg-transparent outline-none text-white text-[20px]"
                    />
                    <p className="text-right">{tradeType === 'Buy' ? 'SOL' : 'HIM' }</p>
                </div>
            }

            {tradeType === 'Buy' ? 
                !modelView && (<div className="flex justify-between mb-4 gap-2 flex-wrap">
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">reset</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">1 SOL</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">5 SOL</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">10 SOL</button>
                </div> )
                    : 
                !modelView && (<div className="flex justify-center mb-4 gap-2 flex-wrap">
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">reset</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">25%</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">50%</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">75%</button>
                    <button className="bg-[#1b5a71]/80 hover:bg-[#1b5a71]/50 text-white py-1 px-4 rounded-lg hover:cursor-pointer text-[16px] capitalize">100%</button>
                </div>)
            }

            {!modelView && <button className={`${tradeType === 'Buy' ? 'bg-[#49e9dd]': 'bg-red-500'} w-full text-black py-2 rounded-md text-[16px] font-medium `}>Place Trade</button>
            }
            </div>

            {/* Coin Information */}
            {!modelView && <div className="flex items-center">
            <img
                src="https://via.placeholder.com/50"
                alt="Coin"
                className="w-24 h-24"
            />
            <div className="ml-4">
                <h3 className="text-md font-semibold">IAMHIM (ticker: HIM)</h3>
                <p className="text-sm text-gray-400">Nick rose the goat. Love this man.</p>
            </div>
            </div>}
        </div>

        <h1>Bonding Curve Progress : <span>48%</span></h1>
        <div className="p-3 rounded-xl bg-[#1b5a71]/50 relative w-full">
            <div className="p-3 rounded-xl bg-[#49e9dd] absolute top-0 left-0 w-[48%]"></div>
        </div>
        <p className="text-[12px] text-justify">When the market cap reaches <span className="font-semibold text-[#49e9dd]">$64,784</span> all the liquidity from the bonding curve will be deposited into Raydium and burned. progression increases as the price goes up.</p>

        <p className="text-[12px] text-justify">There are <span className="font-semibold text-[#49e9dd]">420,279,124</span> tokens still available for sale in the bonding curve and there is <span className="font-semibold text-[#49e9dd]">15.974 SOL</span> in the bonding curve.</p>

        <h1>King of The Hill Progress : <span>55%</span></h1>
        <div className="p-3 rounded-xl bg-[#1b5a71]/50 relative w-full">
            <div className="p-3 rounded-xl bg-[#e9b308] absolute top-0 left-0 w-[55%]"></div>
        </div>

        <div className="flex justify-between items-center mt-2">
            <h1 className="font-semibold">Holder Distribution</h1>
            <button className="px-4 py-2 text-[12px] rounded-lg bg-[#1b5a71] hover:bg-[#1b5a71]/50">Bubble Map</button>
        </div>

        <div className="flex flex-col gap-1 mt-1">
            {holders.map((holder, index) => (
                <span className="flex gap-2 w-full ">
                    {index+1}. 
                    <HolderInformation
                        key={index}
                        name={holder.name}
                        percentage={holder.percentage}
                        link={holder.link}
                    />
                </span>
            ))}
        </div>
        
        </div>
    </div>
    {copySuccess && 
        <div className="absolute top-20 flex w-[70%] items-center justify-center">
            <span className="bg-[#1b5a71] text-lg text-white flex items-center justify-center w-[20%] p-2 rounde-3xl">{copySuccess}</span>
        </div>
    }
    </Layout>
  )
}

export default PumpCoin;