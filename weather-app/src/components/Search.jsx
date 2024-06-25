import { FaSearch } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";

export default function Search() {
  return (
    <div className="bg-[#021A33] w-full flex items-center justify-center p-2 px-4 rounded-xl shadow-2xl">
      <div className="flex items-start justify-start px-4 ">
        <FaSearch />
      </div>
      <div className="border-black border-r w-full">
        <input
          className="w-full bg-[#021A33]"
          aria-label="sdsd"
          name="sdsds"
          value="Şehir giriniz..."
        ></input>
      </div>
      <div className="flex items-end justify-end px-4">
        <MdGpsFixed />
      </div>
    </div>
  );
}
