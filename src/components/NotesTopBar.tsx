import { useContext, useEffect, useState } from "react"
import { AppContext } from "./Context"
import { NotesCategory } from "./Types"

const NotesTopBar = () => {
  const {AddCategoryToggle:{setCategoryToggle},
      CurrentEditableNotes:{currentNotes,setCurrentNotes},
      SelectedNotesCategory:{setNotesCategorySelected}} = useContext(AppContext)

  const [pickedCategory,setPickedCategory] = useState<NotesCategory>({
    categoryId: 0,
    categoryName: "",
    categoryBody: "",
    categoryTotal: 0,
  })

  const addNewCategory=()=>{
    setCategoryToggle(true)
  }

  const handleCategoryClick=(selectedItem:NotesCategory)=>{
   
    const findItem = currentNotes.dynamicItems.find(item => item.categoryId === selectedItem.categoryId)
    if (findItem){
      setNotesCategorySelected(()=>{
      return{
        categoryId: selectedItem.categoryId,
        categoryName: selectedItem.categoryName,
        categoryBody: selectedItem.categoryBody,
        categoryTotal: selectedItem.categoryTotal,
      }
      })
      setCurrentNotes(prev=>{
        return{
          ...prev,
          body:selectedItem.categoryBody,
          total:selectedItem.categoryTotal,
        }
      })
    }
   
    setPickedCategory(selectedItem)
  }

  useEffect(()=>{
    setNotesCategorySelected(pickedCategory)
  },[pickedCategory])


  // Landing displaying and updating original current Notes
  const showOriginalNotes =()=>{
    setNotesCategorySelected(()=>{
      return{
        categoryId: currentNotes.currentNote.categoryId,
        categoryName: currentNotes.currentNote.categoryName,
        categoryBody: currentNotes.currentNote.categoryBody,
        categoryTotal: currentNotes.currentNote.categoryTotal,
      }
    })
    setCurrentNotes((prev)=>{
      return{
        ...prev,
        body:prev.currentNote.categoryBody,
        total:prev.currentNote.categoryTotal,
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
