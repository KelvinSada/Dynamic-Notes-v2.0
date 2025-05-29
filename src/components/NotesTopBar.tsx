import { useContext } from "react"
import { AppContext } from "./Context"
import { NotesCategory } from "./Types"

const NotesTopBar = () => {
  const {AddCategoryToggle:{setCategoryToggle},
      CurrentEditableNotes:{currentNotes,setCurrentNotes},
      DisplayNotesAndTotal:{displayNotes,setDisplayNotes}
    } = useContext(AppContext)

  const addNewCategory=()=>{
    setCategoryToggle(true)
  }

  // Handle notes catetogry click
  const handleCategoryClick=(selectedItem:NotesCategory)=>{
    setCurrentNotes((prev)=>{
      return{
        ...prev,
        status:"not active",
        dynamicItems:prev.dynamicItems.map((item)=>{
          if (item.categoryId === selectedItem.categoryId){
            item.status = "active"
            setDisplayNotes(()=>{
              return{
                total:item.categoryTotal,
                note:item.categoryBody,
              }
            })
          } else {
            item.status = "not active"
          }
          return item
        })
      }
    })
  }

  // Handing displaying and updating original current Notes
  const showOriginalNotes =()=>{
    setCurrentNotes((prev)=>{
      return{
        ...prev,
        status:"active",
        // dynamicItems:prev.dynamicItems.map((item)=>{
        //   item.status === "not active"
        //   return item
        // })
        dynamicItems:prev.dynamicItems.map((item)=>{
          item.status = "not active"
          return item
        })
      }
    })

    setDisplayNotes(()=>{
      return{
        total:currentNotes.total,
        note:currentNotes.body,
      }
    })
  }

  return (
  <div className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
    <div className="bg-amber-50  px-4 py-2 rounded-md border border-amber-100">
      <p onClick={showOriginalNotes} className="font-medium text-amber-800">Current</p>
    </div>
    <div className="flex w-full overflow-scroll">
      {currentNotes.dynamicItems.map((category,index)=>{
        return(
          <p onClick={()=>{handleCategoryClick(category)}} key={index} className="text-gray-500 flex items-center rounded-[10px] mr-2 p-2 justify-center border-1 bg-gray-100 min-w-[70%]">
            {category.categoryName}
          </p>
        )
      })}
    </div>
    <button onClick={addNewCategory} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors">
      <span>Add</span>
      <span className="text-lg">+</span>
    </button>
  </div>
  )
}

export default NotesTopBar
