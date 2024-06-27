import { memo, useEffect, useState } from "react";
import Search from "./Search";
import { MdDarkMode } from "react-icons/md";

const Navbar = memo(function Navbar({ setCity, handleUseLocation }) {
  console.log("Navbar component re-rendered");
  const [darkMode, setDarkMode] = useState("light");

  useEffect(() => {
    const darkModeLocal = localStorage.getItem("darkModeLocal");
    if (darkModeLocal !== null) {
      setDarkMode(darkModeLocal === "dark" ? "dark" : "light");
    }
  }, []);

  const handleDarkModControl = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("darkModeLocal", newMode);
  };

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="z-50 w-full lg:w-7/12 flex flex-col items-center justify-between p-1 gap-4 dark:text-white text-[#021A33]">
      <div className="w-full flex items-center justify-between">
        <div className="lg:p-4 text-center w-full">
          React Hava Durumu Uygulaması
        </div>
        <div>
          <MdDarkMode
            onClick={handleDarkModControl}
            className="cursor-pointer text-2xl"
          />
        </div>
      </div>
      <Search setCity={setCity} handleUseLocation={handleUseLocation} />
    </div>
  );
});

export default Navbar;
