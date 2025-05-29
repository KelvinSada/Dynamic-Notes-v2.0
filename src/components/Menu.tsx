import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "./Context";


const Menu = () => {
      const {DeleteFunction:{setRemove},
      // SavedFunction:{setSave},
      SelectCurrentPage:{currentPage,setCurrentPage},
      CurrentEditableNotes:{currentNotes,setCurrentNotes},
      NoteArray:{savedArray,setSavedArray},
      DisplayNotesAndTotal:{setDisplayNotes},
      Testing:{setTests}

    } = useContext(AppContext)
  
  const goToSavedPage =()=>{
    if (currentPage !== "saved"){
      setCurrentPage("saved")
    }
  }

  const handleDelete = ()=>{
   setRemove(prev=>!prev)
  }


// Saving and Clearing Notes
const handleSave=()=>{
 if (currentPage === "home"){
   if (currentNotes.body.length > 0 && currentNotes.id === 0){

      const currentNotesDuplicate = {...currentNotes}
      currentNotesDuplicate.id = savedArray.length + 1
      setSavedArray(prev=>{
        return[currentNotesDuplicate,...prev]
      })
      // Clearing current note
      setCurrentNotes({
        id:0,
        title:"",
        body:"",
        total:0,
        date:"",
        time:"",
        dynamicItems:[],
        status:"active",
      })
      setDisplayNotes({
        note:"",
        total:0,
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
   
        setCurrentNotes({
          id:0,
          title:"",
          body:"",
          total:0,
          date:"",
          time:"",
          dynamicItems:[],
          status:"active",
        })
        setDisplayNotes({
          note:"",
          total:0,
        })
      }

    } else {
      setCurrentPage("home")
    } 

  }

  const goToSettingsPage =()=>{

    if (currentPage !== "settings"){
      setCurrentPage("settings")
      setTests({
        name:"Novoh",
        class:"Done"
      })
    }
  }

  return (
    <div className="w-fit mx-auto">
      <ul className="flex bg-gray-100 border border-gray-200 text-2xl rounded-full shadow-sm overflow-hidden">
        <li onClick={goToSavedPage} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <FaTableList />
        </li>
        <li onClick={handleSave} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoIosAddCircle />
        </li>
        <li onClick={handleDelete} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <MdDelete />
        </li>
        <li onClick={goToSettingsPage} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
          <IoMdSettings />
        </li>
      </ul>
    </div>
  )
}

export default Menu
