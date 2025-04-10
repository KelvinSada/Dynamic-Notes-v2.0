import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { DeleteContext } from "./Context";


const Menu = () => {
  const {remove,setRemove} = useContext(DeleteContext)
  
  const handleDelete = ()=>{
    if (remove === false){
      setRemove(true)
    } 
  }
  console.log(remove)
  return (
    // <div className="w-fit mx-auto">
    //   <ul className="flex bg-gray-200 border-[1px] text-[30px] border-gray-300 rounded-[30px] justify-between items-center gap-3 px-4 py-1">
    //     <li className="hover:text-blue-500 hover:bg-gray-300 p-1 rounded-[20px]"><FaTableList /></li>
    //     <li className="hover:text-blue-500 hover:bg-gray-300 p-1 rounded-[20px]"><IoIosAddCircle /></li>
    //     {/* <li className="text-blue-500 bg-blue-200 p-2 rounded-[30px]"><IoIosAddCircle /></li> */}
    //     <li className="hover:text-blue-500 hover:bg-gray-300 p-1 rounded-[20px]"><IoMdSettings /></li>
    //   </ul>
    // </div>

    <div className="w-fit mx-auto">
      <ul className="flex bg-gray-100 border border-gray-200 text-2xl rounded-full shadow-sm overflow-hidden">
        <li className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <FaTableList />
        </li>
        <li className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoIosAddCircle />
        </li>
        <li onClick={handleDelete} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <MdDelete />
        </li>
        <li className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoMdSettings />
        </li>
      </ul>
    </div>
  )
}

export default Menu
