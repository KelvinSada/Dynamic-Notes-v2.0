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
  const { DisplayNotesAndTotal:{setDisplayNotes},
  CurrentEditableNotes:{currentNotes,setCurrentNotes},
  SelectCurrentPage:{setCurrentPage},
  NoteArray:{savedArray,setSavedArray}}= useContext(AppContext)

// Handle Select Notes from Saved Array to View
  const handleViewNotes = ()=>{

    // Handling any existing current notes
     if (currentNotes.body.length > 0 && currentNotes.id === 0){
      const currentNotesDuplicate = {...currentNotes}
      currentNotesDuplicate.id = savedArray.length + 1
      setSavedArray(prev=>{
        return[currentNotesDuplicate,...prev]
      })
      
      } else if ( currentNotes.body.length > 0 && currentNotes.id > 0) {
        const savedArrayDuplicate = [...savedArray]
  
       // Removing Array with asimilar ID as the current Array
       const filteredArray = savedArrayDuplicate.filter(item=>{
        return item.id !== currentNotes.id
      })
      
        setSavedArray(()=>{
          return [currentNotes,...filteredArray]
        })
      }

      // Handling getting Data from saved Value
      const findItem = savedArray.find(item=>item.id === values.id)

      if (findItem){
        setCurrentNotes(findItem)
        setDisplayNotes({
          note:findItem.body,
          total:findItem.total
        })
      }
  
    setCurrentPage("home");
  }
  

  // Clicking the toggle on the menu property
  const isOpen = pickedNote === values.id

  const ToggleClick=(id:number)=>{
   setpickedNote(isOpen?null:id)
  }
 
console.log(currentNotes)
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
  let displayBody = ""
  if (values.body.length < 40){
    displayBody = values.body
  } else {
    displayBody = `${values.body.slice(0,40)}...`
  }

  //Displaying the title of the notes

  let displayTitle = ""
  if (values.title){
   displayTitle = values.title.slice(0,20)
  } else {
    displayTitle = `${values.body.slice(0,20)}..`
  }

  // Displaying the Total
  const displayTotal = `${values.total > 0?"₦ ":""}`+values.total.toLocaleString("en-US");

  return (
    <section className=" flex flex-col gap-3 border-1 border-gray-300 hover:border-blue-300 rounded-[10px] p-3 bg-[#F8F8F8]">
      <div className="flex items-center justify-between">
        <h2 onClick={handleViewNotes} className="text-2xl cursor-pointer text-gray-800 font-700">{displayTitle}</h2>
        <div className="relative text-lg hover:bg-gray-300 py-1 hover:rounded-[10px] text-black">
          {/* <div>{values.id}</div> */}
          <button onClick={()=>ToggleClick(values.id)}>
            <CiMenuKebab />
          </button>
        
          {isOpen?<div className="absolute p-3 rounded-[5px] text-md right-5 bg-[#f8f8f8] border-[1px] border-gray-400 w-fit ">
           <ul>
            <li className="cursor-pointer hover:text-gray-500 " onClick={handleViewNotes}>View</li>
            <li className="text-red-500 hover:text-red-300 cursor-pointer"
            onClick={handleDeleteNote}>Delete</li>
           </ul>
          </div>:null}
        </div>
      </div>
       <p onClick={handleViewNotes} className="text-gray-500 cursor-pointer">{displayBody}</p>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[12px] text-gray-400">{values.time}</p>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <p className="text-[12px] text-gray-600">{values.date}</p>
        </div>
        <p className="bg-blue-50 rounded text-blue-500 px-2 w-fit">Total: {displayTotal}</p>
      </div>
      

    </section>
  )
}

export default NoteItem
