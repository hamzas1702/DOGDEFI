import Layout from "../components/Layout";

import { FaEdit, FaExternalLinkAlt  } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { RiMessageFill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa6";

import {useState, useEffect} from "react";

import { Link } from "react-router-dom";

const coinsHeld = [
  {name: 'fog', sol: 0.0045, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'},
  {name: 'Morn', sol: 0.0005, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'},
  {name: 'HIM', sol: 0.015, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'},
  {name: 'GTI', sol: 0.0065, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'},
  {name: 'LOM', sol: 0.0009, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'},
  {name: 'FUX', sol: 0.00001, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect'}
]

const coinsCreated = [
  {name: 'fog', sol: 0.0045, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'},
  {name: 'Morn', sol: 0.0005, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'},
  {name: 'HIM', sol: 0.015, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'},
  {name: 'GTI', sol: 0.0065, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'},
  {name: 'LOM', sol: 0.0009, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'},
  {name: 'FUX', sol: 0.00001, link: '/', image: 'https://pump.mypinata.cloud/ipfs/QmYDPcWKpe9pHhTd8My1C6HFi8cpsHBaq19YwcPPgbie1a?img-width=40&img-dpr=2&img-onerror=redirect', marketCap: 2345670, ticker: 'ticker', replies: 15, description: 'lorem impsum dsjkaf asijdfiowe kjsadfhkwe ioadf weeuifhd faew fiuawbef wafiubef wauiefbs fhjbwe fusidbfa weuifbasd fawejfp2 iudfnaw epwef dfunwekf ees fwnioefnw foiweeanfwe foasifnwae fjsd fiawenfew.'}
]

const followers = [
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/40'},
]

const followings = [
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
  {name: 'username', followers: 45, userImage: 'https://via.placeholder.com/50'},
]

const replies = [
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'},
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'},
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'},
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'},
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'},
  { username: 'username', userImage: 'https://via.placeholder.com/50', reply: 'Just a reply from user on one of the coins or to your comment.', image: 'https://via.placeholder.com/50'}
]

const Profile = () => {

  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('coinsHeld');

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const getTextFromElement = (elementId: string): string | null => {
    const element = document.getElementById(elementId);
    return element ? element.textContent : null;// Return null if the element is not found
  };

  const text = getTextFromElement('user_wallet_address');

  // Function to copy text to clipboard and push notification
  const copyToClipboard = () => {
    if(text!=null){
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
    }
  };

  return (
    <Layout pageTitle="Profile" pageSubTitle="View And Edit Your Profile">
        <div className="bg-gray-900 text-white min-h-screen md:p-8">
        {/* Profile Info Section */}
        <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-14 h-14 mr-4"
            />
          <div>
            <p className="text-[25px] font-bold">@username</p>
            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-500">5 followers</p>
              <p className="text-sm text-gray-500">15 followings</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mb-4">
          <button className="bg-gray-800 text-white border border-gray-600 px-4 py-1 rounded-lg flex items-center">
            Edit profile <span className="ml-2"><FaEdit/></span>
          </button>
        </div>

        {/* Likes and Mentions */}
        <div className="flex items-center mb-4 text-sm text-gray-400">
          <p className="mr-4 flex items-center gap-1">
            Likes received: 5<span className="text-red-500"><FcLike/></span>
          </p>
          <p className="flex items-center gap-1">
            Mentions received: 5<span className="text-green-400"><RiMessageFill/></span>
          </p>
        </div>

        {/* Public Address Section */}
        <div className="mb-4 md:max-w-[60%] lg:max-w-[40%]">
          <div className="bg-gray-800 px-4 py-2 rounded-md text-sm mb-2 flex gap-6 items-center justify-between break-all">
            <p id="user_wallet_address">4Kr86uYXaM87YPX6PGCQttFYp3Se2MzT2FneHSJHUDnJ</p>
            <FaCopy className="w-4 h-4 hover: cursor-pointer" onClick={() => copyToClipboard()}/>
          </div>
          <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 underline flex items-center gap-1">
            View on solscan <FaExternalLinkAlt/>
          </a>
        </div>

        {/* Tabs Section */}
        <div className="flex gap-1 md:gap-4 mb-4 text-[12px] overflow-x-auto whitespace-nowrap">
          <button className={`${activeTab === 'coinsHeld' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-1 rounded-md mr-2`} onClick={()=>setActiveTab('coinsHeld')}>coins held</button>
          <button className={`${activeTab === 'coinsCreated' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-1 rounded-md mr-2`} onClick={()=>setActiveTab('coinsCreated')}>coins created</button>
          <button className={`${activeTab === 'replies' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-1 rounded-md mr-2`} onClick={()=>setActiveTab('replies')}>replies</button>
          {/* <button className={`${activeTab === 'notifications' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-1 rounded-md mr-2`} onClick={()=>setActiveTab('notifications')}>notifications</button> */}
          <button className={`${activeTab === 'followers' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-1 rounded-md mr-2`} onClick={()=>setActiveTab('followers')}>followers</button>
          <button className={`${activeTab === 'following' ? 'bg-[#49e9dd] text-black': 'bg-[#1b5a71]/50 text-white'} px-3 py-2 rounded-md mr-2`} onClick={()=>setActiveTab('following')}>following</button>
        </div>

        {
          activeTab === 'coinsCreated' && 
          <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] md:text-[12px] text-white font-Montserrat font-regular capitalize">
                      <thead className="bg-[#1b5a71]/30">
                        <tr>
                          <th className="px-4 py-2">Coin</th>
                          <th className="px-4 py-2 hidden md:table-cell">SOL</th>
                          <th className="px-4 py-2 hidden lg:table-cell">Market Cap</th>
                          <th className="px-4 py-2">Ticker</th>
                          <th className="px-4 py-2 hidden lg:table-cell">Comments</th>
                          <th className="px-4 py-2 hidden md:table-cell">Description</th>
                          <th className="px-4 py-2">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coinsCreated.map((coin, index) => (
                          <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 flex items-center justify-center gap-4 mt-4">
                              <img src={coin.image} alt="" className="w-12 h-12 rounded-full"/>
                              {coin.name}
                            </td>
                            <td className="px-4 py-2 hidden md:table-cell">{coin.sol}</td>
                            <td className="px-4 py-2 hidden lg:table-cell">{coin.marketCap}</td>
                            <td className="px-4 py-2">{coin.ticker}</td>
                            <td className="px-4 py-2 hidden lg:table-cell">{coin.replies}</td>
                            <td className="px-4 py-2 hidden md:table-cell max-w-[400px]">{coin.description}</td>
                            <td className="px-4 py-2 hover:underline hover:underline-offset-2">
                              <Link to={coin.link}>View Coin</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
          </div>
        }

        {
          activeTab === 'coinsHeld' && 
          <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] text-white font-Montserrat font-regular capitalize">
                        <thead className="bg-[#1b5a71]/30">
                        <tr>
                            <th className="px-4 py-2">Coin</th>
                            <th className="px-4 py-2">SOL</th>
                            <th className="px-4 py-2">Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coinsHeld.map((coin, index) => (
                            <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 flex items-center gap-4">
                              <img src={coin.image} alt="" className="w-12 h-12 rounded-full"/>
                              {coin.name}
                            </td>
                            <td className="px-4 py-2">{coin.sol}</td>
                            <td className={`px-4 py-2 hover:underline hover:underline-offset-2`}><Link to={coin.link}>View Coin</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
          </div>
        }

        {
          activeTab === 'replies' && 
          <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] text-white font-Montserrat font-regular capitalize">
                        <thead className="bg-[#1b5a71]/30">
                        <tr>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Reply/Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {replies.map((reply, index) => (
                            <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 flex items-center justify-center flex-wrap gap-1 md:gap-4 md:flex-nowrap">
                              <img src={reply.userImage} alt="" className="w-12 h-12 rounded-full"/>
                              {reply.username}
                            </td>
                            <td className="px-4 py-2">{reply.reply}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
          </div>
        }

        {
          activeTab === 'followers' && 
          <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] text-white font-Montserrat font-regular capitalize">
                        <thead className="bg-[#1b5a71]/30">
                        <tr>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Followers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {followers.map((follower, index) => (
                            <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 flex items-center gap-4">
                              <img src={follower.userImage} alt="" className="w-12 h-12 rounded-full"/>
                              {follower.name}
                            </td>
                            <td className="px-4 py-2">{follower.followers}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
          </div>
        }

        {
          activeTab === 'following' && 
          <div className="overflow-x-auto mt-2">
                    <table className="table-auto w-full text-left text-[14px] text-white font-Montserrat font-regular capitalize">
                        <thead className="bg-[#1b5a71]/30">
                        <tr>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Followers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {followings.map((follower, index) => (
                            <tr key={index} className="bg-[#1b5a71]/10 border-b border-gray-700">
                            <td className="px-4 py-2 flex items-center gap-4">
                              <img src={follower.userImage} alt="" className="w-12 h-12 rounded-full"/>
                              {follower.name}
                            </td>
                            <td className="px-4 py-2">{follower.followers}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
          </div>
        }


      </div>
      {copySuccess && 
        <div className="absolute top-20 flex w-[70%] items-center justify-center">
            <span className="bg-[#1b5a71] text-lg text-white flex items-center justify-center w-[20%] p-2 rounde-3xl">{copySuccess}</span>
        </div>
      }
    </Layout>
  )
}

export default Profile;