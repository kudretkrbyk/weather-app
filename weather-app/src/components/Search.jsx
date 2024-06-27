import { FaSearch } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";
import { AiOutlineEnter } from "react-icons/ai";
import React, { memo, useState, useCallback } from "react";

const Search = memo(function Search({ setCity, handleUseLocation }) {
  console.log("Search component re-rendered");

  const [input, setInput] = useState("");

  const handleSearch = useCallback(() => {
    console.log("Search function called");
    if (input.trim() !== "") {
      setCity(input);
    }
  }, [setCity, input]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="dark:bg-[#021A33] bg-slate-300 w-full flex items-center justify-center p-2 px-4 rounded-xl shadow-2xl">
      <div className="flex items-start justify-start px-4">
        <FaSearch />
      </div>
      <div className="flex dark:border-black border-r  border-[#021A33] w-full">
        <input
          className="w-full dark:bg-[#021A33] bg-slate-300 text-white"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Şehir giriniz..."
        />
        <div className="p-2 hover:cursor-pointer" onClick={handleSearch}>
          <AiOutlineEnter className="size-5" />
        </div>
      </div>
      <div
        className="flex items-end justify-end px-4 hover:cursor-pointer"
        onClick={handleUseLocation}
      >
        <MdGpsFixed />
      </div>
    </div>
  );
});

export default Search;
