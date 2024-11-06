import React, { useState, useEffect, useRef } from "react";
import { SlArrowDown } from "react-icons/sl";

const Dropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-700/80 flex gap-2 items-center backdrop-blur-sm px-10 text-white border border-zinc-600 rounded-lg p-2 w-full text-left"
      >
        {selectedOption.name}
        <SlArrowDown className="text-sm ml-1"/>
      </button>
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-zinc-700 text-white border border-zinc-600 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-4 p-2 hover:bg-zinc-600 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
