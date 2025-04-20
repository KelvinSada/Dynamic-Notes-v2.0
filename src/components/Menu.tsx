import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "./Context";


const Menu = () => {
      const {DeleteFunction:{setRemove},
      SavedFunction:{setSave},
      StoredPage:{storedPage,setStoredPage}} = useContext(AppContext)
  
  const handleStoredPage =()=>{
    if (storedPage !== "saved"){
      setStoredPage("saved")
    }
  }

  const handleDelete = ()=>{
   setRemove(prev=>!prev)
  }

  const handleSave=()=>{
    setSave(prev=>!prev)

    if (storedPage !== "home"){
      setStoredPage("home")
    }
  }

  const handleSettings=()=>{
    if (storedPage !== "settings"){
      setStoredPage("settings")
    }
  }
  return (
    <div className="w-fit mx-auto">
      <ul className="flex bg-gray-100 border border-gray-200 text-2xl rounded-full shadow-sm overflow-hidden">
        <li onClick={handleStoredPage} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <FaTableList />
        </li>
        <li onClick={handleSave} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoIosAddCircle />
        </li>
        <li onClick={handleDelete} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <MdDelete />
        </li>
        <li onClick={handleSettings} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoMdSettings />
        </li>
      </ul>
    </div>
  )
}

export default Menu
