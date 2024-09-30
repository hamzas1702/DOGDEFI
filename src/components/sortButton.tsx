import React, { useState } from 'react';
import { FaFire } from 'react-icons/fa'; // Icon for 'featured' (flame)

const DropdownSort: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');

  const options = [
    { label: 'featured', icon: <FaFire /> },
    { label: 'bump order' },
    { label: 'creation time' },
    { label: 'last reply' },
    { label: 'currently live' },
    { label: 'market cap' },
  ];

  const handleSelect = (option: string) => {
    setSelectedSort(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full rounded-md bg-[#49e9dd]/90 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-[#49e9dd]/70 focus:outline-none"
        >
          <span className="flex items-center gap-1">
            Sort: {selectedSort === 'featured' && <FaFire />} {selectedSort}
          </span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md bg-green-300 shadow-lg">
          <ul className="py-1 text-sm text-black">
            {options.map((option) => (
              <li
                key={option.label}
                className={`cursor-pointer hover:bg-green-400 px-4 py-2 flex items-center gap-2 ${
                  selectedSort === option.label ? 'font-bold' : ''
                }`}
                onClick={() => handleSelect(option.label)}
              >
                {option.icon && option.icon} Sort: {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSort;
