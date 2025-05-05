import { useContext } from "react"
import { AppContext } from "./Context"

const NotesTopBar = () => {
const {AddCategoryToggle:{categoryToggle,setCategoryToggle}} = useContext(AppContext)

  const addNewCategory=()=>{
    setCategoryToggle(true)
  }

  console.log(categoryToggle)
  return (
  <div className="z-0 flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
    <div className="bg-amber-50 px-4 py-2 rounded-md border border-amber-100">
      <p className="font-medium text-amber-800">Current Notes</p>
    </div>
    <div className="flex-1">
      <p className="text-gray-500">Add new section</p>
    </div>
    <button onClick={addNewCategory} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors">
      <span>Add</span>
      <span className="text-lg">+</span>
    </button>

    
  </div>
  )
}

export default NotesTopBar
