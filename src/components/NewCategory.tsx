import { useContext, useState,useRef } from "react"
import { IoClose } from "react-icons/io5"
import { AppContext } from "./Context"
import { NotesCategory } from "./Types"

const NewCategoryDialogBox = () => {
  const {AddCategoryToggle:{setCategoryToggle},
        CurrentEditableNotes:{currentNotes,setCurrentNotes}} = useContext(AppContext)

  const [category,setCategory] = useState<NotesCategory>({
    categoryName: "",
    categoryBody:"",
    categoryTotal:0,
  })
  const categoryNameRef = useRef<HTMLInputElement>(null)
  // const categoryNameRef = useRef<>("")

  const hangleCategoryToggle=()=>{
    setCategoryToggle(false)
  }

  const handleCategoryChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.value
    setCategory(prev=>{
      return{
        ...prev,
        categoryName:name
      }
    })
  }

  const getCategory=()=>{
    if (categoryNameRef.current){
      categoryNameRef.current.focus()
    }
    if (category.categoryName.length !== 0 ){
      let newObj = category
      setCurrentNotes(prevItems=>{
        return {
          ...prevItems,
          dynamicItems:[...prevItems.dynamicItems,newObj]
        }
      })
      console.log(currentNotes)
      setCategoryToggle(false)
    }
  }
  console.log(currentNotes)
  
  return (
    <div className="z-10 p-3 shadow-md rounded-[10px] bg-white flex flex-col gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button onClick={hangleCategoryToggle} className='self-end'><IoClose /></button>
      <input ref={categoryNameRef} onChange={handleCategoryChange} placeholder='Category name' type="text" className='p-1 border border-black'/>
      <button onClick={getCategory} className='w-full rounded-md bg-fuchsia-400 hover:bg-fuchsia-500'>Add Category</button>
    </div>
  )
}

export default NewCategoryDialogBox
