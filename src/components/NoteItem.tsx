import { CiMenuKebab } from "react-icons/ci";
import { NoteArrayType } from "./Types";
import { useContext } from "react";
import { AppContext } from "./Context";

type Values ={
  values:NoteArrayType
}

const NoteItem = ({values}:Values) => {
  const {AccessSavedNotes:{setViewNotes}}= useContext(AppContext)

  const handleViewNotes = ()=>{
    setViewNotes(values.id)
  }

  return (
    <section onClick={handleViewNotes} className=" flex flex-col gap-3 border-1 border-gray-300 hover:border-blue-300 rounded-[10px] p-3 bg-[#F8F8F8]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-800 font-700">{values.title}</h2>
        <div className="relative text-lg hover:bg-gray-300 py-1 hover:rounded-[10px] text-black">
          <CiMenuKebab />
        
          {/* <div className="absolute p-1 rounded-[5px] text-sm right-5 bg-[#f8f8f8] border-[1px] border-gray-400 w-fit ">
           <ul>
              <li>View</li>
             <li className="text-red-500">Delete</li>
           </ul>
          </div> */}
        </div>
      </div>
       <p className="text-gray-500">{values.body}</p>
      <div className="flex justify-between">
        <p className="text-[12px] text-gray-800">{values.date}</p>
        <p className="bg-blue-50 rounded text-blue-500 px-2 w-fit">Total: {values.total}</p>
      </div>

      

    </section>
  )
}

export default NoteItem
