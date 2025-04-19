import { CiMenuKebab } from "react-icons/ci";
import { NoteArrayType } from "./Types";
import { useContext } from "react";
import { AppContext } from "./Context";

type Values ={
  values:NoteArrayType,
  pickedNote: number | null,
  setpickedNote: React.Dispatch<React.SetStateAction<number | null>>,
}

const NoteItem = ({values,pickedNote,setpickedNote}:Values) => {
  const {AccessSavedNotes:{viewNotes,setViewNotes},
  StoredPage:{setStoredPage},
  NoteArray:{savedArray,setSavedArray}}= useContext(AppContext)


  const handleViewNotes = ()=>{
    if (values.id !== viewNotes){
      setViewNotes(values.id)
    } else{
      setStoredPage("home")
    }
  }

  // Clicking the toggle on the menu property
  const isOpen = pickedNote === values.id

  const ToggleClick=(id:number)=>{
   setpickedNote(isOpen?null:id)
  }
 

  // Handle deletion of Notes

  const handleDeleteNote=()=>{
    const updatedArray:NoteArrayType[] = []
    savedArray.filter(item=>{
      if (item.id !== values.id){
        updatedArray.push(item)
      }
    })
    setSavedArray(updatedArray)
  }

  // Limit the no of words to be shown for the body
  let detail = ""
  if (values.body.length < 40){
    detail = values.body
  } else {
    detail = `${values.body.slice(0,40)}...`
  }


  return (
    <section className=" flex flex-col gap-3 border-1 border-gray-300 hover:border-blue-300 rounded-[10px] p-3 bg-[#F8F8F8]">
      <div className="flex items-center justify-between">
        <h2 onClick={handleViewNotes} className="text-2xl text-gray-800 font-700">{values.title}</h2>
        <div className="relative text-lg hover:bg-gray-300 py-1 hover:rounded-[10px] text-black">
          {/* <div>{values.id}</div> */}
          <button onClick={()=>ToggleClick(values.id)}>
            <CiMenuKebab />
          </button>
        
          {isOpen?<div className="absolute p-1 rounded-[5px] text-sm right-5 bg-[#f8f8f8] border-[1px] border-gray-400 w-fit ">
           <ul>
            <li className="cursor-pointer hover:text-gray-500" onClick={handleViewNotes}>View</li>
            <li className="text-red-500 hover:text-red-300 cursor-pointer"
            onClick={handleDeleteNote}>Delete</li>
           </ul>
          </div>:null}
        </div>
      </div>
       <p onClick={handleViewNotes} className="text-gray-500">{detail}</p>
      <div className="flex justify-between">
        <p className="text-[12px] text-gray-800">{values.date}</p>
        <p className="bg-blue-50 rounded text-blue-500 px-2 w-fit">Total: {values.total}</p>
      </div>
      

    </section>
  )
}

export default NoteItem
