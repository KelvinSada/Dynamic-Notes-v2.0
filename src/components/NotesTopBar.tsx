import { useContext } from "react"
import { AppContext } from "./Context"

const NotesTopBar = () => {
const {AddCategoryToggle:{setCategoryToggle},
      CurrentEditableNotes:{currentNotes}} = useContext(AppContext)

  const addNewCategory=()=>{
    setCategoryToggle(true)
  }

  return (
  <div className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
    <div className="bg-amber-50  px-4 py-2 rounded-md border border-amber-100">
      <p className="font-medium text-amber-800">Current</p>
    </div>
    <div className="flex w-full overflow-scroll">
      {currentNotes.dynamicItems.map((category,index)=>{
        return(
          <p key={index} className="text-gray-500 flex items-center rounded-[10px] mr-2 p-2 justify-center border-1 bg-gray-100 min-w-[70%]">{category.categoryName}</p>
        )
      })}
    </div>
    <button onClick={addNewCategory} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors">
      <span>Add</span>
      <span className="text-lg">+</span>
    </button>
  </div>

//   <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//     <div className="bg-amber-50 w-full md:w-auto px-6 py-3 rounded-lg border border-amber-200 shadow-inner">
//       <p className="font-semibold text-amber-900 text-lg">Current Notes</p>
//     </div>
    
//     <div className="flex-1 flex overflow-x-auto gap-4 p-3 scrollbar-hide">
//       <div className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 px-5 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors">
//         <p className="text-gray-600 font-medium">Add new section</p>
//       </div>
//       <div className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 px-5 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors">
//         <p className="text-gray-600 font-medium">Add new section</p>
//       </div>
//       <div className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 px-5 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors">
//         <p className="text-gray-600 font-medium">Add new section</p>
//       </div>
//       <div className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 px-5 py-2 rounded-lg border border-gray-200 cursor-pointer transition-colors">
//         <p className="text-gray-600 font-medium">Add new section</p>
//       </div>
//     </div>
    
//     <button 
//       onClick={addNewCategory} 
//       className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all hover:shadow-md active:scale-95"
//     >
//       <span className="font-medium">Add</span>
//       <span className="text-xl">+</span>
//     </button>
// </div>
  )
}

export default NotesTopBar
