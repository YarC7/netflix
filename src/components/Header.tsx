import { useState } from "react";
interface HeaderProps {
    onSearch: (value: string) => void;
  }
const Header : React.FC<HeaderProps> = ({ onSearch }) => {
    const [search, setSearch] = useState("");
    return (
        <div className="p-3 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-[30px] uppercase font-bold text-red-600">Movie</h1>
                <a href="#" className="text-[14px] font-bold text-white">Home</a>
                <a href="#" className="text-[14px] font-bold text-white">About</a>
                <a href="#" className="text-[14px] font-bold text-white">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search" className="p-2 text-black rounded-2xl"/>
                <button className="p-2 text-white bg-red-700 rounded-2xl"
                    onClick={()=> onSearch(search)}>Search</button>
            </div>
        </div>
    )
}
export default Header;