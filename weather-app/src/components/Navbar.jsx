import { useEffect, useState } from "react";
import Search from "./Search";
import { MdDarkMode } from "react-icons/md";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModeLocal = localStorage.getItem("darkModeLocal");
    if (darkModeLocal !== null) {
      setDarkMode(JSON.parse(darkModeLocal));
    }
    console.log("dark mod local", darkMode);
  }, []);

  const handleDarkModControl = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkModeLocal", JSON.stringify(newDarkMode));
  };
  console.log("dark modu");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="z-50 w-7/12 flex flex-col items-center justify-between p-5 gap-4 text-white">
      <div className="w-full flex items-center justify-between">
        <div>React Hava Durumu Uygulaması</div>
        <div>
          <MdDarkMode
            onClick={handleDarkModControl}
            className="cursor-pointer text-2xl"
          />
        </div>
      </div>
      <Search />
    </div>
  );
}
