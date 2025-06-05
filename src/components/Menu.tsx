import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "./Context";


const Menu = () => {
      const {
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
   if (currentNotes.status === "active"){
    setCurrentNotes(prev=>{
      return{
        ...prev,
        body:"",
        total:0,
      }
    })
    setDisplayNotes({
      note:"",
      total:0,
    })
   } else {
    setCurrentNotes((prev)=>{
      return{
        ...prev,
        dynamicItems:prev.dynamicItems.filter((item)=>{
          return item.status !== "active"
        })
      }
    })
    setDisplayNotes({
      note:currentNotes.body,
      total:currentNotes.total
    })
   }
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
    // <div className="fixed bottom-0 w-full py-4 bg-white border-t border-gray-300 shadow-md">
    //   <ul className="flex justify-center gap-5 text-3xl w-full">
    //     <li onClick={goToSavedPage} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
    //       <FaTableList />
    //     </li>
    //     <li onClick={handleSave} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
    //       <IoIosAddCircle />
    //     </li>
    //     <li onClick={handleDelete} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
    //       <MdDelete />
    //     </li>
    //     <li onClick={goToSettingsPage} className="px-4 py-2 text-gray-600 hover:bg-blue-100 transition-colors cursor-pointer">
    //       <IoMdSettings />
    //     </li>
    //   </ul>
    // </div>
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-sm">
  <ul className="flex justify-around items-center py-3 max-w-md mx-auto">
    <li 
      onClick={goToSavedPage} 
      className="p-3 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer rounded-full hover:bg-blue-50"
      title="Saved Items"
    >
      <FaTableList className="text-2xl" />
    </li>
    <li 
      onClick={handleSave} 
      className="p-3 text-gray-500 hover:text-green-500 transition-colors cursor-pointer rounded-full hover:bg-green-50"
      title="Add Item"
    >
      <IoIosAddCircle className="text-2xl" />
    </li>
    <li 
      onClick={handleDelete} 
      className="p-3 text-gray-500 hover:text-red-500 transition-colors cursor-pointer rounded-full hover:bg-red-50"
      title="Delete"
    >
      <MdDelete className="text-2xl" />
    </li>
    <li 
      onClick={goToSettingsPage} 
      className="p-3 text-gray-500 hover:text-purple-500 transition-colors cursor-pointer rounded-full hover:bg-purple-50"
      title="Settings"
    >
      <IoMdSettings className="text-2xl" />
    </li>
  </ul>
</div>
  )
}

export default Menu
