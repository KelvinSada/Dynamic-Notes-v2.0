import { useContext, useState,useRef } from "react"
import { IoClose } from "react-icons/io5"
import { AppContext } from "./Context"
import { NotesCategoryMain } from "./Types"

const NewCategoryDialogBox = () => {
  const {AddCategoryToggle:{setCategoryToggle},
        CurrentEditableNotes:{currentNotes,setCurrentNotes}} = useContext(AppContext)

  const [category,setCategory] = useState<NotesCategoryMain>({
    categoryId:0,
    categoryName: "",
    categoryBody:"",
    categoryTotal:0,
    status:"not active",
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
    // if (categoryNameRef.current){
    //   categoryNameRef.current.focus()
    // }

    if (category.categoryName.length !== 0 ){

      if (currentNotes.dynamicItems.length === 0){
        handleFirstNotes()
      }

      let newObj = category
      newObj.categoryId = currentNotes.dynamicItems.length + 1
     setCurrentNotes(prevItems=>{
        return {
          ...prevItems,
          dynamicItems:[...prevItems.dynamicItems,newObj]
        }
      })
      setCategoryToggle(false)
    }
  }


  // handling the first save
  const handleFirstNotes=()=>{
    setCurrentNotes((prev)=>{
      return{
        ...prev,
        currentNote:{
          categoryId: 0,
          categoryName: "current1.0",
          categoryBody: prev.body,
          categoryTotal: prev.total,
          status:"not active",
        }
      }
    })
  }

  return (
    <div className="z-10 p-6 shadow-md rounded-[15px] bg-white flex flex-col gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button onClick={hangleCategoryToggle} className='self-end text-3xl'><IoClose /></button>
      <input ref={categoryNameRef} onChange={handleCategoryChange} placeholder='Category name' type="text" className='p-2 roundd rounded-2xl text-[1.2rem] placeholder:px-0.5 border border-black'/>
      <button onClick={getCategory} className='w-full rounded-2xl bg-cyan-300 px-3 py-2 hover:bg-fuchsia-500'>Add Category</button>
    </div>
  )
}

export default NewCategoryDialogBox
